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

function hashText(value) {
  let hash = 0;
  const input = String(value || "");
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return `${hash >>> 0}`;
}

function buildAnonymousReviewerAlias(steamid, recommendationid) {
  const seed = String(steamid || recommendationid || "reviewer");
  return `Reviewer ${hashText(seed).slice(-8).toUpperCase()}`;
}

function anonymizeReview(review) {
  if (!review || typeof review !== "object") return review;
  const author = review.author && typeof review.author === "object" ? review.author : {};
  const alias = buildAnonymousReviewerAlias(author.steamid, review.recommendationid);
  return {
    ...review,
    author: {
      ...author,
      steamid: alias,
      personaname: alias,
      profile_url: "",
    },
  };
}

async function proxyReviews(targetUrl) {
  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": "SteamReviewAnalysizer/0.1",
    },
  });

  const payload = await response.json().catch(() => null);
  return new Response(
    JSON.stringify(
      payload && Array.isArray(payload.reviews)
        ? { ...payload, reviews: payload.reviews.map(anonymizeReview) }
        : payload || { success: 0 }
    ),
    {
      status: response.status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
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

async function analyzeReviews(request) {
  const body = await request.json();
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || "").trim();
  const question = String(body.question || "").trim();
  const questionMode = String(body.questionMode || "analytical").trim();
  const answerLanguage = String(body.answerLanguage || "English").trim();
  const baseUrl = String(body.baseUrl || "https://generativelanguage.googleapis.com/v1beta").trim().replace(/\/+$/, "");
  const evidence = body.evidence && typeof body.evidence === "object" ? body.evidence : null;

  if (!apiKey) return jsonResponse({ error: "Missing API key" }, 400);
  if (!model) return jsonResponse({ error: "Missing model" }, 400);
  if (!question) return jsonResponse({ error: "Missing question" }, 400);
  if (!evidence) return jsonResponse({ error: "Missing evidence" }, 400);
  if (!baseUrl.startsWith("https://")) return jsonResponse({ error: "AI base URL must use HTTPS" }, 400);

  const modelName = model.startsWith("models/") ? model : `models/${model}`;
  const prompt = [
    `User question: ${question}`,
    `Question mode: ${questionMode}`,
    "",
    "Evidence JSON:",
    JSON.stringify(evidence),
  ].join("\n");

  const modeInstruction =
    questionMode === "pillar"
      ? "Infer the game's likely player-perceived pillars from repeated praise, repeated tolerance patterns, and recurring theme clusters. Rank the top 1-3 pillars and explain why each qualifies as a pillar."
      : questionMode === "feature_request"
        ? "Infer the most wanted features or changes from repeated request language, repeated complaints that imply missing features, and concentrated negative friction. Distinguish between explicit requests and implied requests."
        : questionMode === "advisory"
          ? "Answer like a professional game product analyst advising a real development team. Identify practical priorities, tradeoffs, and likely highest-impact actions."
          : questionMode === "comparative"
            ? "Focus on what changed, what stayed the same, and whether the evidence supports a meaningful shift."
            : questionMode === "factual"
              ? "Prefer direct factual reporting with minimal inference."
              : "Provide analytical synthesis grounded in the evidence.";

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
            text:
              `You are a grounded analyst for Steam reviews. Answer only from the provided evidence JSON. ` +
              `Treat population-level counts, rates, topics, and trends as the primary source of truth. ` +
              `Use review excerpts only as illustrations, not as proof of prevalence. ` +
              `You may synthesize higher-level themes, likely pillars, desired features, and strategic advice when they are strongly supported by multiple evidence sources. ` +
              `Always distinguish observed facts from supported inferences. ` +
              `Distinguish common issues, minority but severe issues, and emerging trends when supported. ` +
              `If the evidence is insufficient, say so plainly. ` +
              `Do not invent facts, hidden causes, player motives, or unsupported comparisons. ` +
              `${modeInstruction} ` +
              `Respond in ${answerLanguage}. ` +
              `Keep the structure concise with: Answer, Why, Evidence, and Caveats.`,
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse({ error: payload.error?.message || `AI request failed: ${response.status}` }, response.status);
  }

  return jsonResponse({
    answer: payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "",
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
      return proxyReviews(buildReviewUrl(url.searchParams));
    } catch (error) {
      return jsonResponse({ error: error.message }, 400);
    }
  }

  if (url.pathname === "/api/translate" && request.method === "POST") {
    return translateReview(request);
  }

  if (url.pathname === "/api/analyze" && request.method === "POST") {
    return analyzeReviews(request);
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
