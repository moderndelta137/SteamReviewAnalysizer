const LANGUAGES = [
  ["Arabic", "arabic"],
  ["Bulgarian", "bulgarian"],
  ["Simplified Chinese", "schinese"],
  ["Traditional Chinese", "tchinese"],
  ["Czech", "czech"],
  ["Danish", "danish"],
  ["Dutch", "dutch"],
  ["English", "english"],
  ["Finnish", "finnish"],
  ["French", "french"],
  ["German", "german"],
  ["Greek", "greek"],
  ["Hungarian", "hungarian"],
  ["Indonesian", "indonesian"],
  ["Italian", "italian"],
  ["Japanese", "japanese"],
  ["Korean", "koreana"],
  ["Norwegian", "norwegian"],
  ["Polish", "polish"],
  ["Portuguese", "portuguese"],
  ["Portuguese - Brazil", "brazilian"],
  ["Romanian", "romanian"],
  ["Russian", "russian"],
  ["Spanish - Spain", "spanish"],
  ["Spanish - Latin America", "latam"],
  ["Swedish", "swedish"],
  ["Thai", "thai"],
  ["Turkish", "turkish"],
  ["Ukrainian", "ukrainian"],
  ["Vietnamese", "vietnamese"],
];

const PLAYTIME_BUCKETS = [
  { label: "<10m", max: 10 },
  { label: "10-30m", max: 30 },
  { label: "0.5-1h", max: 60 },
  { label: "1-2h", max: 120 },
  { label: "2-5h", max: 300 },
  { label: "5-10h", max: 600 },
  { label: "10-20h", max: 1200 },
  { label: "20-50h", max: 3000 },
  { label: "50-100h", max: 6000 },
  { label: "100h+", max: Number.POSITIVE_INFINITY },
];

const REVIEW_PLAYTIME_FILTERS = [
  { value: "all", minutes: [0, Number.POSITIVE_INFINITY] },
  { value: "under60", minutes: [0, 60] },
  { value: "60to300", minutes: [60, 300] },
  { value: "300to1200", minutes: [300, 1200] },
  { value: "1200plus", minutes: [1200, Number.POSITIVE_INFINITY] },
];

const REVIEW_LENGTH_FILTERS = [
  { value: "all", chars: [0, Number.POSITIVE_INFINITY] },
  { value: "short", chars: [0, 200] },
  { value: "medium", chars: [200, 600] },
  { value: "long", chars: [600, Number.POSITIVE_INFINITY] },
];

const DEFAULT_PLAYTIME_CUTOFFS = [10, 30, 60, 120, 300, 600, 1200, 3000, 6000];
const WORD_STOP_WORDS = new Set([
  "the","and","that","this","with","from","have","your","just","there","their","about","would","could","should",
  "were","been","being","when","what","which","while","where","will","them","they","then","than","into","over",
  "after","before","because","very","really","more","most","some","such","much","many","also","only","even",
  "here","well","made","make","does","did","dont","didnt","cant","wont","isnt","arent","youre","ive","im",
  "its","it's","our","ours","his","her","hers","who","why","how","too","got","get","had","has","was","are",
  "not","for","any","all","out","off","few","use","used","using","want","needs","need","still","same",
  "you","can","now","first","way","one","lot","i'm","dont","doesnt","didn","youre","i've","i'd","i'll",
  "say","see","know","think","look","looks","feel","feels","felt","seem","seems","around","through",
  "every","other","pretty","actually","overall","enough","little","big","far","back","going","having",
  "give","gives","given","take","takes","taken","come","comes","came","make","made","makes","let","lets",
  "but","though","like","can't","doesn't","don't","won't","isn't","aren't","shouldn't","couldn't","wouldn't",
  "there's","theres","these","sure","maybe","probably","mostly","almost","quite","perhaps","anyway","however",
  "whatever","whoever","whenever","wherever","itself","yourself","himself","herself","ourselves","myself",
  "it’s","there","those","this","thats","that's","yeah","yes","nope","okay","ok","maybe","surely",
]);
const WORD_GAME_STOP_WORDS = new Set([
  "game","games","steam","review","reviews","player","players","play","played","playing","recommend","recommended",
  "fun","good","bad","great","best","better","worse","amazing","awesome","okay","nice","story","graphics",
  "sound","music","price","hours","hour","time","thing","things","people","someone","something","everything",
  "gameplay","world","combat","character","characters","enemy","enemies","boss","bosses","weapon","weapons",
]);
const WORD_VERB_STOP_WORDS = new Set([
  "is","are","was","were","be","been","being","do","did","does","done","go","goes","went","gone","come",
  "comes","came","coming","get","gets","got","getting","make","makes","made","making","take","takes","took",
  "taken","give","gives","gave","given","play","plays","played","playing","feel","feels","felt","seem",
  "seems","seemed","look","looks","looked","say","says","said","use","uses","used","using","need","needs",
  "needed","want","wants","wanted","have","has","had","having","think","thinks","thought","know","knows",
]);
const WORD_KEEP_VERBS = new Set([
  "crash","crashes","crashed","stutter","stutters","stuttering","freeze","freezes","frozen","lag","lags",
  "stuck","drop","drops","dropped","optimize","optimized","optimize","grind","grinding",
]);

