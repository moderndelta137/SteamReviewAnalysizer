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
