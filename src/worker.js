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
              `Use Markdown bold sparingly to highlight only the most important findings, priorities, or numbers in the main answer. Do not overuse bold. ` +
              `${modeInstruction} ` +
              `Respond in ${answerLanguage}. ` +
              `Keep the structure concise with: Answer, Why, Evidence, and Caveats. ` +
              `Make the Answer section information-dense and skimmable: 1 short paragraph or up to 3 short bullets, with the most important points first and selective bold emphasis on only the top takeaways.`,
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

function parseModelJsonPayload(text) {
  const source = String(text || "").trim();
  if (!source) return null;
  const fenced = source.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : source;
  try {
    return JSON.parse(candidate);
  } catch (error) {
    const objectMatch = candidate.match(/\{[\s\S]*\}/);
    if (!objectMatch) return null;
    try {
      return JSON.parse(objectMatch[0]);
    } catch (innerError) {
      return null;
    }
  }
}

async function suggestWordCloudPreferences(request) {
  const body = await request.json();
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || "").trim();
  const answerLanguage = String(body.answerLanguage || "English").trim();
  const baseUrl = String(body.baseUrl || "https://generativelanguage.googleapis.com/v1beta").trim().replace(/\/+$/, "");
  const evidence = body.evidence && typeof body.evidence === "object" ? body.evidence : null;

  if (!apiKey) return jsonResponse({ error: "Missing API key" }, 400);
  if (!model) return jsonResponse({ error: "Missing model" }, 400);
  if (!evidence) return jsonResponse({ error: "Missing evidence" }, 400);
  if (!baseUrl.startsWith("https://")) return jsonResponse({ error: "AI base URL must use HTTPS" }, 400);

  const modelName = model.startsWith("models/") ? model : `models/${model}`;
  const prompt = [
    `Answer language for short reasoning: ${answerLanguage}`,
    "",
    "Evidence JSON:",
    JSON.stringify(evidence),
  ].join("\n");

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
              `You are helping tune word-cloud preferences for one specific Steam game. ` +
              `Suggest allow_phrases and ban_phrases for a review word cloud. ` +
              `Make suggestions specific to this game and its genre, not generic Steam vocabulary. ` +
              `Prioritize title-specific concepts, mechanics, factions, modes, maps, characters, weapons, resources, systems, bosses, memes, and repeated genre jargon. ` +
              `For ban_phrases, prefer generic review filler, low-signal sentiment filler, storefront boilerplate, and noisy terms that are frequent but not analytically useful for this title. ` +
              `Do not put performance, optimization, fps, lag, stutter, crash, loading, or similar technical-feedback terms in ban_phrases, because they are useful player feedback. ` +
              `Do not ban title-specific or genre-defining terms unless evidence clearly shows they are noisy. ` +
              `Prefer 1-3 word terms or short phrases suitable for a word cloud. ` +
              `Use only provided evidence. If evidence is weak, return fewer suggestions instead of guessing. ` +
              `Return JSON only in this exact shape: ` +
              `{"allow_phrases":["..."],"ban_phrases":["..."],"reasoning":{"allow_phrases":["short reason"],"ban_phrases":["short reason"]}} ` +
              `Suggest 8-16 allow phrases and 8-16 ban phrases.`,
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
        temperature: 0.15,
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse({ error: payload.error?.message || `AI request failed: ${response.status}` }, response.status);
  }

  const rawText = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "";
  const parsed = parseModelJsonPayload(rawText);
  if (!parsed) {
    return jsonResponse({ error: "AI returned invalid JSON for word-cloud suggestions" }, 502);
  }

  return jsonResponse({
    allow_phrases: Array.isArray(parsed.allow_phrases) ? parsed.allow_phrases : [],
    ban_phrases: Array.isArray(parsed.ban_phrases) ? parsed.ban_phrases : [],
    reasoning: parsed.reasoning && typeof parsed.reasoning === "object" ? parsed.reasoning : {},
  });
}

async function classifyMeaningfulReviews(request) {
  const body = await request.json();
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || "").trim();
  const answerLanguage = String(body.answerLanguage || "English").trim();
  const baseUrl = String(body.baseUrl || "https://generativelanguage.googleapis.com/v1beta").trim().replace(/\/+$/, "");
  const reviews = Array.isArray(body.reviews) ? body.reviews : [];

  if (!apiKey) return jsonResponse({ error: "Missing API key" }, 400);
  if (!model) return jsonResponse({ error: "Missing model" }, 400);
  if (!reviews.length) return jsonResponse({ error: "Missing reviews" }, 400);
  if (!baseUrl.startsWith("https://")) return jsonResponse({ error: "AI base URL must use HTTPS" }, 400);

  const modelName = model.startsWith("models/") ? model : `models/${model}`;
  const prompt = [
    `Answer language for reasons: ${answerLanguage}`,
    "",
    "Candidate review JSON:",
    JSON.stringify(reviews),
  ].join("\n");

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
              `You classify candidate Steam reviews for a "meaningful feedback" filter. ` +
              `Meaningful reviews contain concrete player feedback, actionable criticism, useful praise, specific bug or performance reports, balance observations, progression friction, UI or UX issues, feature requests, or detailed comparisons grounded in actual play. ` +
              `Do not mark generic hype, one-line sentiment, memes, low-detail reactions, duplicate filler, or storefront-style recommendations as meaningful unless they still contain specific evidence. ` +
              `Use the provided heuristic score as a hint, not as authority. ` +
              `Return JSON only in this exact shape: ` +
              `{"reviews":[{"id":"...","meaningful":true,"confidence":"high","reason":"short reason"}]}. ` +
              `Include every input review exactly once. Keep reasons short, under 12 words.`,
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
        temperature: 0.1,
      },
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return jsonResponse({ error: payload.error?.message || `AI request failed: ${response.status}` }, response.status);
  }

  const rawText = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim() || "";
  const parsed = parseModelJsonPayload(rawText);
  if (!parsed || !Array.isArray(parsed.reviews)) {
    return jsonResponse({ error: "AI returned invalid JSON for meaningful-review classification" }, 502);
  }

  return jsonResponse({
    reviews: reviews.map((review) => {
      const matched = parsed.reviews.find((entry) => String(entry.id || "") === String(review.id || ""));
      return {
        id: String(review.id || ""),
        meaningful: Boolean(matched?.meaningful),
        confidence: String(matched?.confidence || ""),
        reason: String(matched?.reason || ""),
      };
    }),
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

  if (url.pathname === "/api/wordcloud/suggest" && request.method === "POST") {
    return suggestWordCloudPreferences(request);
  }

  if (url.pathname === "/api/reviews/meaningful" && request.method === "POST") {
    return classifyMeaningfulReviews(request);
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