const I18N = {
  en: {
    brandEyebrow: "Steam review intelligence",
    brandTitle: "Steam Review Analysizer",
    uiLanguage: "UI Language",
    fetchReviews: "Fetch Reviews",
    appInputPlaceholder: "Enter Steam AppID or game name",
    replicaEyebrow: "Replica build",
    heroTitle: "Load a Steam app and inspect review volume by language.",
    heroBody:
      "This first pass mirrors SteamScout's core flow: app details, language breakdown, review browsing, CSV export, and playtime buckets.",
    wordCloudEyebrow: "Word cloud",
    wordCloudTitle: "Word Cloud",
    wordCloudSentiment: "Sentiment",
    generateWordCloud: "Generate",
    wordCloudFootnote: "Uses stop-word filtering, game-term filtering, document frequency, and phrase extraction.",
    wordCloudLoading: "Generating word cloud from reviews...",
    wordCloudEmpty: "No useful keywords found for this selection.",
    wordCloudReady: "Analyzed {reviews} reviews and surfaced {terms} keywords.",
    wordPreferenceLabel: "Word Preference",
    allowWord: "Allow",
    banWord: "Ban",
    languageBreakdown: "Language breakdown",
    reviewsByLanguage: "Steam Reviews by Language",
    distribution: "Distribution",
    reviewShare: "Review Share",
    chartType: "Chart Type",
    barChart: "Bar chart",
    pieChart: "Pie chart",
    reviewBrowser: "Review browser",
    selectedReviews: "Selected Reviews",
    prev: "Prev",
    next: "Next",
    hoursPlayed: "Hours played",
    reviewDistributionByPlaytime: "Review Distribution by Playtime",
    load: "Load",
    portion: "Portion",
    language: "Language",
    total: "Total",
    positive: "Positive",
    negative: "Negative",
    score: "Score",
    fetchIdleTitle: "Ready",
    fetchIdleBody: "Enter an AppID or game name to begin.",
    fetchLoadingTitle: "Fetching",
    fetchCompleteTitle: "Loaded",
    fetchErrorTitle: "Failed",
    proxyRequired:
      "<strong>Proxy required.</strong> Configure apiBaseUrl in public/config.js if the app is not running on the same origin as the /api proxy.",
    loadingAppDetails: "Loading app details...",
    resolvingGame: "Resolving game name...",
    resolvedGame: "Matched {name} ({appid})",
    loadedLanguages: "Loaded {loaded} / {total} languages",
    loadedTotalReviews: "Loaded {count} total reviews",
    noReviews: "No reviews found for this selection.",
    requestFailed: "Request failed",
    appNotFound: "App not found",
    gameLookupFailed: 'No Steam app matched "{query}".',
    checkAppId: "Check the AppID and try again.",
    noProxyConfigured: "No API proxy configured.",
    reviewBy: "{sentiment} review by",
    date: "Date",
    steamPurchase: "Steam Purchase",
    playtime: "Playtime",
    minutes: "minutes",
    gamesOwned: "Games Owned",
    reviewCount: "Review Count",
    loadedPaging: "{loaded} / {total} shown",
    positiveCount: "Positive {count}",
    negativeCount: "Negative {count}",
    allLanguage: "All",
    communityMembersTracked: "{count} community members tracked.",
    steamApp: "Steam app {appid}",
    noShortDescription: "No short description available.",
    usingCache: "Loaded cached data where available.",
    chartPieTooltipReviews: "reviews",
    refreshCache: "Refresh Cache",
    cacheTimestampEmpty: "No cache loaded yet.",
    cacheTimestamp: "Cache timestamp: {time}",
    keywordSearch: "Keyword Search",
    search: "Search",
    searchPlaceholder: "keyword",
    searchSummaryLead: "Keyword results",
    resultSummaryLead: "Review results",
    searchCount: "Hits",
    searchReviews: "Matching reviews",
    searchShown: "Shown",
    summaryPositiveRate: "Positive rate",
    searchEmpty: "Enter a keyword to search reviews.",
    searchLoading: "Loading reviews for search...",
    searchNoMatch: "No matching reviews found.",
    downloadCsv: "Download CSV",
    sortBy: "Sort By",
    sortDate: "Newest",
    sortPlaytime: "Playtime",
    sortLength: "Length",
    filters: "Filters",
    savedFilter: "Saved State",
    reviewMode: "View",
    reviewTabBrowse: "Review Browser",
    reviewTabSaved: "Saved Reviews",
    sentimentAll: "All",
    savedAll: "All",
    savedOnly: "Saved",
    unsavedOnly: "Unsaved",
    filterPositive: "Positive",
    filterNegative: "Negative",
    playtimeFilter: "Playtime Filter",
    lengthFilter: "Length Filter",
    playtimeAll: "Any playtime",
    playtimeUnder60: "Under 1h",
    playtime60to300: "1h - 5h",
    playtime300to1200: "5h - 20h",
    playtime1200plus: "20h+",
    lengthAll: "Any length",
    lengthShort: "Short",
    lengthMedium: "Medium",
    lengthLong: "Long",
    downloadSavedCsv: "Download Saved CSV",
    unsaveShown: "Unsave Shown",
    saveReview: "Save",
    savedReview: "Saved",
    savedReviewsTitle: "Saved Reviews",
    playtimeCutoffs: "Playtime Cutoffs (minutes)",
    cutoffLabel: "Cutoff {index}",
    wordPreferenceLabel: "語句設定",
    allowWord: "許可",
    banWord: "除外",
  },
  ja: {
    brandEyebrow: "Steamレビュー分析",
    brandTitle: "Steam Review Analysizer",
    uiLanguage: "表示言語",
    fetchReviews: "レビュー取得",
    replicaEyebrow: "再現版",
    heroTitle: "Steam アプリを読み込み、言語ごとのレビュー量を確認します。",
    heroBody:
      "この版は SteamScout の基本フローを再現しています。アプリ詳細、言語別内訳、レビュー閲覧、CSV 出力、プレイ時間分布を扱えます。",
    languageBreakdown: "言語別内訳",
    reviewsByLanguage: "言語別 Steam レビュー",
    distribution: "分布",
    reviewShare: "レビュー比率",
    chartType: "グラフ形式",
    barChart: "棒グラフ",
    pieChart: "円グラフ",
    reviewBrowser: "レビューブラウザ",
    selectedReviews: "選択中のレビュー",
    prev: "前へ",
    next: "次へ",
    hoursPlayed: "プレイ時間",
    reviewDistributionByPlaytime: "プレイ時間別レビュー分布",
    load: "読み込む",
    portion: "割合",
    language: "言語",
    total: "合計",
    positive: "好評",
    negative: "不評",
    score: "スコア",
    fetchIdleTitle: "待機中",
    fetchIdleBody: "AppID を入力して開始してください。",
    fetchLoadingTitle: "取得中",
    fetchCompleteTitle: "読込完了",
    fetchErrorTitle: "失敗",
    proxyRequired:
      "<strong>プロキシが必要です。</strong> /api と同一オリジンで動かさない場合は public/config.js の apiBaseUrl を設定してください。",
    loadingAppDetails: "アプリ詳細を読み込み中...",
    loadedLanguages: "{loaded} / {total} 言語を読み込みました",
    loadedTotalReviews: "合計 {count} 件のレビューを読み込みました",
    noReviews: "この条件ではレビューが見つかりませんでした。",
    requestFailed: "リクエスト失敗",
    appNotFound: "アプリが見つかりません",
    checkAppId: "AppID を確認して再試行してください。",
    noProxyConfigured: "API プロキシが設定されていません。",
    reviewBy: "{sentiment}レビュー by",
    date: "投稿日",
    steamPurchase: "Steam 購入",
    playtime: "プレイ時間",
    minutes: "分",
    gamesOwned: "所持ゲーム数",
    reviewCount: "レビュー数",
    loadedPaging: "{loaded} / {total} 件を表示",
    positiveCount: "好評 {count}",
    negativeCount: "不評 {count}",
    allLanguage: "すべて",
    communityMembersTracked: "コミュニティメンバー {count} 人",
    steamApp: "Steam アプリ {appid}",
    noShortDescription: "短い説明はありません。",
    usingCache: "利用可能なデータはキャッシュから読み込みました。",
    chartPieTooltipReviews: "件",
    refreshCache: "キャッシュ更新",
    cacheTimestampEmpty: "まだキャッシュはありません。",
    cacheTimestamp: "キャッシュ時刻: {time}",
    keywordSearch: "キーワード検索",
    search: "検索",
    searchPlaceholder: "キーワード",
    searchSummaryLead: "検索結果",
    resultSummaryLead: "レビュー結果",
    searchCount: "ヒット数",
    searchReviews: "該当レビュー数",
    searchShown: "表示件数",
    summaryPositiveRate: "好評率",
    searchEmpty: "検索キーワードを入力してください。",
    searchLoading: "検索用レビューを読み込み中...",
    searchNoMatch: "一致するレビューが見つかりませんでした。",
    downloadCsv: "CSV ダウンロード",
    sortBy: "並び替え",
    sortDate: "新しい順",
    sortPlaytime: "プレイ時間",
    sortLength: "長さ",
    filters: "絞り込み",
    savedFilter: "保存状態",
    reviewMode: "表示",
    reviewTabBrowse: "レビューブラウザ",
    reviewTabSaved: "保存レビュー",
    sentimentAll: "すべて",
    savedAll: "すべて",
    savedOnly: "保存済み",
    unsavedOnly: "未保存",
    filterPositive: "好評",
    filterNegative: "不評",
    playtimeFilter: "プレイ時間絞り込み",
    lengthFilter: "文字数絞り込み",
    playtimeAll: "すべてのプレイ時間",
    playtimeUnder60: "1時間未満",
    playtime60to300: "1時間 - 5時間",
    playtime300to1200: "5時間 - 20時間",
    playtime1200plus: "20時間以上",
    lengthAll: "すべての長さ",
    lengthShort: "短文",
    lengthMedium: "中くらい",
    lengthLong: "長文",
    downloadSavedCsv: "保存レビューCSV",
    unsaveShown: "表示分を解除",
    saveReview: "保存",
    savedReview: "保存済み",
    savedReviewsTitle: "保存レビュー",
    playtimeCutoffs: "プレイ時間の区切り値（分）",
    cutoffLabel: "区切り {index}",
  },
};

const runtimeConfig = window.STEAM_REVIEW_ANALYSIZER_CONFIG || {};
const API_BASE = (
  runtimeConfig.apiBaseUrl ||
  (location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? `${location.origin}/api`
    : "")
).replace(/\/+$/, "");

const DB_NAME = "steam-review-analysizer-cache";
const STORE_NAME = "responses";
const CACHE_TTL = 1000 * 60 * 60 * 12;
const APP_LIST_TTL = 1000 * 60 * 60 * 24 * 7;
const ROMAN_NUMERALS = new Map([
  ["i", "1"],
  ["ii", "2"],
  ["iii", "3"],
  ["iv", "4"],
  ["v", "5"],
  ["vi", "6"],
  ["vii", "7"],
  ["viii", "8"],
  ["ix", "9"],
  ["x", "10"],
]);

const state = {
  currentAppId: null,
  currentUiLanguage: "ja",
  analysisTab: "wordcloud",
  dataTab: "distribution",
  chartType: "bar",
  summaryRows: [],
  wordCloudSentiment: "all",
  wordCloudTerms: [],
  wordCloudPrefs: { allowed: [], banned: [] },
  cacheTimestamp: null,
  appDetails: new Map(),
  groupDetails: new Map(),
  reviewCache: new Map(),
  cursorCache: new Map(),
  supportedLanguages: [],
  activeSearchRegex: null,
  reviewBaseReviews: [],
  reviewSourceReviews: [],
  reviewDisplayedReviews: [],
  reviewSearchStats: null,
  reviewSort: "date",
  reviewFilters: { sentiment: "all", saved: "all", playtime: "all", length: "all" },
  reviewTab: "browse",
  savedReviews: [],
  playtimeCutoffs: [...DEFAULT_PLAYTIME_CUTOFFS],
  playtimeEditingIndex: null,
  savePersistTimer: null,
};

let dbPromise = null;

const els = {
  deploymentNote: document.getElementById("deployment-note"),
  fetchStatePanel: document.getElementById("fetch-state-panel"),
  fetchStateTitle: document.getElementById("fetch-state-title"),
  fetchStateText: document.getElementById("fetch-state-text"),
  fetchProgressBar: document.getElementById("fetch-progress-bar"),
  cacheTimestamp: document.getElementById("cache-timestamp"),
  refreshCacheButton: document.getElementById("refresh-cache-button"),
  downloadCsvButton: document.getElementById("download-csv-button"),
  savedReviewsDownloadButton: document.getElementById("saved-reviews-download-button"),
  savedReviewsClearButton: document.getElementById("saved-reviews-clear-button"),
  fetchForm: document.getElementById("fetch-form"),
  appidInput: document.getElementById("appid-input"),
  fetchButton: document.getElementById("fetch-button"),
  uiLanguageToggle: document.getElementById("ui-language-toggle"),
  workspaceSection: document.getElementById("workspace-section"),
  reviewsSection: document.getElementById("reviews-section"),
  analysisTabToggle: document.getElementById("analysis-tab-toggle"),
  dataTabToggle: document.getElementById("data-tab-toggle"),
  analysisPanelWordcloud: document.getElementById("analysis-panel-wordcloud"),
  analysisPanelReviews: document.getElementById("analysis-panel-reviews"),
  dataPanelDistribution: document.getElementById("data-panel-distribution"),
  dataPanelPlaytime: document.getElementById("data-panel-playtime"),
  statusText: document.getElementById("status-text"),
  wordLanguageSelection: document.getElementById("word-language-selection"),
  wordSentimentToggle: document.getElementById("word-sentiment-toggle"),
  generateWordCloudButton: document.getElementById("generate-word-cloud-button"),
  wordPreferenceInput: document.getElementById("word-preference-input"),
  wordAllowButton: document.getElementById("word-allow-button"),
  wordBanButton: document.getElementById("word-ban-button"),
  wordPreferenceList: document.getElementById("word-preference-list"),
  wordCloudStatus: document.getElementById("word-cloud-status"),
  wordCloudContainer: document.getElementById("word-cloud-container"),
  wordCloudTopList: document.getElementById("word-cloud-top-list"),
  chartContainer: document.getElementById("chart-container"),
  chartTypeToggle: document.getElementById("chart-type-toggle"),
  reviewsList: document.getElementById("reviews-list"),
  reviewTitle: document.getElementById("review-title"),
  pagingLabel: document.getElementById("paging-label"),
  appHero: document.getElementById("app-hero"),
  playtimeLanguageSelection: document.getElementById("playtime-language-selection"),
  playtimeLoadButton: document.getElementById("playtime-load-button"),
  playtimeCutoffControls: document.getElementById("playtime-cutoff-controls"),
  playtimeStatus: document.getElementById("playtime-status"),
  playtimeChart: document.getElementById("playtime-chart"),
  reviewLanguageSelection: document.getElementById("review-language-selection"),
  reviewSearchInput: document.getElementById("review-search-input"),
  reviewSearchButton: document.getElementById("review-search-button"),
  searchSummary: document.getElementById("search-summary"),
  reviewSortToggle: document.getElementById("review-sort-toggle"),
  reviewSentimentToggle: document.getElementById("review-sentiment-toggle"),
  reviewSavedToggle: document.getElementById("review-saved-toggle"),
  reviewPlaytimeFilter: document.getElementById("review-playtime-filter"),
  reviewLengthFilter: document.getElementById("review-length-filter"),
  reviewTabToggle: document.getElementById("review-tab-toggle"),
};

