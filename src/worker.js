function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function buildReviewUrl(searchParams) {
  const appid = searchParams.get("appid");
  if (!appid) {
    throw new Error("Missing appid");
  }

  const targetUrl = new URL(`https://store.steampowered.com/appreviews/${appid}`);
  targetUrl.searchParams.set("json", "1");

  for (const key of [
    "filter",
    "language",
    "day_range",
    "cursor",
    "review_type",
    "purchase_type",
    "num_per_page",
    "filter_offtopic_activity",
  ]) {
    const value = searchParams.get(key);
    if (value && value !== "null" && value !== "undefined") {
      targetUrl.searchParams.set(key, value);
    }
  }

  return targetUrl;
}

async function proxy(targetUrl) {
  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": "SteamReviewAnalysizer/0.1",
    },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function translateReview(request) {
  const body = await request.json();
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || "").trim();
  const text = String(body.text || "").trim();
  const targetLanguage = String(body.targetLanguage || "English").trim();
  const baseUrl = String(body.baseUrl || "https://generativelanguage.googleapis.com/v1beta").trim().replace(/\/+$/, "");

  if (!apiKey) return jsonResponse({ error: "Missing API key" }, 400);
  if (!model) return jsonResponse({ error: "Missing model" }, 400);
  if (!text) return jsonResponse({ error: "Missing text" }, 400);
  if (!baseUrl.startsWith("https://")) return jsonResponse({ error: "AI base URL must use HTTPS" }, 400);

  const modelName = model.startsWith("models/") ? model : `models/${model}`;
  const response = await fetch(`${baseUrl}/${modelName}:generateContent`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: "You translate Steam game reviews. Preserve meaning, tone, game terminology, line breaks, and profanity level. Return only the translation.",
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: `Translate this review into ${targetLanguage}:\n\n${text}` }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse({ error: payload.error?.message || `AI request failed: ${response.status}` }, response.status);
  }

  return jsonResponse({
    translation: payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "",
  });
}

async function listGeminiModels(request) {
  const url = new URL(request.url);
  const apiKey = String(url.searchParams.get("apiKey") || "").trim();
  const baseUrl = String(url.searchParams.get("baseUrl") || "https://generativelanguage.googleapis.com/v1beta").trim().replace(/\/+$/, "");
  if (!apiKey) return jsonResponse({ error: "Missing API key" }, 400);
  if (!baseUrl.startsWith("https://")) return jsonResponse({ error: "AI base URL must use HTTPS" }, 400);

  const response = await fetch(`${baseUrl}/models?pageSize=1000`, {
    headers: {
      "x-goog-api-key": apiKey,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse({ error: payload.error?.message || `Gemini model list failed: ${response.status}` }, response.status);
  }

  return jsonResponse({
    models: (payload.models || [])
      .filter((model) => (model.supportedGenerationMethods || []).includes("generateContent"))
      .map((model) => ({
        name: model.name,
        displayName: model.displayName || model.name,
      })),
  });
}

async function handleApi(request) {
  const url = new URL(request.url);

  if (url.pathname === "/api/appsearch") {
    const term = url.searchParams.get("term");
    if (!term) {
      return jsonResponse({ error: "Missing term" }, 400);
    }

    const targetUrl = new URL("https://store.steampowered.com/search/suggest");
    targetUrl.searchParams.set("term", term);
    targetUrl.searchParams.set("f", "games");
    targetUrl.searchParams.set("cc", "US");
    targetUrl.searchParams.set("l", "english");
    return proxy(targetUrl);
  }

  if (url.pathname === "/api/appdetails") {
    const appid = url.searchParams.get("appid");
    if (!appid) {
      return jsonResponse({ error: "Missing appid" }, 400);
    }

    const targetUrl = new URL("https://store.steampowered.com/api/appdetails");
    targetUrl.searchParams.set("appids", appid);
    return proxy(targetUrl);
  }

  if (url.pathname === "/api/groupdetails") {
    const appid = url.searchParams.get("appid");
    if (!appid) {
      return jsonResponse({ error: "Missing appid" }, 400);
    }

    const targetUrl = new URL(`https://steamcommunity.com/games/${appid}/memberslistxml/`);
    targetUrl.searchParams.set("xml", "1");
    return proxy(targetUrl);
  }

  if (url.pathname === "/api/reviews") {
    try {
      return proxy(buildReviewUrl(url.searchParams));
    } catch (error) {
      return jsonResponse({ error: error.message }, 400);
    }
  }

  if (url.pathname === "/api/translate" && request.method === "POST") {
    return translateReview(request);
  }

  if (url.pathname === "/api/ai/models") {
    return listGeminiModels(request);
  }

  return jsonResponse({ error: "Unknown API route" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request);
      } catch (error) {
        return jsonResponse({ error: error.message }, 502);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