const t = (key) => I18N[state.currentUiLanguage]?.[key] ?? I18N.en[key] ?? key;
const fmt = (value) => Number(value || 0).toLocaleString();
const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const interp = (template, values = {}) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
const cacheKey = (appid, lang, cursor) => `${appid}::${lang}::${cursor}`;
const cursorKey = (appid, lang) => `${appid}::${lang}`;

function getLanguageName(code) {
  if (code === "all") return t("allLanguage");
  return LANGUAGES.find(([, value]) => value === code)?.[0] || code;
}

function getLanguageLabel(code) {
  if (code === "all") return t("allLanguage");
  const total = state.summaryRows.reduce((sum, row) => sum + row.total_reviews, 0) || 1;
  const row = state.summaryRows.find((entry) => entry.languageCode === code);
  const portion = row ? ((row.total_reviews / total) * 100).toFixed(2) : "0.00";
  return `${getLanguageName(code)} (${portion}%)`;
}

function getReviewLength(review) {
  return (review.review || "").trim().length;
}

function getReviewAppId(review) {
  return review._appid || state.currentAppId || "";
}

function getSavedReviewKey(review) {
  return `${getReviewAppId(review)}::${review.recommendationid}`;
}

function isReviewSaved(review) {
  const key = getSavedReviewKey(review);
  return state.savedReviews.some((entry) => getSavedReviewKey(entry) === key);
}

function getSavedReviewsForCurrentApp(lang = "all") {
  return state.savedReviews.filter((review) => {
    if (state.currentAppId && getReviewAppId(review) !== state.currentAppId) return false;
    if (lang !== "all" && review.language !== lang) return false;
    return true;
  });
}

function getPlaytimeBuckets() {
  const cutoffs = [...state.playtimeCutoffs]
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  const labels = cutoffs.map((cutoff, index) => {
    const prev = index === 0 ? 0 : cutoffs[index - 1];
    if (cutoff < 60) return { label: index === 0 ? `<${cutoff}m` : `${prev}-${cutoff}m`, max: cutoff };
    const prevLabel = prev < 60 ? `${prev}m` : `${(prev / 60).toFixed(prev % 60 === 0 ? 0 : 1)}h`;
    const cutoffLabel = `${(cutoff / 60).toFixed(cutoff % 60 === 0 ? 0 : 1)}h`;
    return { label: index === 0 ? `<${cutoffLabel}` : `${prevLabel}-${cutoffLabel}`, max: cutoff };
  });
  const last = cutoffs.at(-1) || DEFAULT_PLAYTIME_CUTOFFS.at(-1);
  labels.push({ label: `${(last / 60).toFixed(last % 60 === 0 ? 0 : 1)}h+`, max: Number.POSITIVE_INFINITY });
  return labels;
}

function formatDurationLabel(minutes) {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (hours && mins) return `${hours}h${mins}m`;
  if (hours) return `${hours}h`;
  return `${mins}m`;
}

function parseDurationInput(value) {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return null;
  if (/^\d+$/.test(normalized)) return Number(normalized);
  const hoursMatch = normalized.match(/(\d+)\s*h/);
  const minsMatch = normalized.match(/(\d+)\s*m/);
  const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
  const mins = minsMatch ? Number(minsMatch[1]) : 0;
  const total = hours * 60 + mins;
  return total > 0 ? total : null;
}

function setFetchState(mode, message, progress) {
  els.fetchStatePanel.classList.toggle("error", mode === "error");
  els.fetchStateTitle.textContent =
    mode === "loading"
      ? t("fetchLoadingTitle")
      : mode === "success"
        ? t("fetchCompleteTitle")
        : mode === "error"
          ? t("fetchErrorTitle")
          : t("fetchIdleTitle");
  els.fetchStateText.textContent = message;
  els.fetchProgressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
}

function updateCacheTimestamp(timestamp) {
  state.cacheTimestamp = timestamp;
  els.cacheTimestamp.textContent = timestamp
    ? interp(t("cacheTimestamp"), {
        time: new Date(timestamp).toLocaleString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US"),
      })
    : t("cacheTimestampEmpty");
}

function sortLanguageRowsByShare(rows) {
  return [...rows].sort((left, right) => {
    if (right.total_reviews !== left.total_reviews) return right.total_reviews - left.total_reviews;
    return left.languageName.localeCompare(right.languageName, "en");
  });
}

function populateLanguageSelect(select) {
  const current = select.value || "all";
  const options = [`<option value="all">${esc(t("allLanguage"))}</option>`];
  sortLanguageRowsByShare(state.summaryRows).forEach((row) => {
    options.push(`<option value="${row.languageCode}">${esc(getLanguageLabel(row.languageCode))}</option>`);
  });
  select.innerHTML = options.join("");
  select.value = [...select.options].some((option) => option.value === current) ? current : "all";
}

function getLengthFilterLabel(value) {
  const range =
    value === "short"
      ? "<200 chars"
      : value === "medium"
        ? "200-599 chars"
        : value === "long"
          ? "600+ chars"
          : "";
  const localizedRange =
    state.currentUiLanguage === "ja"
      ? value === "short"
        ? "200文字未満"
        : value === "medium"
          ? "200-599文字"
          : value === "long"
            ? "600文字以上"
            : ""
      : range;
  const key =
    value === "all"
      ? "lengthAll"
      : value === "short"
        ? "lengthShort"
        : value === "medium"
          ? "lengthMedium"
          : "lengthLong";
  return value === "all" ? t(key) : `${t(key)} (${localizedRange})`;
}

function populateReviewFilterSelects() {
  els.reviewPlaytimeFilter.innerHTML = REVIEW_PLAYTIME_FILTERS.map((filter) => {
    const key =
      filter.value === "all"
        ? "playtimeAll"
        : filter.value === "under60"
          ? "playtimeUnder60"
          : filter.value === "60to300"
            ? "playtime60to300"
            : filter.value === "300to1200"
              ? "playtime300to1200"
              : "playtime1200plus";
    return `<option value="${filter.value}">${esc(t(key))}</option>`;
  }).join("");

  els.reviewLengthFilter.innerHTML = REVIEW_LENGTH_FILTERS.map((filter) => {
    return `<option value="${filter.value}">${esc(getLengthFilterLabel(filter.value))}</option>`;
  }).join("");

  els.reviewPlaytimeFilter.value = state.reviewFilters.playtime;
  els.reviewLengthFilter.value = state.reviewFilters.length;
}

function updateToggleButtons(container, activeValue, attribute) {
  container.querySelectorAll(`[data-${attribute}]`).forEach((button) => {
    button.classList.toggle("active", button.dataset[attribute] === activeValue);
  });
}

function updateReviewTabUi() {
  updateToggleButtons(els.reviewTabToggle, state.reviewTab, "tab");
  els.savedReviewsDownloadButton.classList.toggle("hidden", state.reviewTab !== "saved");
  els.savedReviewsClearButton.classList.toggle("hidden", state.reviewTab !== "saved");
}

function updateWorkspaceTabs() {
  updateToggleButtons(els.analysisTabToggle, state.analysisTab, "analysisTab");
  updateToggleButtons(els.dataTabToggle, state.dataTab, "dataTab");

  els.analysisPanelWordcloud.classList.toggle("hidden", state.analysisTab !== "wordcloud");
  els.analysisPanelReviews.classList.toggle("hidden", state.analysisTab !== "reviews");
  els.dataPanelDistribution.classList.toggle("hidden", state.dataTab !== "distribution");
  els.dataPanelPlaytime.classList.toggle("hidden", state.dataTab !== "playtime");
}

function renderWordPreferenceList() {
  const chips = [];
  state.wordCloudPrefs.allowed.forEach((term) => {
    chips.push(
      `<span class="word-preference-chip allowed">${esc(term)} <button type="button" data-pref-type="allowed" data-pref-term="${esc(term)}">×</button></span>`
    );
  });
  state.wordCloudPrefs.banned.forEach((term) => {
    chips.push(
      `<span class="word-preference-chip banned">${esc(term)} <button type="button" data-pref-type="banned" data-pref-term="${esc(term)}">×</button></span>`
    );
  });
  els.wordPreferenceList.innerHTML = chips.join("");
}

function renderPlaytimeCutoffControls() {
  els.playtimeCutoffControls.innerHTML = "";
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key && t(key)) node.textContent = t(key);
  });

  if (state.currentUiLanguage === "ja") {
    document.querySelectorAll('[data-i18n="wordCloudTitle"]').forEach((node) => {
      node.textContent = "ワードクラウド";
    });
  }

  els.appidInput.placeholder = t("appInputPlaceholder");
  els.reviewSearchInput.placeholder = t("searchPlaceholder");

  updateToggleButtons(els.uiLanguageToggle, state.currentUiLanguage, "lang");
  updateToggleButtons(els.chartTypeToggle, state.chartType, "chart");
  updateToggleButtons(els.reviewSortToggle, state.reviewSort, "sort");
  updateToggleButtons(els.reviewSentimentToggle, state.reviewFilters.sentiment, "sentiment");
  updateToggleButtons(els.reviewSavedToggle, state.reviewFilters.saved, "savedFilter");
  updateToggleButtons(els.wordSentimentToggle, state.wordCloudSentiment, "wordSentiment");
  updateReviewTabUi();
  updateWorkspaceTabs();

  populateLanguageSelect(els.reviewLanguageSelection);
  populateLanguageSelect(els.playtimeLanguageSelection);
  populateLanguageSelect(els.wordLanguageSelection);
  populateReviewFilterSelects();
  renderPlaytimeCutoffControls();
  updateCacheTimestamp(state.cacheTimestamp);
  renderWordPreferenceList();

  if (!API_BASE) els.deploymentNote.innerHTML = t("proxyRequired");
  if (state.summaryRows.length) {
    renderDistributionChart(state.summaryRows);
  }

  updateReviewSummary();
  renderReviews(state.reviewDisplayedReviews);
  if (state.reviewTab === "saved") els.reviewTitle.textContent = t("savedReviewsTitle");
  renderWordCloud();
}

function openDb() {
  if (!("indexedDB" in window)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });

  return dbPromise;
}

async function getRecord(key) {
  const db = await openDb();
  if (!db) return null;

  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
}

async function putRecord(key, value) {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put({ key, value, storedAt: Date.now() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function deletePrefix(prefix) {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const request = tx.objectStore(STORE_NAME).openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      if (String(cursor.key).startsWith(prefix)) cursor.delete();
      cursor.continue();
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.text();
}

async function getCachedValue(key, loader, ttl = CACHE_TTL) {
  const record = await getRecord(key);
  if (record && Date.now() - record.storedAt <= ttl) {
    updateCacheTimestamp(record.storedAt);
    return record.value;
  }
  const value = await loader();
  await putRecord(key, value);
  updateCacheTimestamp(Date.now());
  return value;
}

async function loadSavedReviewsFromCache() {
  const record = await getRecord("savedreviews");
  state.savedReviews = Array.isArray(record?.value) ? record.value : [];
}

async function loadWordCloudPrefsFromCache() {
  const record = await getRecord("wordcloudprefs");
  const value = record?.value;
  state.wordCloudPrefs = {
    allowed: Array.isArray(value?.allowed) ? value.allowed : [],
    banned: Array.isArray(value?.banned) ? value.banned : [],
  };
}

function schedulePersistSavedReviews() {
  if (state.savePersistTimer) clearTimeout(state.savePersistTimer);
  state.savePersistTimer = setTimeout(() => {
    state.savePersistTimer = null;
    void persistSavedReviews();
  }, 120);
}

async function persistSavedReviews() {
  await putRecord("savedreviews", state.savedReviews);
}

async function persistWordCloudPrefs() {
  await putRecord("wordcloudprefs", state.wordCloudPrefs);
}

function normalizeLookupToken(token) {
  if (!token) return "";

  const directRoman = ROMAN_NUMERALS.get(token);
  if (directRoman) return directRoman;

  const suffixMatch = token.match(/^(.*?)(viii|vii|iii|x|ix|iv|vi|ii|v|i)$/);
  if (suffixMatch && suffixMatch[1].length >= 4 && !/\d/.test(suffixMatch[1])) {
    return `${suffixMatch[1]}${ROMAN_NUMERALS.get(suffixMatch[2]) || suffixMatch[2]}`;
  }

  return token;
}

function arabicToRomanToken(token) {
  for (const [roman, arabic] of ROMAN_NUMERALS.entries()) {
    if (arabic === token) return roman;
  }

  const suffixMatch = token.match(/^(.*?)(10|9|8|7|6|5|4|3|2|1)$/);
  if (suffixMatch && suffixMatch[1].length >= 4) {
    const roman = arabicToRomanToken(suffixMatch[2]);
    return roman ? `${suffixMatch[1]}${roman}` : token;
  }

  return token;
}

function normalizeLookupText(value) {
  const source = String(value || "")
    .normalize("NFKC")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/&/g, " and ");
  const tokens = source
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeLookupToken)
    .filter(Boolean);

  return {
    canonical: tokens.join(""),
    tokens,
  };
}

function buildLookupVariants(input) {
  const normalized = normalizeLookupText(input);
  const variants = new Set();

  if (normalized.tokens.length) variants.add(normalized.tokens.join(" "));

  const romanized = normalized.tokens.map(arabicToRomanToken).join(" ").trim();
  if (romanized) variants.add(romanized);

  const compactSource = String(input || "")
    .normalize("NFKC")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (compactSource) variants.add(compactSource);

  return [...variants].filter(Boolean);
}

async function searchSteamApps(term) {
  const url = `${API_BASE}/appsearch?term=${encodeURIComponent(term)}`;
  const html = await getCachedValue(`appsearch::${term.toLowerCase()}`, () => fetchText(url), APP_LIST_TTL);
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  return [...doc.querySelectorAll(".match[data-ds-appid]")]
    .map((node) => ({
      appid: node.getAttribute("data-ds-appid") || "",
      name: node.querySelector(".match_name")?.textContent?.trim() || "",
    }))
    .filter((entry) => entry.appid && entry.name);
}

async function resolveAppInput(value) {
  const input = String(value || "").trim();
  if (!input) return null;
  if (/^\d+$/.test(input)) return { appid: input, name: null };

  setFetchState("loading", t("resolvingGame"), 4);
  const variants = buildLookupVariants(input);
  if (!variants.length) {
    throw new Error(interp(t("gameLookupFailed"), { query: input }));
  }

  for (const term of variants) {
    const matches = await searchSteamApps(term);
    if (matches.length) {
      return { appid: matches[0].appid, name: matches[0].name };
    }
  }

  throw new Error(interp(t("gameLookupFailed"), { query: input }));
}

async function getAppDetails(appid, force = false) {
  if (!force && state.appDetails.has(appid)) return state.appDetails.get(appid);
  const url = `${API_BASE}/appdetails?appid=${encodeURIComponent(appid)}`;
  const value = force ? await fetchJson(url) : await getCachedValue(`appdetails::${appid}`, () => fetchJson(url));
  state.appDetails.set(appid, value);
  return value;
}

async function getGroupDetails(appid, force = false) {
  if (!force && state.groupDetails.has(appid)) return state.groupDetails.get(appid);
  const url = `${API_BASE}/groupdetails?appid=${encodeURIComponent(appid)}`;
  const text = force ? await fetchText(url) : await getCachedValue(`groupdetails::${appid}`, () => fetchText(url));
  const xml = new DOMParser().parseFromString(text, "application/xml");
  state.groupDetails.set(appid, xml);
  return xml;
}

async function getReviews(appid, lang, cursor = "*", force = false) {
  const key = cacheKey(appid, lang, cursor);
  if (!force && state.reviewCache.has(key)) return state.reviewCache.get(key);

  const load = () =>
    fetchJson(
      `${API_BASE}/reviews?${new URLSearchParams({
        appid,
        filter: "recent",
        language: lang,
        review_type: "all",
        purchase_type: "all",
        num_per_page: "100",
        cursor,
      }).toString()}`
    );

  const value = force ? await load() : await getCachedValue(`reviews::${key}`, load);
  state.reviewCache.set(key, value);

  const keyForCursors = cursorKey(appid, lang);
  const cursors = state.cursorCache.get(keyForCursors) || [];
  if (!cursors.includes(cursor)) {
    cursors.push(cursor);
    state.cursorCache.set(keyForCursors, cursors);
  }

  return value;
}

function renderHero(appid, details, groupXml) {
  const app = details[appid]?.data;
  if (!app) return;

  const members = groupXml.querySelector("memberCount")?.textContent;
  state.supportedLanguages = (app.supported_languages || "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\*/g, "")
    .replace(/languages with full audio support/gi, "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  els.appHero.classList.remove("empty");
  els.appHero.style.background = `linear-gradient(180deg, transparent 0%, rgba(5,10,15,.92) 85%),linear-gradient(120deg, rgba(94,200,255,.12), rgba(121,227,159,.08)),url('${app.header_image}') center/cover no-repeat`;
  els.appHero.innerHTML = `<div class="hero-copy"><p class="eyebrow">${esc(
    interp(t("steamApp"), { appid })
  )}</p><h2>${esc(app.name)}</h2><p>${esc(app.short_description || t("noShortDescription"))}</p><p>${
    members ? esc(interp(t("communityMembersTracked"), { count: fmt(members) })) : ""
  }</p></div>`;
}

function polar(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx, cy, r, startAngle, endAngle) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", cx, cy, "L", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y, "Z"].join(" ");
}

function showPieTooltip(event, row, share) {
  let tooltip = document.querySelector(".pie-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "pie-tooltip";
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `<strong>${esc(row.languageName)}</strong><div>${fmt(row.total_reviews)} ${t(
    "chartPieTooltipReviews"
  )}</div><div>${share.toFixed(2)}%</div><div>${t("positiveCount").replace("{count}", fmt(
    row.total_positive
  ))}</div><div>${t("negativeCount").replace("{count}", fmt(row.total_negative))}</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function hidePieTooltip() {
  const tooltip = document.querySelector(".pie-tooltip");
  if (tooltip) tooltip.style.display = "none";
}

function renderPieChart(rows) {
  const top = rows.slice(0, 8);
  const total = top.reduce((sum, row) => sum + row.total_reviews, 0) || 1;
  const palette = ["#5ec8ff", "#79e39f", "#ffd166", "#c084fc", "#f97316", "#22c55e", "#fb7185", "#60a5fa"];
  const wrap = document.createElement("div");
  wrap.className = "pie-wrap";
  const chart = document.createElement("div");
  chart.className = "pie-chart";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 240 240");

  let start = 0;
  top.forEach((row, index) => {
    const share = (row.total_reviews / total) * 100;
    const end = start + (share / 100) * 360;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", arc(120, 120, 110, start, end));
    path.setAttribute("fill", palette[index % palette.length]);
    path.setAttribute("class", "pie-slice");
    path.addEventListener("mousemove", (event) => showPieTooltip(event, row, share));
    path.addEventListener("mouseleave", hidePieTooltip);
    svg.appendChild(path);
    start = end;
  });

  const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hole.setAttribute("cx", "120");
  hole.setAttribute("cy", "120");
  hole.setAttribute("r", "66");
  hole.setAttribute("class", "pie-hole");
  svg.appendChild(hole);
  chart.appendChild(svg);
  wrap.appendChild(chart);
  els.chartContainer.appendChild(wrap);

  top.forEach((row, index) => {
    const item = document.createElement("div");
    item.className = "pie-legend-item";
    item.innerHTML = `<span class="pie-dot" style="background:${palette[index % palette.length]}"></span><span>${esc(
      row.languageName
    )}</span><span>${t("portion")}: ${((row.total_reviews / total) * 100).toFixed(2)}%</span>`;
    els.chartContainer.appendChild(item);
  });
}

function renderBarChart(rows) {
  const top = rows.slice(0, 12);
  const max = top[0]?.total_reviews || 1;
  const total = top.reduce((sum, row) => sum + row.total_reviews, 0) || 1;

  top.forEach((row) => {
    const share = ((row.total_reviews / total) * 100).toFixed(2);
    const score = row.total_reviews ? Math.round((row.total_positive / row.total_reviews) * 100) : 0;
    const element = document.createElement("div");
    element.className = "chart-row";
    element.innerHTML = `<div class="chart-labels"><span>${esc(row.languageName)}</span><span>${fmt(
      row.total_reviews
    )}</span></div><div class="chart-meta"><span>${t("portion")}: ${share}%</span><span>${t("score")}: ${score}% (${esc(
      row.review_score_desc
    )})</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${(
      (row.total_positive / max) *
      100
    ).toFixed(2)}%"></div><div class="stacked-negative" style="width:${(
      (row.total_negative / max) *
      100
    ).toFixed(2)}%"></div></div><div class="chart-subtext"><span>${t("positiveCount").replace(
      "{count}",
      fmt(row.total_positive)
    )}</span><span>${t("negativeCount").replace("{count}", fmt(row.total_negative))}</span></div>`;
    els.chartContainer.appendChild(element);
  });
}

function renderDistributionChart(rows) {
  els.chartContainer.innerHTML = "";
  if (state.chartType === "pie") renderPieChart(rows);
  else renderBarChart(rows);
}

function normalizeWordCloudText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9'\s-]+/g, " ");
}

function normalizePreferenceTerm(text) {
  return normalizeWordCloudText(text).replace(/\s+/g, " ").trim();
}

function buildAllowedTermStats(reviews, allowedTerms) {
  const stats = new Map();
  allowedTerms.forEach((term) => {
    stats.set(term, { reviewCount: 0, occurrences: 0, positiveReviews: 0, negativeReviews: 0 });
  });

  reviews.forEach((review) => {
    const normalizedReview = normalizeWordCloudText(review.review);
    allowedTerms.forEach((term) => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|\\s)${escaped}(?=\\s|$)`, "g");
      const matches = normalizedReview.match(regex) || [];
      if (!matches.length) return;
      const entry = stats.get(term);
      entry.occurrences += matches.length;
      entry.reviewCount += 1;
      if (review.voted_up) entry.positiveReviews += 1;
      else entry.negativeReviews += 1;
    });
  });

  return stats;
}

function getWordCloudBlockedTerms() {
  const app = state.appDetails.get(state.currentAppId)?.[state.currentAppId]?.data;
  const name = app?.name || "";
  const tokens = (normalizeWordCloudText(name).match(/[a-z][a-z'-]{2,}/g) || [])
    .map((token) => token.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
  const blocked = new Set(tokens);
  for (let index = 0; index < tokens.length - 1; index += 1) {
    blocked.add(`${tokens[index]} ${tokens[index + 1]}`);
  }
  state.wordCloudPrefs.banned.forEach((term) => blocked.add(term));
  return blocked;
}

function looksLikeContentTerm(token, blockedTerms) {
  if (state.wordCloudPrefs.allowed.includes(token)) return true;
  if (!token || token.length < 3) return false;
  if (blockedTerms.has(token)) return false;
  if (WORD_STOP_WORDS.has(token) || WORD_GAME_STOP_WORDS.has(token)) return false;
  if (WORD_KEEP_VERBS.has(token)) return true;
  if (WORD_VERB_STOP_WORDS.has(token)) return false;
  if (/^\d+$/.test(token)) return false;
  if (token.endsWith("ly")) return false;
  return true;
}

function extractWordCloudTerms(reviews) {
  const blockedTerms = getWordCloudBlockedTerms();
  const allowedTerms = state.wordCloudPrefs.allowed.filter((term) => !blockedTerms.has(term));
  const docs = new Map();
  const counts = new Map();
  const positiveDocs = new Map();
  const negativeDocs = new Map();
  const minReviewCount = Math.max(3, Math.ceil(reviews.length * 0.02));

  reviews.forEach((review) => {
    const normalizedReview = normalizeWordCloudText(review.review);
    const tokens = (normalizedReview.match(/[a-z][a-z'-]{2,}/g) || [])
      .map((token) => token.replace(/^'+|'+$/g, ""))
      .filter((token) => looksLikeContentTerm(token, blockedTerms));

    const terms = [];
    tokens.forEach((token, index) => {
      terms.push(token);
      const next = tokens[index + 1];
      if (next) {
        const phrase = `${token} ${next}`;
        if (!blockedTerms.has(phrase) && looksLikeContentTerm(next, blockedTerms)) terms.push(phrase);
      }
    });

    const seen = new Set();
    terms.forEach((term) => {
      counts.set(term, (counts.get(term) || 0) + 1);
      if (!seen.has(term)) {
        docs.set(term, (docs.get(term) || 0) + 1);
        if (review.voted_up) positiveDocs.set(term, (positiveDocs.get(term) || 0) + 1);
        else negativeDocs.set(term, (negativeDocs.get(term) || 0) + 1);
        seen.add(term);
      }
    });

  });

  const forcedStats = buildAllowedTermStats(reviews, allowedTerms);
  forcedStats.forEach((entry, term) => {
    if (!entry.reviewCount) return;
    counts.set(term, entry.occurrences);
    docs.set(term, entry.reviewCount);
    positiveDocs.set(term, entry.positiveReviews);
    negativeDocs.set(term, entry.negativeReviews);
  });

  return [...docs.entries()]
    .map(([term, reviewCount]) => {
      const occurrences = counts.get(term) || reviewCount;
      const positiveReviews = positiveDocs.get(term) || 0;
      const negativeReviews = negativeDocs.get(term) || 0;
      return {
        term,
        reviewCount,
        occurrences,
        positiveReviews,
        negativeReviews,
        positiveRate: reviewCount ? (positiveReviews / reviewCount) * 100 : 0,
        score: reviewCount * Math.log1p(occurrences) + Math.log1p(reviewCount) * 2,
      };
    })
    .filter((entry) => state.wordCloudPrefs.allowed.includes(entry.term) || entry.reviewCount >= minReviewCount)
    .filter((entry) => !blockedTerms.has(entry.term))
    .filter((entry) => {
      if (!entry.term.includes(" ")) return true;
      const [first, second] = entry.term.split(" ");
      const firstReviews = docs.get(first) || 1;
      const secondReviews = docs.get(second) || 1;
      return entry.reviewCount >= Math.max(minReviewCount + 1, Math.min(firstReviews, secondReviews) * 0.22);
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 80)
    .filter((entry, index, array) => index < 55 || allowedTerms.includes(entry.term));
}

function showWordCloudTooltip(event, entry) {
  let tooltip = document.querySelector(".word-cloud-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "word-cloud-tooltip";
    document.body.appendChild(tooltip);
  }
  tooltip.innerHTML = `<strong>${esc(entry.term)}</strong><div>${fmt(entry.reviewCount)} reviews</div><div>${t(
    "positive"
  )}: ${fmt(entry.positiveReviews)}</div><div>${t("negative")}: ${fmt(entry.negativeReviews)}</div><div>${t(
    "summaryPositiveRate"
  )}: ${entry.positiveRate.toFixed(1)}%</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function hideWordCloudTooltip() {
  const tooltip = document.querySelector(".word-cloud-tooltip");
  if (tooltip) tooltip.style.display = "none";
}

function renderWordCloud() {
  els.wordCloudContainer.innerHTML = "";
  els.wordCloudTopList.innerHTML = "";

  if (!state.wordCloudTerms.length) {
    els.wordCloudContainer.innerHTML = `<div class="word-cloud-empty">${esc(
      els.wordCloudStatus.textContent || t("wordCloudEmpty")
    )}</div>`;
    return;
  }

  const maxScore = state.wordCloudTerms[0]?.score || 1;
  const rates = state.wordCloudTerms.map((entry) => entry.positiveRate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const STEAM_NEGATIVE = { r: 196, g: 69, b: 76 };
  const STEAM_NEUTRAL = { r: 146, g: 118, b: 89 };
  const STEAM_POSITIVE = { r: 138, g: 195, b: 74 };

  const mixColor = (left, right, amount) => {
    const t = Math.max(0, Math.min(1, amount));
    const r = Math.round(left.r + (right.r - left.r) * t);
    const g = Math.round(left.g + (right.g - left.g) * t);
    const b = Math.round(left.b + (right.b - left.b) * t);
    return `rgb(${r} ${g} ${b})`;
  };

  state.wordCloudTerms.forEach((entry, index) => {
    const span = document.createElement("span");
    span.className = "word-cloud-term";
    const scale = entry.score / maxScore;
    const sentimentScale = maxRate === minRate ? 0.5 : (entry.positiveRate - minRate) / (maxRate - minRate);
    const color =
      sentimentScale >= 0.5
        ? mixColor(STEAM_NEUTRAL, STEAM_POSITIVE, (sentimentScale - 0.5) / 0.5)
        : mixColor(STEAM_NEGATIVE, STEAM_NEUTRAL, sentimentScale / 0.5);
    span.style.fontSize = `${0.95 + scale * 3.6}rem`;
    span.style.fontWeight = `${420 + Math.round(scale * 320)}`;
    span.style.color = color;
    span.textContent = entry.term;
    span.addEventListener("click", async () => {
      state.analysisTab = "reviews";
      updateWorkspaceTabs();
      els.reviewSearchInput.value = entry.term;
      els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      await runReviewSearch();
    });
    span.addEventListener("mousemove", (event) => showWordCloudTooltip(event, entry));
    span.addEventListener("mouseleave", hideWordCloudTooltip);
    els.wordCloudContainer.appendChild(span);
  });

  const topTerms = state.wordCloudTerms.slice(0, 10);
  const maxReviews = topTerms[0]?.reviewCount || 1;
  topTerms.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "chart-row";
    row.role = "button";
    row.tabIndex = 0;
    row.innerHTML = `<div class="chart-labels"><span>${esc(entry.term)}</span><span>${fmt(
      entry.reviewCount
    )}</span></div><div class="chart-meta"><span>${t("summaryPositiveRate")}: ${entry.positiveRate.toFixed(
      1
    )}%</span><span>${fmt(entry.occurrences)} uses</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${(
      (entry.positiveReviews / maxReviews) *
      100
    ).toFixed(2)}%"></div><div class="stacked-negative" style="width:${(
      (entry.negativeReviews / maxReviews) *
      100
    ).toFixed(2)}%"></div></div><div class="chart-subtext"><span>${t("positiveCount").replace(
      "{count}",
      fmt(entry.positiveReviews)
    )}</span><span>${t("negativeCount").replace("{count}", fmt(entry.negativeReviews))}</span></div>`;
    const openSearch = async () => {
      state.analysisTab = "reviews";
      updateWorkspaceTabs();
      els.reviewSearchInput.value = entry.term;
      els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      await runReviewSearch();
    };
    row.addEventListener("click", openSearch);
    row.addEventListener("keydown", async (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      await openSearch();
    });
    els.wordCloudTopList.appendChild(row);
  });
}

function getFilteredReviews(reviews) {
  return reviews.filter((review) => {
    if (state.reviewFilters.sentiment === "positive" && !review.voted_up) return false;
    if (state.reviewFilters.sentiment === "negative" && review.voted_up) return false;
    if (state.reviewFilters.saved === "saved" && !isReviewSaved(review)) return false;
    if (state.reviewFilters.saved === "unsaved" && isReviewSaved(review)) return false;

    const playtimeFilter = REVIEW_PLAYTIME_FILTERS.find((entry) => entry.value === state.reviewFilters.playtime);
    if (playtimeFilter) {
      const [min, max] = playtimeFilter.minutes;
      const playtime = review.author.playtime_forever || 0;
      const lowerOk = playtimeFilter.value === "all" ? true : playtime >= min;
      const upperOk = max === Number.POSITIVE_INFINITY ? true : playtime < max;
      if (!lowerOk || !upperOk) return false;
    }

    const lengthFilter = REVIEW_LENGTH_FILTERS.find((entry) => entry.value === state.reviewFilters.length);
    if (lengthFilter) {
      const [min, max] = lengthFilter.chars;
      const length = getReviewLength(review);
      const lowerOk = lengthFilter.value === "all" ? true : length >= min;
      const upperOk = max === Number.POSITIVE_INFINITY ? true : length < max;
      if (!lowerOk || !upperOk) return false;
    }

    return true;
  });
}

function getSortedReviews(reviews) {
  const items = [...reviews];
  items.sort((left, right) => {
    if (state.reviewSort === "playtime") {
      return (right.author.playtime_forever || 0) - (left.author.playtime_forever || 0);
    }
    if (state.reviewSort === "length") {
      return getReviewLength(right) - getReviewLength(left);
    }
    return (right.timestamp_created || 0) - (left.timestamp_created || 0);
  });
  return items;
}

function updateReviewSummary() {
  const positiveCount = state.reviewDisplayedReviews.filter((review) => review.voted_up).length;
  const negativeCount = state.reviewDisplayedReviews.length - positiveCount;
  const positiveRate = state.reviewDisplayedReviews.length
    ? ((positiveCount / state.reviewDisplayedReviews.length) * 100).toFixed(1)
    : "0.0";

  if (state.reviewSearchStats) {
    els.searchSummary.innerHTML = `${t("searchSummaryLead")} <span class="search-summary-strong">${t(
      "searchCount"
    )}: ${fmt(state.reviewSearchStats.hitCount)}</span> <span class="search-summary-strong">${t(
      "searchReviews"
    )}: ${fmt(state.reviewSearchStats.matchedReviews)}</span> <span class="search-summary-strong">${t(
      "searchShown"
    )}: ${fmt(state.reviewDisplayedReviews.length)}</span> <span class="search-summary-strong">${t(
      "positive"
    )}: ${fmt(positiveCount)}</span> <span class="search-summary-strong">${t("negative")}: ${fmt(
      negativeCount
    )}</span> <span class="search-summary-strong">${t("summaryPositiveRate")}: ${positiveRate}%</span>`;
    return;
  }

  els.searchSummary.innerHTML = `${t("resultSummaryLead")} <span class="search-summary-strong">${t(
    "searchShown"
  )}: ${fmt(state.reviewDisplayedReviews.length)}</span> <span class="search-summary-strong">${t(
    "positive"
  )}: ${fmt(positiveCount)}</span> <span class="search-summary-strong">${t("negative")}: ${fmt(
    negativeCount
  )}</span> <span class="search-summary-strong">${t("summaryPositiveRate")}: ${positiveRate}%</span>`;
}

function applyReviewView() {
  const filtered = getFilteredReviews(state.reviewSourceReviews);
  state.reviewDisplayedReviews = getSortedReviews(filtered);
  updateReviewSummary();
  renderReviews(state.reviewDisplayedReviews);
  renderPaging(state.reviewDisplayedReviews.length, state.reviewSourceReviews.length);
}

function renderReviews(reviews) {
  els.reviewsList.innerHTML = "";
  if (!reviews.length) {
    els.reviewsList.innerHTML = `<div class="status-text">${t("noReviews")}</div>`;
    return;
  }

  reviews.forEach((review) => {
    const created = new Date(review.timestamp_created * 1000).toLocaleString(
      state.currentUiLanguage === "ja" ? "ja-JP" : "en-US"
    );
    const sentiment = review.voted_up ? t("positive") : t("negative");
    const saved = isReviewSaved(review);
    const safeText = esc(review.review || "");
    const highlighted = state.activeSearchRegex
      ? safeText.replace(state.activeSearchRegex, (match) => `<mark class="review-highlight">${match}</mark>`)
      : safeText;
    const card = document.createElement("article");
    card.className = `review-card ${review.voted_up ? "positive" : "negative"}`;
    card.innerHTML = `<div class="review-banner">${esc(interp(t("reviewBy"), {
      sentiment,
    }))} <a href="${esc(review.author.profile_url)}" target="_blank" rel="noreferrer">${esc(
      review.author.personaname || review.author.steamid
    )}</a><button class="review-bookmark ${saved ? "is-saved" : ""}" type="button" data-bookmark-appid="${esc(
      getReviewAppId(review)
    )}" data-bookmark-review="${esc(review.recommendationid)}">${saved ? t("savedReview") : t(
      "saveReview"
    )}</button></div><div class="review-body"><div class="review-meta"><div>${t("date")}: ${esc(
      created
    )}</div><div>${t("steamPurchase")}: ${review.steam_purchase}</div><div>${t("playtime")}: ${fmt(
      review.author.playtime_forever
    )} ${t("minutes")}</div><div>${t("gamesOwned")}: ${fmt(
      review.author.num_games_owned
    )}</div><div>${t("reviewCount")}: ${fmt(review.author.num_reviews)}</div><div>${t("language")}: ${esc(
      getLanguageName(review.language)
    )}</div><div>Chars: ${fmt(getReviewLength(review))}</div></div><div class="review-text">${highlighted}</div></div>`;
    els.reviewsList.appendChild(card);
  });
}

function renderPaging(loaded, total) {
  els.pagingLabel.textContent = interp(t("loadedPaging"), {
    loaded: fmt(loaded),
    total: fmt(total),
  });
}

async function collectReviews(lang, force = false) {
  const targets = lang === "all" ? LANGUAGES.map(([, code]) => code) : [lang];
  const out = [];

  for (const code of targets) {
    const seen = new Set();
    let cursor = "*";
    while (!seen.has(cursor)) {
      seen.add(cursor);
      const payload = await getReviews(state.currentAppId, code, cursor, force);
      out.push(...(payload.reviews || []).map((review) => ({ ...review, _appid: state.currentAppId })));
      if (!payload.reviews?.length || !payload.cursor) break;
      cursor = payload.cursor;
    }
  }

  return out;
}

function resetReviewViewState() {
  state.activeSearchRegex = null;
  state.reviewBaseReviews = [];
  state.reviewSourceReviews = [];
  state.reviewDisplayedReviews = [];
  state.reviewSearchStats = null;
  state.reviewSort = "date";
  state.reviewFilters = { sentiment: "all", saved: "all", playtime: "all", length: "all" };
  if (els.reviewPlaytimeFilter) els.reviewPlaytimeFilter.value = "all";
  if (els.reviewLengthFilter) els.reviewLengthFilter.value = "all";
  updateToggleButtons(els.reviewSortToggle, state.reviewSort, "sort");
  updateToggleButtons(els.reviewSentimentToggle, state.reviewFilters.sentiment, "sentiment");
  updateToggleButtons(els.reviewSavedToggle, state.reviewFilters.saved, "savedFilter");
}

async function loadReviewTabData() {
  if (!state.currentAppId) return;

  const lang = els.reviewLanguageSelection.value;
  resetReviewViewState();
  setFetchState("loading", t("searchLoading"), 35);
  const reviews =
    state.reviewTab === "saved" ? getSavedReviewsForCurrentApp(lang) : await collectReviews(lang);
  state.reviewBaseReviews = reviews;
  state.reviewSourceReviews = reviews;
  els.reviewTitle.textContent =
    state.reviewTab === "saved" ? t("savedReviewsTitle") : `${getLanguageName(lang)} ${t("selectedReviews")}`;
  applyReviewView();
  setFetchState("success", t("usingCache"), 100);
}

async function loadReviewBrowserForLanguage() {
  await loadReviewTabData();
}

async function loadPlaytime() {
  const lang = els.playtimeLanguageSelection.value;
  els.playtimeStatus.textContent = t("searchLoading");
  const reviews = await collectReviews(lang);
  const playtimeBuckets = getPlaytimeBuckets();
  const buckets = playtimeBuckets.map(() => ({ posKey: 0, posSteam: 0, negKey: 0, negSteam: 0 }));

  reviews.forEach((review) => {
    let index = playtimeBuckets.length - 1;
    for (let n = 0; n < playtimeBuckets.length; n += 1) {
      if (review.author.playtime_forever <= playtimeBuckets[n].max) {
        index = n;
        break;
      }
    }

    const bucket = buckets[index];
    if (review.voted_up) {
      if (review.steam_purchase) bucket.posSteam += 1;
      else bucket.posKey += 1;
    } else if (review.steam_purchase) bucket.negSteam += 1;
    else bucket.negKey += 1;
  });

  const max = Math.max(
    1,
    ...buckets.map((bucket) => Math.max(bucket.posKey + bucket.posSteam, bucket.negKey + bucket.negSteam))
  );

  els.playtimeChart.innerHTML = "";
  buckets.forEach((bucket, index) => {
    const row = document.createElement("div");
    row.className = "playtime-row";
    const cutoffIndex = Math.min(index, state.playtimeCutoffs.length - 1);
    const labelMarkup =
      state.playtimeEditingIndex === cutoffIndex
        ? `<input class="playtime-label-input" type="text" data-playtime-edit-input="${cutoffIndex}" value="${esc(
            formatDurationLabel(state.playtimeCutoffs[cutoffIndex])
          )}" />`
        : `<button class="playtime-label-button" type="button" data-playtime-edit-start="${cutoffIndex}">${playtimeBuckets[index].label}</button>`;
    row.innerHTML = `<div class="playtime-label">${labelMarkup}</div><div class="stack"><div class="stack-bar"><div class="seg seg-pos-key" style="width:${(
      ((bucket.posKey / max) * 100) || 0
    ).toFixed(2)}%"></div><div class="seg seg-pos-steam" style="width:${(
      ((bucket.posSteam / max) * 100) || 0
    ).toFixed(2)}%"></div></div><div class="stack-bar"><div class="seg seg-neg-key" style="width:${(
      ((bucket.negKey / max) * 100) || 0
    ).toFixed(2)}%"></div><div class="seg seg-neg-steam" style="width:${(
      ((bucket.negSteam / max) * 100) || 0
    ).toFixed(2)}%"></div></div><div class="status-text">${t("positiveCount").replace(
      "{count}",
      fmt(bucket.posKey + bucket.posSteam)
    )} | ${t("negativeCount").replace("{count}", fmt(bucket.negKey + bucket.negSteam))}</div></div>`;
    els.playtimeChart.appendChild(row);
  });

  if (state.playtimeEditingIndex !== null) {
    const input = els.playtimeChart.querySelector(`[data-playtime-edit-input="${state.playtimeEditingIndex}"]`);
    if (input) {
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    }
  }

  els.playtimeStatus.textContent = interp(t("loadedTotalReviews"), { count: fmt(reviews.length) });
}

async function runReviewSearch() {
  const keyword = els.reviewSearchInput.value.trim();
  const lang = els.reviewLanguageSelection.value;

  if (!keyword) {
    state.activeSearchRegex = null;
    state.reviewSearchStats = null;
    state.reviewSourceReviews = [...state.reviewBaseReviews];
    els.searchSummary.textContent = t("searchEmpty");
    applyReviewView();
    return;
  }

  els.searchSummary.textContent = t("searchLoading");
  const reviews =
    state.reviewTab === "saved" ? getSavedReviewsForCurrentApp(lang) : await collectReviews(lang);
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");
  let hitCount = 0;

  const matched = reviews.filter((review) => {
    const matches = review.review?.match(regex) || [];
    hitCount += matches.length;
    return matches.length > 0;
  });

  state.activeSearchRegex = matched.length ? regex : null;
  state.reviewSearchStats = matched.length
    ? { hitCount, matchedReviews: matched.length, keyword }
    : null;
  state.reviewSourceReviews = matched;

  if (!matched.length) {
    renderReviews([]);
    renderPaging(0, reviews.length);
    els.searchSummary.textContent = t("searchNoMatch");
    return;
  }

  applyReviewView();
}

async function generateWordCloud() {
  if (!state.currentAppId) return;
  const language = els.wordLanguageSelection.value || "all";
  els.wordCloudStatus.textContent = t("wordCloudLoading");
  els.wordCloudContainer.innerHTML = `<div class="word-cloud-empty">${esc(t("wordCloudLoading"))}</div>`;
  const reviews =
    state.wordCloudSentiment === "saved" ? getSavedReviewsForCurrentApp(language) : await collectReviews(language);
  const filtered =
    state.wordCloudSentiment === "saved"
      ? reviews
      : state.wordCloudSentiment === "positive"
      ? reviews.filter((review) => review.voted_up)
      : state.wordCloudSentiment === "negative"
        ? reviews.filter((review) => !review.voted_up)
        : reviews;
  state.wordCloudTerms = extractWordCloudTerms(filtered);
  els.wordCloudStatus.textContent = state.wordCloudTerms.length
    ? interp(t("wordCloudReady"), { reviews: fmt(filtered.length), terms: fmt(state.wordCloudTerms.length) })
    : t("wordCloudEmpty");
  renderWordCloud();
}

async function updateWordPreference(kind) {
  const term = normalizePreferenceTerm(els.wordPreferenceInput.value);
  if (!term) return;
  if (kind === "allowed") {
    state.wordCloudPrefs.allowed = [...new Set([...state.wordCloudPrefs.allowed, term])];
    state.wordCloudPrefs.banned = state.wordCloudPrefs.banned.filter((item) => item !== term);
  } else {
    state.wordCloudPrefs.banned = [...new Set([...state.wordCloudPrefs.banned, term])];
    state.wordCloudPrefs.allowed = state.wordCloudPrefs.allowed.filter((item) => item !== term);
  }
  els.wordPreferenceInput.value = "";
  renderWordPreferenceList();
  await persistWordCloudPrefs();
  if (state.currentAppId) await generateWordCloud();
}

async function removeWordPreference(kind, term) {
  if (kind === "allowed") state.wordCloudPrefs.allowed = state.wordCloudPrefs.allowed.filter((item) => item !== term);
  if (kind === "banned") state.wordCloudPrefs.banned = state.wordCloudPrefs.banned.filter((item) => item !== term);
  renderWordPreferenceList();
  await persistWordCloudPrefs();
  if (state.currentAppId) await generateWordCloud();
}

async function toggleSavedReview(appid, recommendationid, button) {
  const key = `${appid}::${recommendationid}`;
  const existingIndex = state.savedReviews.findIndex((review) => getSavedReviewKey(review) === key);

  if (existingIndex >= 0) {
    state.savedReviews.splice(existingIndex, 1);
    schedulePersistSavedReviews();
    if (state.reviewTab === "saved") {
      await loadReviewTabData();
    } else {
      if (button) {
        button.classList.remove("is-saved");
        button.textContent = t("saveReview");
      }
    }
    return;
  }

  const sourceReview =
    state.reviewDisplayedReviews.find((review) => getSavedReviewKey(review) === key) ||
    state.reviewSourceReviews.find((review) => getSavedReviewKey(review) === key) ||
    state.reviewBaseReviews.find((review) => getSavedReviewKey(review) === key);

  if (!sourceReview) return;

  state.savedReviews.push({
    ...sourceReview,
    _appid: appid,
    savedAt: Date.now(),
  });
  schedulePersistSavedReviews();
  if (button) {
    button.classList.add("is-saved");
    button.textContent = t("savedReview");
  }
}

async function unsaveDisplayedSavedReviews() {
  const shownKeys = new Set(state.reviewDisplayedReviews.map((review) => getSavedReviewKey(review)));
  if (!shownKeys.size) return;
  state.savedReviews = state.savedReviews.filter((review) => !shownKeys.has(getSavedReviewKey(review)));
  schedulePersistSavedReviews();
  await loadReviewTabData();
}

function downloadSavedReviewsCsv() {
  const rows = [
    ["AppID", "Timestamp Created", "Saved At", "UserID", "Language", "PlayTimeTotal", "ReviewID", "Purchase", "Recommended", "ReviewText"].join(","),
  ];
  state.reviewDisplayedReviews.forEach((review) => {
    rows.push(
      [
        getReviewAppId(review),
        review.timestamp_created,
        review.savedAt || "",
        review.author.steamid,
        review.language,
        review.author.playtime_forever,
        review.recommendationid,
        review.steam_purchase,
        review.voted_up,
        `"${String(review.review || "").replaceAll('"', '""')}"`,
      ].join(",")
    );
  });

  const blob = new Blob([`\uFEFF${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.currentAppId || "saved"}-saved-reviews.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function commitPlaytimeEdit(index, rawValue) {
  const parsed = parseDurationInput(rawValue);
  state.playtimeEditingIndex = null;
  if (parsed) {
    state.playtimeCutoffs[index] = parsed;
    state.playtimeCutoffs.sort((a, b) => a - b);
  }
  await loadPlaytime();
}

async function refreshCurrentCache() {
  if (!state.currentAppId) return;

  await deletePrefix(`appdetails::${state.currentAppId}`);
  await deletePrefix(`groupdetails::${state.currentAppId}`);
  await deletePrefix(`reviews::${state.currentAppId}::`);

  state.appDetails.delete(state.currentAppId);
  state.groupDetails.delete(state.currentAppId);
  [...state.reviewCache.keys()].forEach((key) => {
    if (key.startsWith(`${state.currentAppId}::`)) state.reviewCache.delete(key);
  });
  [...state.cursorCache.keys()].forEach((key) => {
    if (key.startsWith(`${state.currentAppId}::`)) state.cursorCache.delete(key);
  });

  await loadSummary(state.currentAppId, true);
}

async function loadSummary(appid, force = false) {
  els.fetchButton.disabled = true;
  els.statusText.textContent = t("loadingAppDetails");
  els.wordCloudStatus.textContent = "";
  els.wordCloudContainer.innerHTML = "";
  els.chartContainer.innerHTML = "";
  els.reviewsList.innerHTML = "";
  els.playtimeChart.innerHTML = "";
  els.playtimeStatus.textContent = "";
  els.searchSummary.textContent = "";
  resetReviewViewState();

  try {
    if (!API_BASE) throw new Error(t("noProxyConfigured"));

    state.currentAppId = appid;
    setFetchState("loading", t("loadingAppDetails"), 8);
    const [details, group] = await Promise.all([getAppDetails(appid, force), getGroupDetails(appid, force)]);
    if (!details[appid]?.success) throw new Error(t("appNotFound"));

    renderHero(appid, details, group);

    const rows = [];
    for (const [name, code] of LANGUAGES) {
      const payload = await getReviews(appid, code, "*", force);
      rows.push({
        languageName: name,
        languageCode: code,
        total_reviews: payload.query_summary.total_reviews || 0,
        total_positive: payload.query_summary.total_positive || 0,
        total_negative: payload.query_summary.total_negative || 0,
        review_score_desc: payload.query_summary.review_score_desc || "No rating",
      });

      const message = interp(t("loadedLanguages"), { loaded: rows.length, total: LANGUAGES.length });
      els.statusText.textContent = message;
      setFetchState("loading", message, 18 + (rows.length / LANGUAGES.length) * 72);
    }

    rows.sort((left, right) => right.total_reviews - left.total_reviews);
    state.summaryRows = rows;
    state.wordCloudTerms = [];
    renderDistributionChart(rows);
    populateLanguageSelect(els.reviewLanguageSelection);
    populateLanguageSelect(els.playtimeLanguageSelection);
    populateLanguageSelect(els.wordLanguageSelection);
    els.workspaceSection.classList.remove("hidden");
    await loadReviewBrowserForLanguage();
    await generateWordCloud();
    await loadPlaytime();

    const total = rows.reduce((sum, row) => sum + row.total_reviews, 0);
    els.statusText.textContent = interp(t("loadedTotalReviews"), { count: fmt(total) });
    setFetchState(
      "success",
      `${interp(t("loadedTotalReviews"), { count: fmt(total) })} ${t("usingCache")}`,
      100
    );
  } catch (error) {
    els.appHero.classList.add("empty");
    els.appHero.style.background = "";
    els.appHero.innerHTML = `<div class="hero-copy"><p class="eyebrow">${t("requestFailed")}</p><h2>${esc(
      error.message
    )}</h2><p>${t("checkAppId")}</p></div>`;
    els.statusText.textContent = error.message;
    setFetchState("error", error.message, 100);
  } finally {
    els.fetchButton.disabled = false;
  }
}

els.fetchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = els.appidInput.value.trim();
  if (!input) return;

  els.fetchButton.disabled = true;
  try {
    const resolved = await resolveAppInput(input);
    if (!resolved?.appid) return;
    if (resolved.name) {
      els.appidInput.value = resolved.name;
      els.statusText.textContent = interp(t("resolvedGame"), resolved);
    }
    await loadSummary(resolved.appid);
  } catch (error) {
    els.statusText.textContent = error.message;
    setFetchState("error", error.message, 100);
  } finally {
    els.fetchButton.disabled = false;
  }
});

els.refreshCacheButton.addEventListener("click", refreshCurrentCache);

els.downloadCsvButton.addEventListener("click", () => {
  if (!state.currentAppId) return;
  const rows = [
    ["AppID", "Timestamp Created", "UserID", "Language", "PlayTimeTotal", "ReviewID", "Purchase", "Recommended", "ReviewText"].join(","),
  ];
  [...state.reviewCache.values()].forEach((payload) => {
    (payload.reviews || []).forEach((review) => {
      rows.push(
        [
          state.currentAppId,
          review.timestamp_created,
          review.author.steamid,
          review.language,
          review.author.playtime_forever,
          review.recommendationid,
          review.steam_purchase,
          review.voted_up,
          `"${String(review.review || "").replaceAll('"', '""')}"`,
        ].join(",")
      );
    });
  });

  const blob = new Blob([`\uFEFF${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.currentAppId}-reviews.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
});

els.uiLanguageToggle.addEventListener("click", () => {
  state.currentUiLanguage = state.currentUiLanguage === "ja" ? "en" : "ja";
  applyTranslations();
});

els.analysisTabToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-analysis-tab]");
  if (!button || state.analysisTab === button.dataset.analysisTab) return;
  state.analysisTab = button.dataset.analysisTab;
  updateWorkspaceTabs();
});

els.dataTabToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-data-tab]");
  if (!button || state.dataTab === button.dataset.dataTab) return;
  state.dataTab = button.dataset.dataTab;
  updateWorkspaceTabs();
});

els.chartTypeToggle.addEventListener("click", () => {
  state.chartType = state.chartType === "bar" ? "pie" : "bar";
  applyTranslations();
  renderDistributionChart(state.summaryRows);
});

els.wordSentimentToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-word-sentiment]");
  if (!button) return;
  state.wordCloudSentiment = button.dataset.wordSentiment;
  updateToggleButtons(els.wordSentimentToggle, state.wordCloudSentiment, "wordSentiment");
});

els.generateWordCloudButton.addEventListener("click", generateWordCloud);
els.wordAllowButton.addEventListener("click", async () => {
  await updateWordPreference("allowed");
});
els.wordBanButton.addEventListener("click", async () => {
  await updateWordPreference("banned");
});
els.wordPreferenceList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-pref-term]");
  if (!button) return;
  await removeWordPreference(button.dataset.prefType, button.dataset.prefTerm);
});

els.reviewTabToggle.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button || state.reviewTab === button.dataset.tab) return;
  state.reviewTab = button.dataset.tab;
  updateReviewTabUi();
  await loadReviewTabData();
});

els.reviewLanguageSelection.addEventListener("change", loadReviewBrowserForLanguage);
els.reviewSearchButton.addEventListener("click", runReviewSearch);
els.playtimeLoadButton.addEventListener("click", loadPlaytime);
els.savedReviewsDownloadButton.addEventListener("click", downloadSavedReviewsCsv);
els.savedReviewsClearButton.addEventListener("click", unsaveDisplayedSavedReviews);

els.reviewsList.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-bookmark-review]");
  if (!button) return;
  await toggleSavedReview(button.dataset.bookmarkAppid, button.dataset.bookmarkReview, button);
});

els.reviewSortToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-sort]");
  if (!button) return;
  state.reviewSort = button.dataset.sort;
  updateToggleButtons(els.reviewSortToggle, state.reviewSort, "sort");
  applyReviewView();
});

els.reviewSentimentToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-sentiment]");
  if (!button) return;
  state.reviewFilters.sentiment = button.dataset.sentiment;
  updateToggleButtons(els.reviewSentimentToggle, state.reviewFilters.sentiment, "sentiment");
  applyReviewView();
});

els.reviewSavedToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-saved-filter]");
  if (!button) return;
  state.reviewFilters.saved = button.dataset.savedFilter;
  updateToggleButtons(els.reviewSavedToggle, state.reviewFilters.saved, "savedFilter");
  applyReviewView();
});

els.reviewPlaytimeFilter.addEventListener("change", () => {
  state.reviewFilters.playtime = els.reviewPlaytimeFilter.value;
  applyReviewView();
});

els.reviewLengthFilter.addEventListener("change", () => {
  state.reviewFilters.length = els.reviewLengthFilter.value;
  applyReviewView();
});

els.playtimeCutoffControls.addEventListener("input", (event) => {
  const input = event.target.closest("[data-cutoff-index]");
  if (!input) return;
  const index = Number(input.dataset.cutoffIndex);
  const value = Number(input.value);
  if (!Number.isFinite(index) || index < 0) return;
  if (!Number.isFinite(value) || value <= 0) return;
  state.playtimeCutoffs[index] = Math.round(value);
});

els.playtimeChart.addEventListener("click", (event) => {
  const button = event.target.closest("[data-playtime-edit-start]");
  if (!button) return;
  state.playtimeEditingIndex = Number(button.dataset.playtimeEditStart);
  void loadPlaytime();
});

els.playtimeChart.addEventListener("keydown", (event) => {
  const input = event.target.closest("[data-playtime-edit-input]");
  if (!input) return;
  if (event.key === "Enter") {
    event.preventDefault();
    void commitPlaytimeEdit(Number(input.dataset.playtimeEditInput), input.value);
  }
  if (event.key === "Escape") {
    state.playtimeEditingIndex = null;
    void loadPlaytime();
  }
});

els.playtimeChart.addEventListener(
  "blur",
  (event) => {
    const input = event.target.closest("[data-playtime-edit-input]");
    if (!input) return;
    if (state.playtimeEditingIndex === null) return;
    void commitPlaytimeEdit(Number(input.dataset.playtimeEditInput), input.value);
  },
  true
);

Promise.all([loadSavedReviewsFromCache(), loadWordCloudPrefsFromCache()]).finally(() => {
  applyTranslations();
  updateCacheTimestamp(null);
  setFetchState("idle", t("fetchIdleBody"), 0);
  if (!API_BASE) {
    els.deploymentNote.classList.remove("hidden");
    els.deploymentNote.innerHTML = t("proxyRequired");
  }
});
