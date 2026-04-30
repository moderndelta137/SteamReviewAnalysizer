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
  "it窶冱","there","those","this","thats","that's","yeah","yes","nope","okay","ok","maybe","surely",
]);
const WORD_GAME_STOP_WORDS = new Set([
  "game","games","steam","review","reviews","player","players","play","played","playing","recommend","recommended",
  "fun","good","bad","great","best","better","worse","amazing","awesome","okay","nice","story","graphics",
  "sound","music","price","hours","hour","time","thing","things","people","someone","something","everything",
  "gameplay","world","combat","character","characters","enemy","enemies","boss","bosses","weapon","weapons",
]);
const WORD_STOP_WORDS_JA = new Set([
  "これ","それ","あれ","この","その","あの","ここ","そこ","あそこ","どこ","こと","もの","ため","よう","ところ","わけ",
  "ので","から","まで","だけ","ほど","くらい","です","ます","でした","ません","いる","ある","なる","する","した","して",
  "そして","でも","ただ","かなり","とても","もっと","まだ","もう","ぜひ","たぶん","ような","ように","なんか","なんで",
  "ゲーム","レビュー","プレイ","ストーリー","キャラ","本作",
]);
const WORD_GAME_STOP_WORDS_JA = new Set([
  "ゲーム","レビュー","プレイ","本作","ストーリー","キャラ","キャラクター","グラフィック","サウンド","steam"
]);
const WORD_STOP_WORDS_ZH = new Set([
  "这个","那个","这些","那些","这里","那里","什么","为什么","怎么","真的","感觉","觉得","就是","还是","已经","如果","因为",
  "而且","但是","不过","非常","比较","很多","有点","一下","一个","一种","一些","没有","不会","不能","可以","不是","不是很",
  "游戏","评论","玩家","游玩","体验"
]);
const WORD_GAME_STOP_WORDS_ZH = new Set([
  "游戏","评论","玩家","游玩","剧情","角色","画面","音乐","steam"
]);
const WORD_STOP_CHARS_ZH = new Set([
  "的","了","是","很","也","都","就","又","还","才","再","太","更","最","把","被","让","给","在","有","和","跟","与","及","并","而",
  "但","却","还","并","或","啊","吗","呢","吧","呀","哦","噢","嘛","着","过","里","上","下","中","对","向","将","把","被","比",
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
const TOPIC_TAGS_VERSION = 2;
const TOPIC_CLUSTER_CACHE_VERSION = 2;
const TOPIC_DEFINITIONS = [];

const I18N = {
  en: {
    brandEyebrow: "Steam review intelligence",
    brandTitle: "Steam Review Analyzer",
    uiLanguage: "UI Language",
    positiveRateColors: "Rate Color",
    recentGames: "Recent Games",
    fetchReviews: "Fetch Reviews",
    appInputPlaceholder: "Enter Steam AppID or game name",
    replicaEyebrow: "Replica build",
    heroTitle: "Load a Steam app and inspect review volume by language.",
    heroBody:
      "This first pass mirrors SteamScout's core flow: app details, language breakdown, review browsing, CSV export, and playtime buckets.",
    wordCloudEyebrow: "Word cloud",
    wordCloudTitle: "Word Cloud",
    wordCloudSentiment: "Sentiment",
    wordCloudView: "View",
    wordCloudGraph: "Word Cloud",
    scatterPlot: "Scatter Plot",
    generateWordCloud: "Generate",
    wordCloudFootnote: "Uses stop-word filtering, game-term filtering, document frequency, and phrase extraction.",
    wordCloudLoading: "Generating word cloud from reviews...",
    wordCloudEmpty: "No useful keywords found for this selection.",
    wordCloudReady: "Analyzed {reviews} reviews and surfaced {terms} keywords.",
    wordPreferenceLabel: "Word Preference",
    wordPreferencePlaceholder: "term or phrase",
    allowWord: "Allow",
    banWord: "Ban",
    languageBreakdown: "Language breakdown",
    reviewsByLanguage: "Steam Reviews by Language",
    distribution: "Distribution",
    reviewShare: "By Language",
    chartType: "Chart Type",
    barChart: "Bar chart",
    chartBar: "Bar Chart",
    pieChart: "Pie chart",
    reviewBrowser: "Review browser",
    reviewTimelineEyebrow: "Timeline",
    reviewTimeline: "Timeline",
    timelineModeReviews: "Review Count",
    timelineModeKeywords: "Word Search",
    timelineKeywords: "Keywords",
    timelineKeywordPlaceholder: "boss, crash, soundtrack",
    timelineAddKeyword: "Add",
    timelinePlotKeywords: "Plot",
    timelineKeywordEmpty: "Enter one or more keywords to plot.",
    timelineKeywordNoMatch: "No reviews in this range matched those keywords.",
    timelineKeywordStatus: "{terms} keywords plotted across {buckets} periods.",
    selectedReviews: "Selected Reviews",
    prev: "Prev",
    next: "Next",
    hoursPlayed: "Hours played",
    reviewDistributionByPlaytime: "By Playtime",
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
    loadingLanguageReviews: "Loading {language} reviews: {pages} pages, {reviews} reviews",
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
    timeSpan: "Time Span",
    timeSpanLifetime: "Lifetime",
    timeSpanWeek: "1 Week",
    timeSpanMonth: "1 Month",
    timeSpanYear: "1 Year",
    timeSpanCustom: "Custom",
    startDate: "Start",
    endDate: "End",
    applyRange: "Apply",
    invalidDateRange: "End date must be on or after the start date.",
    reviewStatusPositive: "{count} reviews ({portion}%)",
    reviewStatusNegative: "{count} reviews ({portion}%)",
    reviewStatusScore: "{score}% positive",
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
    scanningKeywordMatches: 'Scanning "{keyword}" across {reviews} reviews...',
    searchNoMatch: "No matching reviews found.",
    loadingOverlayTitle: "Loading",
    loadingOverlayBody: "Preparing data...",
    loadingCancel: "Cancel",
    loadingCancelled: "Loading cancelled.",
    aiStatusDisconnected: "Not connected",
    aiStatusConnected: "Connected",
    aiStatusConnecting: "Connecting",
    aiStatusGenerating: "Generating",
    aiStatusLoading: "Loading",
    downloadCsv: "Download CSV",
    aiSettings: "AI Model",
    aiBaseUrl: "Gemini Base URL",
    aiModel: "Model",
    aiApiKey: "Gemini API Key",
    aiConnect: "Connect",
    aiLoadModels: "Loading Gemini models...",
    aiModelsPrompt: "Enter Gemini API key to load models",
    aiModelsLoaded: "Loaded {count} Gemini models. Choose one and connect.",
    aiModelsFailed: "Could not load Gemini models.",
    aiConnected: "AI connected.",
    aiDisconnected: "AI not connected.",
    aiTesting: "Testing AI model...",
    aiConnectFailed: "AI connection failed.",
    aiAnalysisEyebrow: "Grounded AI Analysis",
    aiAnalysisTitle: "Review Analyst",
    aiAnalysisScope: "Answers from the current global time span using structured review evidence.",
    aiAnalysisQuestion: "Ask about the reviews",
    aiAnalysisPlaceholder: "What are the most common complaints in negative reviews this year?",
    aiTemplatePillar: "What's the pillar of the game?",
    aiTemplateFeature: "What's the most requested feature?",
    aiTemplateTrend: "What's the noteworthy trend in the recent reviews?",
    aiTemplateSales: "How to improve sales?",
    aiAnalysisAsk: "Ask AI",
    aiAnalysisNeedConnection: "Connect an AI model to ask grounded questions about the reviews.",
    aiAnalysisNeedApp: "Load a game first, then ask questions about its reviews.",
    aiAnalysisEmpty: "Ask a question and the AI will answer from review statistics plus representative excerpts.",
    aiAnalysisLoading: "Building grounded evidence from the reviews...",
    aiAnalysisNoReviews: "No reviews are available in the current global time span.",
    aiAnalysisCached: "Cached answer",
    aiAnalysisLive: "Fresh answer",
    aiAnalysisEvidence: "Grounded in {reviews} reviews, {topics} topics, and {snippets} representative excerpts.",
    aiAnalysisFailed: "AI analysis failed.",
    translateReview: "Translate",
    translatingReview: "Translating...",
    translationFailed: "Translation failed.",
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
    wordPreferenceLabel: "Word Preference",
    allowWord: "Allow",
    banWord: "Ban",
  },
  ja: {
    brandEyebrow: "Steamレビュー分析",
    brandTitle: "Steam Review Analyzer",
    uiLanguage: "表示言語",
    positiveRateColors: "評価率カラー",
    recentGames: "最近のゲーム",
    fetchReviews: "レビューを取得",
    appInputPlaceholder: "Steam AppID またはゲーム名を入力",
    replicaEyebrow: "レプリカビルド",
    heroTitle: "Steamアプリを読み込み、言語別のレビュー量を確認します。",
    heroBody:
      "この初期版では、SteamScoutの基本フローに沿って、アプリ情報、言語別内訳、レビュー閲覧、CSV出力、プレイ時間帯分析を扱います。",
    wordCloudEyebrow: "ワードクラウド",
    wordCloudTitle: "ワードクラウド",
    wordCloudSentiment: "評価",
    wordCloudView: "表示",
    wordCloudGraph: "ワードクラウド",
    scatterPlot: "散布図",
    generateWordCloud: "生成",
    wordCloudFootnote: "ストップワード除去、ゲーム用語除外、文書頻度、フレーズ抽出を使っています。",
    wordCloudLoading: "レビューからワードクラウドを生成しています...",
    wordCloudEmpty: "この条件では有効なキーワードが見つかりませんでした。",
    wordCloudReady: "{reviews}件のレビューを分析し、{terms}件のキーワードを抽出しました。",
    wordPreferenceLabel: "単語設定",
    wordPreferencePlaceholder: "単語またはフレーズ",
    allowWord: "許可",
    banWord: "除外",
    languageBreakdown: "言語別内訳",
    reviewsByLanguage: "Steamレビューの言語別集計",
    distribution: "分布",
    reviewShare: "言語別",
    chartType: "グラフ種類",
    barChart: "棒グラフ",
    chartBar: "棒グラフ",
    pieChart: "円グラフ",
    reviewBrowser: "レビュー閲覧",
    reviewTimelineEyebrow: "推移",
    reviewTimeline: "レビュー推移",
    timelineModeReviews: "レビュー数",
    timelineModeKeywords: "単語検索",
    timelineKeywords: "キーワード",
    timelineKeywordPlaceholder: "boss, crash, soundtrack",
    timelineAddKeyword: "追加",
    timelinePlotKeywords: "描画",
    timelineKeywordEmpty: "描画するキーワードを1つ以上入力してください。",
    timelineKeywordNoMatch: "この期間では該当キーワードを含むレビューが見つかりませんでした。",
    timelineKeywordStatus: "{terms}個のキーワードを{buckets}期間で表示しています。",
    selectedReviews: "選択中のレビュー",
    prev: "前へ",
    next: "次へ",
    hoursPlayed: "プレイ時間",
    reviewDistributionByPlaytime: "プレイ時間別",
    load: "読み込み",
    portion: "割合",
    language: "言語",
    total: "合計",
    positive: "好評",
    negative: "不評",
    score: "スコア",
    fetchIdleTitle: "準備完了",
    fetchIdleBody: "開始するにはAppIDまたはゲーム名を入力してください。",
    fetchLoadingTitle: "取得中",
    fetchCompleteTitle: "読み込み完了",
    fetchErrorTitle: "失敗",
    proxyRequired:
      "<strong>プロキシが必要です。</strong> アプリが `/api` プロキシと同一オリジンで動作していない場合は `public/config.js` の `apiBaseUrl` を設定してください。",
    loadingAppDetails: "アプリ情報を読み込み中...",
    resolvingGame: "ゲーム名を解決中...",
    resolvedGame: "{name} ({appid}) に一致しました",
    loadedLanguages: "{total}言語中 {loaded}言語を読み込み済み",
    loadedTotalReviews: "合計 {count} 件のレビューを読み込み済み",
    loadingLanguageReviews: "{language} のレビューを読み込み中: {pages} ページ、{reviews} 件",
    noReviews: "この条件ではレビューが見つかりませんでした。",
    requestFailed: "リクエストに失敗しました",
    appNotFound: "アプリが見つかりません",
    gameLookupFailed: "\"{query}\" に一致するSteamアプリは見つかりませんでした。",
    checkAppId: "AppIDを確認して再試行してください。",
    noProxyConfigured: "APIプロキシが設定されていません。",
    reviewBy: "{sentiment}レビュー投稿者",
    date: "日付",
    steamPurchase: "Steamで購入",
    playtime: "プレイ時間",
    minutes: "分",
    gamesOwned: "所持ゲーム数",
    reviewCount: "レビュー数",
    loadedPaging: "{total}件中 {loaded}件を表示",
    positiveCount: "好評 {count}",
    negativeCount: "不評 {count}",
    allLanguage: "すべて",
    communityMembersTracked: "コミュニティメンバー {count} 人を追跡中。",
    steamApp: "Steamアプリ {appid}",
    noShortDescription: "短い説明はありません。",
    usingCache: "利用可能なキャッシュデータを読み込みました。",
    chartPieTooltipReviews: "件のレビュー",
    refreshCache: "キャッシュ更新",
    cacheTimestampEmpty: "まだキャッシュは読み込まれていません。",
    cacheTimestamp: "キャッシュ時刻: {time}",
    timeSpan: "期間",
    timeSpanLifetime: "全期間",
    timeSpanWeek: "1週間",
    timeSpanMonth: "1か月",
    timeSpanYear: "1年",
    timeSpanCustom: "カスタム",
    startDate: "開始",
    endDate: "終了",
    applyRange: "適用",
    invalidDateRange: "終了日は開始日以降である必要があります。",
    reviewStatusPositive: "{count}件のレビュー ({portion}%)",
    reviewStatusNegative: "{count}件のレビュー ({portion}%)",
    reviewStatusScore: "好評率 {score}%",
    keywordSearch: "キーワード検索",
    search: "検索",
    searchPlaceholder: "キーワード",
    searchSummaryLead: "キーワード結果",
    resultSummaryLead: "レビュー結果",
    searchCount: "ヒット数",
    searchReviews: "一致したレビュー",
    searchShown: "表示中",
    summaryPositiveRate: "好評率",
    searchEmpty: "検索するキーワードを入力してください。",
    searchLoading: "レビューを検索中...",
    scanningKeywordMatches: "{reviews}件のレビューから \"{keyword}\" を検索中...",
    searchNoMatch: "一致するレビューは見つかりませんでした。",
    loadingOverlayTitle: "読み込み中",
    loadingOverlayBody: "データを準備しています...",
    loadingCancel: "キャンセル",
    loadingCancelled: "読み込みをキャンセルしました。",
    aiStatusDisconnected: "未接続",
    aiStatusConnected: "接続済み",
    aiStatusConnecting: "接続中",
    aiStatusGenerating: "生成中",
    aiStatusLoading: "読込中",
    downloadCsv: "CSVをダウンロード",
    aiSettings: "AIモデル",
    aiBaseUrl: "Gemini Base URL",
    aiModel: "モデル",
    aiApiKey: "Gemini APIキー",
    aiConnect: "接続",
    aiLoadModels: "Geminiモデルを読み込み中...",
    aiModelsPrompt: "Gemini APIキーを入力してモデルを読み込んでください",
    aiModelsLoaded: "{count}件のGeminiモデルを読み込みました。選択して接続してください。",
    aiModelsFailed: "Geminiモデルを読み込めませんでした。",
    aiConnected: "AIに接続しました。",
    aiDisconnected: "AIは未接続です。",
    aiTesting: "AIモデルをテスト中...",
    aiConnectFailed: "AI接続に失敗しました。",
    aiAnalysisEyebrow: "根拠付きAI分析",
    aiAnalysisTitle: "レビューアナリスト",
    aiAnalysisScope: "現在の全体期間を対象に、構造化したレビュー根拠から回答します。",
    aiAnalysisQuestion: "レビューについて質問する",
    aiAnalysisPlaceholder: "今年の不評レビューで最も多い不満は何ですか？",
    aiTemplatePillar: "このゲームの柱は何？",
    aiTemplateFeature: "最も要望が多い機能は？",
    aiTemplateTrend: "最近のレビューで注目すべき傾向は？",
    aiTemplateSales: "売上を改善するには？",
    aiAnalysisAsk: "AIに質問",
    aiAnalysisNeedConnection: "レビューについて根拠付きで質問するにはAIモデルを接続してください。",
    aiAnalysisNeedApp: "先にゲームを読み込んでからレビューについて質問してください。",
    aiAnalysisEmpty: "質問すると、レビュー統計と代表的な抜粋をもとにAIが回答します。",
    aiAnalysisLoading: "レビューから根拠データを構築中...",
    aiAnalysisNoReviews: "現在の全体期間では利用可能なレビューがありません。",
    aiAnalysisCached: "キャッシュ済み回答",
    aiAnalysisLive: "最新回答",
    aiAnalysisEvidence: "{reviews}件のレビュー、{topics}件のトピック、{snippets}件の代表抜粋を根拠にしています。",
    aiAnalysisFailed: "AI分析に失敗しました。",
    translateReview: "翻訳",
    translatingReview: "翻訳中...",
    translationFailed: "翻訳に失敗しました。",
    sortBy: "並び順",
    sortDate: "新しい順",
    sortPlaytime: "プレイ時間",
    sortLength: "長さ",
    filters: "フィルター",
    savedFilter: "保存状態",
    reviewMode: "表示",
    reviewTabBrowse: "レビュー閲覧",
    reviewTabSaved: "保存済みレビュー",
    sentimentAll: "すべて",
    savedAll: "すべて",
    savedOnly: "保存済み",
    unsavedOnly: "未保存",
    filterPositive: "好評",
    filterNegative: "不評",
    playtimeFilter: "プレイ時間フィルター",
    lengthFilter: "長さフィルター",
    playtimeAll: "すべてのプレイ時間",
    playtimeUnder60: "1時間未満",
    playtime60to300: "1時間 - 5時間",
    playtime300to1200: "5時間 - 20時間",
    playtime1200plus: "20時間以上",
    lengthAll: "すべての長さ",
    lengthShort: "短い",
    lengthMedium: "中",
    lengthLong: "長い",
    downloadSavedCsv: "保存済みCSVをダウンロード",
    unsaveShown: "表示中を保存解除",
    saveReview: "保存",
    savedReview: "保存済み",
    savedReviewsTitle: "保存済みレビュー",
    playtimeCutoffs: "プレイ時間の区切り (分)",
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
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7;
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

const LANGUAGE_FLAGS = {
  arabic: "・・",
  bulgarian: "・・",
  schinese: "・・",
  tchinese: "・・",
  czech: "・・",
  danish: "・・",
  dutch: "・・",
  english: "・・",
  finnish: "・・",
  french: "・・",
  german: "・・",
  greek: "・・",
  hungarian: "・・",
  indonesian: "・・",
  italian: "・・",
  japanese: "・・",
  koreana: "・・",
  norwegian: "・・",
  polish: "・・",
  portuguese: "・・",
  brazilian: "・・",
  romanian: "・・",
  russian: "・・",
  spanish: "・・",
  latam: "月",
  swedish: "・・",
  thai: "・・",
  turkish: "・・",
  ukrainian: "・・",
  vietnamese: "・・",
};

const LANGUAGE_REGION_CODES = {
  arabic: "SA",
  bulgarian: "BG",
  schinese: "CN",
  tchinese: "TW",
  czech: "CZ",
  danish: "DK",
  dutch: "NL",
  english: "US",
  finnish: "FI",
  french: "FR",
  german: "DE",
  greek: "GR",
  hungarian: "HU",
  indonesian: "ID",
  italian: "IT",
  japanese: "JP",
  koreana: "KR",
  norwegian: "NO",
  polish: "PL",
  portuguese: "PT",
  brazilian: "BR",
  romanian: "RO",
  russian: "RU",
  spanish: "ES",
  latam: "MX",
  swedish: "SE",
  thai: "TH",
  turkish: "TR",
  ukrainian: "UA",
  vietnamese: "VN",
};

function regionCodeToFlag(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return "";
  return [...normalized].map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}

const ACTIVE_TOPIC_DEFINITIONS = [];

const TOPIC_UI_TEXT = {
  en: {
    topicClusters: "Topic Clusters",
    topicClustersEyebrow: "Topic clusters",
    topicSource: "Source",
    topicSourceAll: "All Reviews",
    topicSourceSaved: "Saved Reviews",
    chartLine: "Line Plot",
    topicStatusLoading: "Analyzing topic clusters...",
    topicStatusEmpty: "No topic matches found for this selection.",
    topicStatusReady: "{topics} topics found across {reviews} reviews.",
    topicShare: "Mention share",
    topicTrendUp: "Up trend",
    topicTrendDown: "Down trend",
    topicTrendFlat: "Stable",
    topicPriorityHigh: "High priority",
    topicPriorityMedium: "Medium priority",
    topicPriorityLow: "Low priority",
    topicFilter: "Topic Filter",
    topicAll: "All topics",
  },
  ja: {
    topicClusters: "トピッククラスター",
    topicClustersEyebrow: "トピッククラスター",
    topicSource: "対象",
    topicSourceAll: "すべてのレビュー",
    topicSourceSaved: "保存済みレビュー",
    chartLine: "折れ線グラフ",
    topicStatusLoading: "トピッククラスターを分析中...",
    topicStatusEmpty: "この条件ではトピック一致が見つかりませんでした。",
    topicStatusReady: "{reviews}件のレビューから{topics}件のトピックを検出しました。",
    topicShare: "言及割合",
    topicTrendUp: "増加傾向",
    topicTrendDown: "減少傾向",
    topicTrendFlat: "横ばい",
    topicPriorityHigh: "高優先度",
    topicPriorityMedium: "中優先度",
    topicPriorityLow: "低優先度",
    topicFilter: "トピックフィルター",
    topicAll: "すべてのトピック",
  },
};

const state = {
  currentAppId: null,
  currentUiLanguage: "ja",
  showPositiveRateColors: true,
  recentApps: [],
  analysisTab: "wordcloud",
  dataTab: "distribution",
  topicLanguage: "all",
  topicSource: "all",
  topicChartView: "bar",
  topicRows: [],
  topicLastRenderKey: "",
  topicActiveReviews: [],
  topicActiveReviewsKey: "",
  topicTagCache: new Map(),
  topicTagCacheAppId: null,
  topicClusterCache: new Map(),
  topicClusterCacheAppId: null,
  ai: {
    connected: false,
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "",
    apiKey: "",
    models: [],
  },
  aiAssistant: {
    connecting: false,
    generating: false,
    temporaryMode: "",
    temporaryUntil: 0,
    timer: null,
  },
  aiAnalysisMessages: [],
  translationCache: new Map(),
  timelineMode: "reviews",
  timelineKeywords: [],
  timelineMarkers: [],
  timelineMarkersAppId: null,
  chartType: "bar",
  summaryRows: [],
  wordCloudSentiment: "all",
  wordCloudView: "cloud",
  wordCloudTerms: [],
  wordCloudPrefs: { allowed: [], banned: [] },
  timeRange: {
    mode: "lifetime",
    start: "",
    end: "",
  },
  cacheTimestamp: null,
  appDetails: new Map(),
  groupDetails: new Map(),
  reviewCache: new Map(),
  cursorCache: new Map(),
  collectedReviewsCache: new Map(),
  supportedLanguages: [],
  activeSearchRegex: null,
  reviewBaseReviews: [],
  reviewSourceReviews: [],
  reviewDisplayedReviews: [],
  reviewRenderPending: false,
  reviewRenderToken: 0,
  reviewSearchStats: null,
  reviewSort: "date",
  reviewFilters: { sentiment: "all", saved: "all", playtime: "all", length: "all", topic: "all" },
  reviewTab: "browse",
  savedReviews: [],
  playtimeCutoffs: [...DEFAULT_PLAYTIME_CUTOFFS],
  playtimeEditingIndex: null,
  savePersistTimer: null,
  activeBlockingTask: null,
};

let dbPromise = null;

const els = {
  deploymentNote: document.getElementById("deployment-note"),
  fetchStatePanel: document.getElementById("fetch-state-panel"),
  fetchStateTitle: document.getElementById("fetch-state-title"),
  fetchStateText: document.getElementById("fetch-state-text"),
  fetchProgressTrack: document.getElementById("fetch-progress-track"),
  fetchProgressBar: document.getElementById("fetch-progress-bar"),
  reviewStatusBar: document.getElementById("review-status-bar"),
  aiSettingsButton: document.getElementById("ai-settings-button"),
  aiAssistantAnchor: document.getElementById("ai-assistant-anchor"),
  aiAssistantSprite: document.getElementById("ai-assistant-sprite"),
  aiAssistantStatus: document.getElementById("ai-assistant-status"),
  aiSettingsPanel: document.getElementById("ai-settings-panel"),
  aiBaseUrlInput: document.getElementById("ai-base-url-input"),
  aiModelSelect: document.getElementById("ai-model-select"),
  aiApiKeyInput: document.getElementById("ai-api-key-input"),
  aiConnectButton: document.getElementById("ai-connect-button"),
  aiConnectionStatus: document.getElementById("ai-connection-status"),
  fetchControlsRow: document.getElementById("fetch-controls-row"),
  cacheTimestamp: document.getElementById("cache-timestamp"),
  refreshCacheButton: document.getElementById("refresh-cache-button"),
  downloadCsvButton: document.getElementById("download-csv-button"),
  loadingOverlay: document.getElementById("loading-overlay"),
  loadingTitle: document.getElementById("loading-title"),
  loadingMessage: document.getElementById("loading-message"),
  loadingCancelButton: document.getElementById("loading-cancel-button"),
  timeRangeToggle: document.getElementById("time-range-toggle"),
  customTimeRange: document.getElementById("custom-time-range"),
  timeRangeStart: document.getElementById("time-range-start"),
  timeRangeEnd: document.getElementById("time-range-end"),
  applyCustomRangeButton: document.getElementById("apply-custom-range-button"),
  savedReviewsDownloadButton: document.getElementById("saved-reviews-download-button"),
  savedReviewsClearButton: document.getElementById("saved-reviews-clear-button"),
  fetchForm: document.getElementById("fetch-form"),
  appidInput: document.getElementById("appid-input"),
  recentAppsPanel: document.getElementById("recent-apps-panel"),
  recentAppsList: document.getElementById("recent-apps-list"),
  fetchButton: document.getElementById("fetch-button"),
  uiLanguageToggle: document.getElementById("ui-language-toggle"),
  positiveRateColorToggle: document.getElementById("positive-rate-color-toggle"),
  workspaceSection: document.getElementById("workspace-section"),
  reviewsSection: document.getElementById("reviews-section"),
  analysisTabToggle: document.getElementById("analysis-tab-toggle"),
  dataTabToggle: document.getElementById("data-tab-toggle"),
  analysisPanelWordcloud: document.getElementById("analysis-panel-wordcloud"),
  analysisPanelReviews: document.getElementById("analysis-panel-reviews"),
  analysisPanelTimeline: document.getElementById("analysis-panel-timeline"),
  analysisPanelTopics: document.getElementById("analysis-panel-topics"),
  dataPanelDistribution: document.getElementById("data-panel-distribution"),
  dataPanelPlaytime: document.getElementById("data-panel-playtime"),
  statusText: document.getElementById("status-text"),
  wordLanguageSelection: document.getElementById("word-language-selection"),
  wordSentimentToggle: document.getElementById("word-sentiment-toggle"),
  wordViewToggle: document.getElementById("word-view-toggle"),
  generateWordCloudButton: document.getElementById("generate-word-cloud-button"),
  wordPreferenceInput: document.getElementById("word-preference-input"),
  wordAllowButton: document.getElementById("word-allow-button"),
  wordBanButton: document.getElementById("word-ban-button"),
  wordPreferenceList: document.getElementById("word-preference-list"),
  wordCloudStatus: document.getElementById("word-cloud-status"),
  wordCloudContainer: document.getElementById("word-cloud-container"),
  wordCloudTopList: document.getElementById("word-cloud-top-list"),
  topicLanguageSelection: document.getElementById("topic-language-selection"),
  topicSourceToggle: document.getElementById("topic-source-toggle"),
  topicChartViewToggle: document.getElementById("topic-chart-view-toggle"),
  topicStatus: document.getElementById("topic-status"),
  topicChart: document.getElementById("topic-chart"),
  topicDetails: document.getElementById("topic-details"),
  chartContainer: document.getElementById("chart-container"),
  chartTypeToggle: document.getElementById("chart-type-toggle"),
  reviewsList: document.getElementById("reviews-list"),
  reviewTitle: document.getElementById("review-title"),
  timelineStatus: document.getElementById("timeline-status"),
  timelineModeToggle: document.getElementById("timeline-mode-toggle"),
  timelineKeywordControls: document.getElementById("timeline-keyword-controls"),
  timelineKeywordInput: document.getElementById("timeline-keyword-input"),
  timelineKeywordAddButton: document.getElementById("timeline-keyword-add-button"),
  timelineKeywordButton: document.getElementById("timeline-keyword-button"),
  timelineKeywordList: document.getElementById("timeline-keyword-list"),
  timelineChart: document.getElementById("timeline-chart"),
  timelineMarkers: document.getElementById("timeline-markers"),
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
  reviewTopicFilter: document.getElementById("review-topic-filter"),
  reviewTabToggle: document.getElementById("review-tab-toggle"),
  aiAnalysisPanel: document.getElementById("ai-analysis-panel"),
  aiAnalysisScope: document.getElementById("ai-analysis-scope"),
  aiAnalysisMessages: document.getElementById("ai-analysis-messages"),
  aiAnalysisTemplates: document.getElementById("ai-analysis-templates"),
  aiAnalysisForm: document.getElementById("ai-analysis-form"),
  aiAnalysisInput: document.getElementById("ai-analysis-input"),
  aiAnalysisSendButton: document.getElementById("ai-analysis-send-button"),
};

function createAbortError() {
  try {
    return new DOMException(t("loadingCancelled"), "AbortError");
  } catch (error) {
    const abortError = new Error(t("loadingCancelled"));
    abortError.name = "AbortError";
    return abortError;
  }
}

function isAbortError(error) {
  return error?.name === "AbortError";
}

function getActiveTaskSignal() {
  return state.activeBlockingTask?.controller?.signal;
}

function throwIfTaskCancelled() {
  if (getActiveTaskSignal()?.aborted) throw createAbortError();
}

async function yieldToUi() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  throwIfTaskCancelled();
}

function updateLoadingOverlay(title, message) {
  if (els.loadingTitle) els.loadingTitle.textContent = title || t("loadingOverlayTitle");
  if (els.loadingMessage) els.loadingMessage.textContent = message || t("loadingOverlayBody");
  updateAiUi();
}

function showLoadingOverlay(title, message) {
  updateLoadingOverlay(title, message);
  updateAiUi();
}

function hideLoadingOverlay() {
  updateAiUi();
}

function handleTaskCancelled() {
  const message = t("loadingCancelled");
  els.statusText.textContent = message;
  setFetchState("idle", message, 0);
}

async function runBlockingTask(options, task) {
  if (state.activeBlockingTask) return task();
  const operation = {
    controller: new AbortController(),
  };
  state.activeBlockingTask = operation;
  showLoadingOverlay(options?.title || t("loadingOverlayTitle"), options?.message || t("loadingOverlayBody"));
  try {
    return await task();
  } catch (error) {
    if (isAbortError(error)) {
      handleTaskCancelled();
      return null;
    }
    throw error;
  } finally {
    if (state.activeBlockingTask === operation) {
      state.activeBlockingTask = null;
      hideLoadingOverlay();
    }
  }
}

function cancelActiveTask() {
  state.activeBlockingTask?.controller?.abort(createAbortError());
}

function runDataTask(message, task) {
  return runBlockingTask(
    {
      title: t("fetchLoadingTitle"),
      message: message || t("loadingOverlayBody"),
    },
    task
  );
}

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
const DAY_MS = 1000 * 60 * 60 * 24;
const IS_WINDOWS = typeof navigator !== "undefined" && /Windows/i.test(navigator.userAgent || "");
const STEAM_NEGATIVE = { r: 196, g: 69, b: 76 };
const STEAM_NEUTRAL = { r: 146, g: 118, b: 89 };
const STEAM_POSITIVE = { r: 138, g: 195, b: 74 };
const AI_ANALYSIS_SNIPPET_LIMIT = 20;
const AI_ANALYSIS_CACHE_TTL = 1000 * 60 * 60 * 24;
const AI_QUESTION_STOPWORDS = new Set([
  "the","and","for","with","that","this","from","what","when","where","which","about","have","has","had","were","was",
  "into","than","then","them","they","their","there","does","did","how","why","can","could","would","should","will",
  "are","is","its","any","most","more","less","very","much","many","show","tell","give","make","game","reviews",
  "review","players","player","using","within","after","before","during","across","current","these","those","your",
]);
const AI_REQUEST_PATTERNS = [
  /\b(wish|hope|want|wanted|needs?|should add|please add|it would be nice|would like)\b/i,
  /(欲しい|ほしい|あれば|追加して|追加してほしい|必要|改善してほしい)/u,
  /(希望|想要|需要|应该加|希望加入|最好有)/u,
];
const AI_RETENTION_PATTERNS = [
  /\b(despite|even with|still|kept playing|hooked|addictive|hard to stop|came back)\b/i,
  /(それでも|それでもなお|なのに|でも続け|やめられ|ハマ)/u,
  /(虽然|但是还|仍然|停不下来|上头|继续玩)/u,
];
const AI_PILLAR_PATTERNS = [
  /\b(core|pillar|main draw|best part|standout|defining|what keeps me playing|the reason I play)\b/i,
  /(核|核心|醍醐味|魅力|一番|最大の魅力|決め手)/u,
];

function mixColor(left, right, amount) {
  const t = Math.max(0, Math.min(1, amount));
  const r = Math.round(left.r + (right.r - left.r) * t);
  const g = Math.round(left.g + (right.g - left.g) * t);
  const b = Math.round(left.b + (right.b - left.b) * t);
  return `rgb(${r} ${g} ${b})`;
}

function getPositiveRateColor(positiveRate, minRate, maxRate) {
  const sentimentScale = maxRate === minRate ? 0.5 : (positiveRate - minRate) / (maxRate - minRate);
  return sentimentScale >= 0.5
    ? mixColor(STEAM_NEUTRAL, STEAM_POSITIVE, (sentimentScale - 0.5) / 0.5)
    : mixColor(STEAM_NEGATIVE, STEAM_NEUTRAL, sentimentScale / 0.5);
}

function getAbsolutePositiveRateColor(positiveRate) {
  return getPositiveRateColor(Number(positiveRate) || 0, 0, 100);
}

function renderPositiveRateValue(value, decimals = 1) {
  const numeric = Number(value) || 0;
  const text = `${numeric.toFixed(decimals)}%`;
  if (!state.showPositiveRateColors) return text;
  return `<span class="positive-rate-value" style="color:${getAbsolutePositiveRateColor(numeric)}">${text}</span>`;
}

function topicText(key) {
  return TOPIC_UI_TEXT[state.currentUiLanguage]?.[key] ?? TOPIC_UI_TEXT.en[key] ?? key;
}

function getTopicCatalog() {
  return [
    {
      id: "performancebug",
      labels: { en: "Performance / Bugs", ja: "パフォーマンス / バグ" },
      keywords: {
        en: [
          "performance","fps","frame drop","frame drops","framerate","frame rate","stutter","stuttering","lag","optimization","optimize","slowdown",
          "crash","crashes","bug","bugs","glitch","glitches","freeze","freezes","broken","softlock","unplayable",
        ],
        ja: ["fps","フレーム","フレームレート","カクつき","ラグ","最適化","パフォーマンス","クラッシュ","バグ","フリーズ","落ちる"],
        zh: ["性能","帧数","掉帧","卡顿","优化","延迟","崩溃","bug","闪退","卡死","无法游玩"],
      },
      severity: ["crash","freeze","stutter","broken","softlock","闪退","卡顿","クラッシュ","フリーズ","バグ"],
      color: "#66c0f4",
    },
    {
      id: "gameplay",
      labels: { en: "Combat / Gameplay", ja: "戦闘 / ゲームプレイ" },
      keywords: {
        en: ["combat","gameplay","boss","weapon","weapons","build","enemy","enemies","mechanic","mechanics"],
        ja: ["戦闘","ゲームプレイ","ボス","武器","ビルド","敵","ギミック"],
        zh: ["战斗","玩法","boss","武器","build","敌人","机制"],
      },
      severity: ["broken mechanic","unfair","糟糕平衡"],
      color: "#79e39f",
    },
    {
      id: "uiux",
      labels: { en: "UI / UX", ja: "UI / UX" },
      keywords: {
        en: [
          "ui","ux","menu","hud","interface","inventory","map","tutorial",
          "translation","localization","localized","typo","english text","machine translation","wrong translation",
        ],
        ja: [
          "ui","メニュー","hud","インターフェース","インベントリ","マップ","チュートリアル",
          "翻訳","ローカライズ","誤字","英語表記","機械翻訳","翻訳ミス",
        ],
        zh: [
          "ui","菜单","界面","hud","背包","地图","教程",
          "翻译","本地化","错字","文本翻译","机翻","翻译问题",
        ],
      },
      severity: ["unusable","confusing","machine translation","wrong translation","难用","翻訳ミス"],
      color: "#f2c14e",
    },
    {
      id: "story",
      labels: { en: "Story / Characters", ja: "ストーリー / キャラ" },
      keywords: {
        en: ["story","plot","character","characters","writing","ending","dialogue"],
        ja: ["ストーリー","シナリオ","キャラ","キャラクター","文章","エンディング"],
        zh: ["剧情","故事","角色","人物","文笔","结局"],
      },
      severity: ["bad writing","awful","剧情差"],
      color: "#a98bff",
    },
    {
      id: "audio",
      labels: { en: "Audio / Music", ja: "音 / 音楽" },
      keywords: {
        en: ["music","soundtrack","audio","sound","voice","voices"],
        ja: ["音楽","サウンドトラック","音","ボイス","音声"],
        zh: ["音乐","配乐","音频","声音","语音"],
      },
      severity: ["audio bug","no sound","没声音"],
      color: "#f39c6b",
    },
    {
      id: "pricevalue",
      labels: { en: "Price / Value", ja: "価格 / コスパ" },
      keywords: {
        en: [
          "price","priced","pricing","value","worth","worth it","worthwhile","too expensive","overpriced","cheap","sale","discount","cost",
          "good value","great value","fair price","full price","price tag","money's worth",
        ],
        ja: [
          "価格","値段","コスパ","高い","高すぎる","安い","お得","割引","セール","フルプライス","価値","値段相応",
        ],
        zh: [
          "价格","价钱","性价比","太贵","便宜","超值","值得","折扣","特价","原价","物有所值",
        ],
      },
      severity: ["overpriced","too expensive","高すぎる","太贵"],
      color: "#8fd4ff",
    },
  ];
}

function getTopicDefinition(id) {
  return getTopicCatalog().find((entry) => entry.id === id) || null;
}

function getTopicLabel(id) {
  const def = getTopicDefinition(id);
  if (!def) return id;
  return def.labels?.[state.currentUiLanguage] || def.labels?.en || id;
}

function getTopicRowLabel(row) {
  return getTopicLabel(row?.id) || row?.label || "";
}

function containsJapanese(text) {
  return /[\u3040-\u30ff\u3400-\u9fff]/u.test(String(text || ""));
}

function containsKana(text) {
  return /[\u3040-\u30ff]/u.test(String(text || ""));
}

function containsHan(text) {
  return /[\u3400-\u9fff]/u.test(String(text || ""));
}

function containsChinese(text) {
  const value = String(text || "");
  return containsHan(value) && !containsKana(value);
}

function createSearchRegex(keyword, global = true) {
  const escaped = String(keyword || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const flags = global ? "gi" : "i";
  return containsJapanese(keyword) || containsChinese(keyword)
    ? new RegExp(escaped, flags)
    : new RegExp(`\\b${escaped}\\b`, flags);
}

function formatDateInputValue(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function getActiveTimeRangeBounds() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (state.timeRange.mode === "week") {
    const start = new Date(now.getTime() - 7 * DAY_MS);
    return { startMs: start.getTime(), endMs: end.getTime() };
  }

  if (state.timeRange.mode === "month") {
    const start = new Date(now.getTime() - 30 * DAY_MS);
    return { startMs: start.getTime(), endMs: end.getTime() };
  }

  if (state.timeRange.mode === "year") {
    const start = new Date(now.getTime() - 365 * DAY_MS);
    return { startMs: start.getTime(), endMs: end.getTime() };
  }

  if (state.timeRange.mode === "custom" && state.timeRange.start && state.timeRange.end) {
    const start = new Date(`${state.timeRange.start}T00:00:00`);
    const customEnd = new Date(`${state.timeRange.end}T23:59:59.999`);
    return { startMs: start.getTime(), endMs: customEnd.getTime() };
  }

  return { startMs: Number.NEGATIVE_INFINITY, endMs: Number.POSITIVE_INFINITY };
}

function getDisplayTimeRangeDates() {
  const now = new Date();
  const today = formatDateInputValue(now);

  if (state.timeRange.mode === "week") {
    return {
      start: formatDateInputValue(new Date(now.getTime() - 7 * DAY_MS)),
      end: today,
    };
  }

  if (state.timeRange.mode === "month") {
    return {
      start: formatDateInputValue(new Date(now.getTime() - 30 * DAY_MS)),
      end: today,
    };
  }

  if (state.timeRange.mode === "year") {
    return {
      start: formatDateInputValue(new Date(now.getTime() - 365 * DAY_MS)),
      end: today,
    };
  }

  if (state.timeRange.mode === "custom") {
    return {
      start: state.timeRange.start || today,
      end: state.timeRange.end || today,
    };
  }

  return {
    start: "",
    end: today,
  };
}

function filterReviewsByActiveTimeRange(reviews) {
  const { startMs, endMs } = getActiveTimeRangeBounds();
  return reviews.filter((review) => {
    const createdAt = Number(review.timestamp_created || 0) * 1000;
    return createdAt >= startMs && createdAt <= endMs;
  });
}

function getActiveRangeFetchFloor() {
  const { startMs } = getActiveTimeRangeBounds();
  return Number.isFinite(startMs) ? startMs : null;
}

function getReviewScoreDesc(totalReviews, totalPositive) {
  if (!totalReviews) return "No rating";
  const ratio = totalPositive / totalReviews;
  if (ratio >= 0.95) return "Overwhelmingly Positive";
  if (ratio >= 0.8) return "Very Positive";
  if (ratio >= 0.7) return "Positive";
  if (ratio >= 0.4) return "Mixed";
  if (ratio >= 0.2) return "Negative";
  return "Very Negative";
}

function buildSummaryRowsFromReviews(reviews) {
  const byLanguage = new Map();
  LANGUAGES.forEach(([name, code]) => {
    byLanguage.set(code, {
      languageName: name,
      languageCode: code,
      total_reviews: 0,
      total_positive: 0,
      total_negative: 0,
      review_score_desc: "No rating",
    });
  });

  reviews.forEach((review) => {
    const entry = byLanguage.get(review.language);
    if (!entry) return;
    entry.total_reviews += 1;
    if (review.voted_up) entry.total_positive += 1;
    else entry.total_negative += 1;
  });

  return [...byLanguage.values()]
    .map((row) => ({
      ...row,
      review_score_desc: getReviewScoreDesc(row.total_reviews, row.total_positive),
    }))
    .filter((row) => row.total_reviews > 0)
    .sort((left, right) => right.total_reviews - left.total_reviews);
}

function buildTimelineBuckets(reviews) {
  const activeBounds = getActiveTimeRangeBounds();
  const reviewTimes = reviews.map((review) => review.timestamp_created * 1000).sort((left, right) => left - right);
  const rangeStartMs = Number.isFinite(activeBounds.startMs) ? activeBounds.startMs : reviewTimes[0];
  const rangeEndMs = Number.isFinite(activeBounds.endMs) ? activeBounds.endMs : reviewTimes[reviewTimes.length - 1];
  const spanMs = Math.max(rangeEndMs - rangeStartMs, DAY_MS);
  const maxBars = 30;
  const rawBucketMs = Math.ceil(spanMs / maxBars);
  const wholeDays = Math.max(1, Math.ceil(rawBucketMs / DAY_MS));
  const bucketDays = wholeDays <= 7 ? wholeDays : wholeDays <= 14 ? 7 : wholeDays <= 31 ? 14 : wholeDays <= 62 ? 30 : wholeDays <= 124 ? 60 : 90;
  const bucketMs = bucketDays * DAY_MS;
  const bucketCount = Math.min(maxBars, Math.max(1, Math.ceil(spanMs / bucketMs)));
  const buckets = Array.from({ length: bucketCount }, (_, index) => {
    const startMs = rangeStartMs + index * bucketMs;
    const endMs = Math.min(rangeEndMs, startMs + bucketMs - 1);
    const start = new Date(startMs);
    const end = new Date(endMs);
    const shortLabel =
      bucketDays <= 1
        ? start.toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
            month: "short",
            day: "numeric",
          })
        : start.toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
            year: "numeric",
            month: "short",
          });
    return {
      key: `${startMs}-${endMs}`,
      startMs,
      endMs,
      label: shortLabel,
      tooltipDate:
        bucketDays <= 1
          ? start.toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : `${start.toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} - ${end.toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}`,
      positive: 0,
      negative: 0,
    };
  });

  reviews.forEach((review) => {
    const createdMs = review.timestamp_created * 1000;
    const index = Math.min(bucketCount - 1, Math.max(0, Math.floor((createdMs - rangeStartMs) / bucketMs)));
    const bucket = buckets[index];
    if (!bucket) return;
    if (review.voted_up) bucket.positive += 1;
    else bucket.negative += 1;
  });

  return { buckets, bucketDays };
}

function buildTimelineAxisMarkup(maxValue) {
  const midValue = maxValue === 1 ? 1 : Math.max(1, Math.round(maxValue / 2));
  return {
    axisMarkup: `
      <div class="timeline-y-tick timeline-y-max">${fmt(maxValue)}</div>
      <div class="timeline-y-tick timeline-y-mid">${fmt(midValue)}</div>
      <div class="timeline-y-tick zero">0</div>
      <div class="timeline-y-tick timeline-y-mid">${fmt(midValue)}</div>
      <div class="timeline-y-tick timeline-y-min">${fmt(maxValue)}</div>
    `,
    gridMarkup: `
      <div class="timeline-grid" aria-hidden="true">
        <div class="timeline-grid-line timeline-grid-top"></div>
        <div class="timeline-grid-line timeline-grid-mid-pos"></div>
        <div class="timeline-grid-line zero"></div>
        <div class="timeline-grid-line timeline-grid-mid-neg"></div>
        <div class="timeline-grid-line timeline-grid-bottom"></div>
      </div>
    `,
  };
}

function getTimelineKeywordTerms() {
  return state.timelineKeywords.slice(0, 6);
}

function normalizeTimelineKeyword(term) {
  return String(term || "").trim();
}

function parseTimelineKeywordInput(value) {
  return [...new Set(
    String(value || "")
      .split(/[,\n]+/)
      .map((term) => normalizeTimelineKeyword(term))
      .filter(Boolean)
  )];
}

function renderTimelineKeywordList() {
  const items = getTimelineKeywordTerms();
  els.timelineKeywordList.classList.toggle("hidden", !items.length || state.timelineMode !== "keywords");
  els.timelineKeywordList.innerHTML = items
    .map(
      (term) =>
        `<span class="word-preference-chip allowed">${esc(term)} <button type="button" aria-label="Remove keyword" data-timeline-keyword-remove="${esc(term)}">×</button></span>`
    )
    .join("");
}

async function addTimelineKeyword() {
  const terms = parseTimelineKeywordInput(els.timelineKeywordInput.value);
  if (!terms.length) return;
  state.timelineKeywords = [...new Set([...state.timelineKeywords, ...terms])].slice(0, 6);
  els.timelineKeywordInput.value = "";
  state.timelineMode = "keywords";
  await persistTimelineKeywords();
  updateTimelineUi();
  await rerenderTimelineFromCache();
}

async function removeTimelineKeyword(term) {
  state.timelineKeywords = state.timelineKeywords.filter((item) => item !== term);
  await persistTimelineKeywords();
  updateTimelineUi();
  await rerenderTimelineFromCache();
}

function buildKeywordRegex(keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i");
}

function getTimelineKeywordSeries(reviews, buckets, keywords) {
  const series = keywords.map((keyword) => ({
    keyword,
    regex: buildKeywordRegex(keyword),
    points: buckets.map((bucket) => ({
      key: bucket.key,
      startMs: bucket.startMs,
      endMs: bucket.endMs,
      label: bucket.label,
      tooltipDate: bucket.tooltipDate,
      total: 0,
      positive: 0,
      negative: 0,
      positiveRate: 0,
    })),
  }));

  reviews.forEach((review) => {
    const createdMs = review.timestamp_created * 1000;
    const bucketIndex = buckets.findIndex((bucket) => createdMs >= bucket.startMs && createdMs <= bucket.endMs);
    if (bucketIndex === -1) return;
    const reviewText = String(review.review || "");

    series.forEach((entry) => {
      if (!entry.regex.test(reviewText)) return;
      const point = entry.points[bucketIndex];
      point.total += 1;
      if (review.voted_up) point.positive += 1;
      else point.negative += 1;
      point.positiveRate = point.total ? (point.positive / point.total) * 100 : 0;
    });
  });

  return series;
}

function ensureSharedTooltip() {
  let tooltip = document.querySelector(".word-cloud-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "word-cloud-tooltip";
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

function showTimelineTooltip(event, bucket) {
  const tooltip = ensureSharedTooltip();
  const total = bucket.positive + bucket.negative;
  const positiveRate = total ? ((bucket.positive / total) * 100).toFixed(1) : "0.0";
  tooltip.innerHTML = `<strong>${esc(bucket.tooltipDate)}</strong>${
    bucket.keyword ? `<div>${esc(t("timelineKeywords"))}: ${esc(bucket.keyword)}</div>` : ""
  }<div>${fmt(total)} ${esc(t("reviewCount"))}</div><div>${t("positive")}: ${fmt(bucket.positive)}</div><div>${t(
    "negative"
  )}: ${fmt(bucket.negative)}</div><div>${t("summaryPositiveRate")}: ${renderPositiveRateValue(positiveRate)}</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function formatTimelineMarkerDate(dateMs) {
  return new Date(dateMs).toLocaleDateString(state.currentUiLanguage === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function showTimelineMarkerTooltip(event, marker) {
  const tooltip = ensureSharedTooltip();
  tooltip.innerHTML = `<strong>${esc(marker.label || (state.currentUiLanguage === "ja" ? "マーカー" : "Marker"))}</strong><div>${esc(
    formatTimelineMarkerDate(marker.dateMs)
  )}</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function getTimelineMarkersForRange() {
  const { startMs, endMs } = getActiveTimeRangeBounds();
  return state.timelineMarkers.filter((marker) => marker.dateMs >= startMs && marker.dateMs <= endMs);
}

function renderTimelineMarkerLines(plot, rangeStartMs, rangeEndMs, className = "timeline-marker-line") {
  const markers = getTimelineMarkersForRange();
  if (!markers.length || !Number.isFinite(rangeStartMs) || !Number.isFinite(rangeEndMs) || rangeEndMs <= rangeStartMs) return;

  markers.forEach((marker) => {
    const ratio = (marker.dateMs - rangeStartMs) / (rangeEndMs - rangeStartMs);
    const clamped = Math.max(0, Math.min(1, ratio));
    const line = document.createElement("div");
    line.className = className;
    line.style.left = `${(clamped * 100).toFixed(4)}%`;
    line.dataset.markerId = marker.id;
    line.dataset.rangeStartMs = String(rangeStartMs);
    line.dataset.rangeEndMs = String(rangeEndMs);
    line.addEventListener("mousemove", (event) => showTimelineMarkerTooltip(event, marker));
    line.addEventListener("mouseleave", hideWordCloudTooltip);
    line.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const bounds = plot.getBoundingClientRect();
      const markerLine = event.currentTarget;
      const onMove = (moveEvent) => {
        const ratioNow = Math.max(0, Math.min(1, (moveEvent.clientX - bounds.left) / Math.max(1, bounds.width)));
        markerLine.style.left = `${(ratioNow * 100).toFixed(4)}%`;
        const dateMs = Math.round(rangeStartMs + ratioNow * (rangeEndMs - rangeStartMs));
        showTimelineMarkerTooltip(moveEvent, { ...marker, dateMs });
      };
      const onUp = (upEvent) => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        const ratioNow = Math.max(0, Math.min(1, (upEvent.clientX - bounds.left) / Math.max(1, bounds.width)));
        const dateMs = Math.round(rangeStartMs + ratioNow * (rangeEndMs - rangeStartMs));
        hideWordCloudTooltip();
        void updateTimelineMarker(marker.id, { dateMs });
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    });
    plot.appendChild(line);
  });
}

function renderTimelineMarkersList() {
  if (!els.timelineMarkers) return;
  const show = state.analysisTab === "timeline" && state.timelineMode === "reviews";
  els.timelineMarkers.classList.toggle("hidden", !show);
  if (!show) return;
  const items = [...state.timelineMarkers].sort((a, b) => a.dateMs - b.dateMs);
  if (!items.length) {
    els.timelineMarkers.innerHTML = `<div class="status-text">${esc(
      state.currentUiLanguage === "ja"
        ? "まだマークした日付はありません。レビュー数グラフのバーをクリックして追加できます。"
        : "No timeline markers yet. Click a review-count bar to add one."
    )}</div>`;
    return;
  }
  const title = state.currentUiLanguage === "ja" ? "マークした日付" : "Marked Dates";
  const removeText = state.currentUiLanguage === "ja" ? "削除" : "Remove";
  els.timelineMarkers.innerHTML = `<div class="timeline-markers-title">${esc(title)}</div>${items
    .map(
      (marker) =>
        `<div class="timeline-marker-item"><label class="timeline-marker-fields"><input type="text" data-timeline-marker-name="${esc(
          marker.id
        )}" value="${esc(marker.label)}" /><input type="date" data-timeline-marker-date="${esc(marker.id)}" value="${esc(
          formatDateInputValue(new Date(marker.dateMs))
        )}" /></label><button class="timeline-marker-remove-button" type="button" data-remove-timeline-marker="${esc(marker.id)}">${esc(removeText)}</button></div>`
    )
    .join("")}`;
}

async function addTimelineMarker(bucket) {
  if (!state.currentAppId) return;
  await loadTimelineMarkersFromCache(state.currentAppId);
  const dateMs = bucket.startMs;
  const id = String(dateMs);
  if (state.timelineMarkers.some((marker) => marker.id === id)) {
    renderTimelineMarkersList();
    return;
  }
  const date = new Date(dateMs);
  const label = formatTimelineMarkerDate(dateMs);
  state.timelineMarkers.push({ id, dateMs, label });
  state.timelineMarkers.sort((a, b) => a.dateMs - b.dateMs);
  await persistTimelineMarkers();
  renderTimelineMarkersList();
  await rerenderTimelineFromCache();
}

async function removeTimelineMarker(markerId) {
  state.timelineMarkers = state.timelineMarkers.filter((marker) => marker.id !== markerId);
  await persistTimelineMarkers();
  renderTimelineMarkersList();
  await rerenderTimelineFromCache();
}

async function updateTimelineMarker(markerId, updates) {
  let changed = false;
  state.timelineMarkers = state.timelineMarkers.map((marker) => {
    if (marker.id !== markerId) return marker;
    changed = true;
    const next = { ...marker, ...updates };
    if (typeof updates.dateMs === "number" && Number.isFinite(updates.dateMs)) {
      const nextId = String(updates.dateMs);
      next.id = nextId;
      if (!updates.label || updates.label === marker.label) {
        next.label = marker.label;
      }
    }
    return next;
  });
  if (!changed) return;
  state.timelineMarkers.sort((a, b) => a.dateMs - b.dateMs);
  await persistTimelineMarkers();
  renderTimelineMarkersList();
  await rerenderTimelineFromCache();
}

async function activateTimelineBucket(bucket, keyword = "") {
  hideWordCloudTooltip();
  state.timeRange.mode = "custom";
  state.timeRange.start = formatDateInputValue(new Date(bucket.startMs));
  state.timeRange.end = formatDateInputValue(new Date(bucket.endMs));
  state.reviewTab = "browse";
  state.analysisTab = "reviews";
  updateReviewTabUi();
  updateTimeRangeUi();
  updateWorkspaceTabs();
  await refreshScopedData();
  if (keyword) {
    els.reviewSearchInput.value = keyword;
    await runReviewSearch();
  }
  els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderTimelineReviewCountChart(reviews, buckets) {
  const maxValue = Math.max(...buckets.map((bucket) => Math.max(bucket.positive, bucket.negative)), 1);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 10));
  const { axisMarkup, gridMarkup } = buildTimelineAxisMarkup(maxValue);
  const shell = document.createElement("div");
  shell.className = "timeline-shell";
  const axis = document.createElement("div");
  axis.className = "timeline-y-axis";
  axis.innerHTML = axisMarkup;
  const plot = document.createElement("div");
  plot.className = "timeline-plot";
  plot.innerHTML = gridMarkup;
  renderTimelineMarkerLines(plot, buckets[0]?.startMs, buckets[buckets.length - 1]?.endMs);
  const chart = document.createElement("div");
  chart.className = "timeline-bars";

  buckets.forEach((bucket, index) => {
    const column = document.createElement("div");
    column.className = "timeline-column";
    const positiveHeight = (bucket.positive / maxValue) * 100;
    const negativeHeight = (bucket.negative / maxValue) * 100;
    column.innerHTML = `<div class="timeline-bar-wrap positive-wrap"><div class="timeline-bar positive" style="height:${positiveHeight}%"></div></div><div class="timeline-axis"></div><div class="timeline-bar-wrap negative-wrap"><div class="timeline-bar negative" style="height:${negativeHeight}%"></div></div><div class="timeline-label">${
      index % labelStep === 0 || index === buckets.length - 1 ? esc(bucket.label) : "&nbsp;"
    }</div>`;
    column.addEventListener("mousemove", (event) => showTimelineTooltip(event, bucket));
    column.addEventListener("mouseleave", hideWordCloudTooltip);
    column.addEventListener("click", () => {
      void addTimelineMarker(bucket);
    });
    chart.appendChild(column);
  });

  plot.appendChild(chart);
  shell.appendChild(axis);
  shell.appendChild(plot);
  els.timelineChart.appendChild(shell);
  renderTimelineMarkersList();
}

function renderTimelineKeywordChart(reviews, buckets) {
  const keywords = getTimelineKeywordTerms();
  if (!keywords.length) {
    els.timelineStatus.textContent = t("timelineKeywordEmpty");
    els.timelineChart.innerHTML = `<div class="status-text">${esc(t("timelineKeywordEmpty"))}</div>`;
    return;
  }

  const series = getTimelineKeywordSeries(reviews, buckets, keywords);
  const points = series.flatMap((entry) => entry.points.map((point) => ({ ...point, keyword: entry.keyword })));
  const matchingPoints = points.filter((point) => point.total > 0);
  if (!matchingPoints.length) {
    els.timelineStatus.textContent = t("timelineKeywordNoMatch");
    els.timelineChart.innerHTML = `<div class="status-text">${esc(t("timelineKeywordNoMatch"))}</div>`;
    return;
  }

  const maxValue = Math.max(...matchingPoints.map((point) => point.total), 1);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 10));
  const minRate = Math.min(...matchingPoints.map((point) => point.positiveRate));
  const maxRate = Math.max(...matchingPoints.map((point) => point.positiveRate));
  const plotWidth = 960;
  const plotHeight = 320;
  const leftPadding = 12;
  const rightPadding = 12;
  const topPadding = 12;
  const bottomPadding = 42;
  const usableWidth = plotWidth - leftPadding - rightPadding;
  const usableHeight = plotHeight - topPadding - bottomPadding;
  const xStep = buckets.length === 1 ? 0 : usableWidth / (buckets.length - 1);
  const svgNs = "http://www.w3.org/2000/svg";
  const linePalette = ["#66c0f4", "#f39c6b", "#a98bff", "#7ad9a7", "#f26d8f", "#ffd166"];
  const shell = document.createElement("div");
  shell.className = "timeline-shell timeline-shell-keywords";
  const axis = document.createElement("div");
  axis.className = "timeline-y-axis timeline-y-axis-keywords";
  axis.innerHTML = `
    <div class="timeline-y-tick timeline-keyword-y-top">${fmt(maxValue)}</div>
    <div class="timeline-y-tick timeline-keyword-y-mid">${fmt(Math.max(1, Math.round(maxValue / 2)))}</div>
    <div class="timeline-y-tick timeline-keyword-y-bottom">0</div>
  `;
  const plot = document.createElement("div");
  plot.className = "timeline-plot timeline-plot-keywords";
  plot.innerHTML = `
    <div class="timeline-grid timeline-grid-keywords" aria-hidden="true">
      <div class="timeline-grid-line timeline-keyword-grid-top"></div>
      <div class="timeline-grid-line timeline-keyword-grid-mid"></div>
      <div class="timeline-grid-line zero timeline-keyword-grid-bottom"></div>
    </div>
  `;
  renderTimelineMarkerLines(plot, buckets[0]?.startMs, buckets[buckets.length - 1]?.endMs);
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${plotWidth} ${plotHeight}`);
  svg.setAttribute("class", "timeline-line-svg");

  const summaryList = document.createElement("div");
  summaryList.className = "timeline-keyword-summary";

  series.forEach((entry, seriesIndex) => {
    const visiblePoints = entry.points
      .map((point, pointIndex) => {
        const x = leftPadding + xStep * pointIndex;
        const y = topPadding + usableHeight - (point.total / maxValue) * usableHeight;
        return { ...point, x, y, pointIndex };
      })
      .filter((point) => point.total > 0);

    if (!visiblePoints.length) return;
    const lineColor = linePalette[seriesIndex % linePalette.length];
    const totalPositive = entry.points.reduce((sum, point) => sum + point.positive, 0);
    const totalNegative = entry.points.reduce((sum, point) => sum + point.negative, 0);
    const totalReviews = totalPositive + totalNegative;
    const positivePortion = totalReviews ? ((totalPositive / totalReviews) * 100).toFixed(1) : "0.0";
    const negativePortion = totalReviews ? (100 - Number(positivePortion)).toFixed(1) : "0.0";

    const path = document.createElementNS(svgNs, "path");
    path.setAttribute(
      "d",
      visiblePoints
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
        .join(" ")
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", lineColor);
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("class", "timeline-line-path");
    svg.appendChild(path);

    visiblePoints.forEach((point) => {
      const circle = document.createElementNS(svgNs, "circle");
      circle.setAttribute("cx", point.x.toFixed(2));
      circle.setAttribute("cy", point.y.toFixed(2));
      circle.setAttribute("r", "7");
      circle.setAttribute("fill", getPositiveRateColor(point.positiveRate, minRate, maxRate));
      circle.setAttribute("stroke", "rgba(11, 18, 25, 0.88)");
      circle.setAttribute("stroke-width", "1.5");
      circle.setAttribute("class", "timeline-line-point");
      circle.addEventListener("mousemove", (event) => {
        showTimelineTooltip(event, {
          keyword: entry.keyword,
          tooltipDate: point.tooltipDate,
          positive: point.positive,
          negative: point.negative,
        });
      });
      circle.addEventListener("mouseleave", hideWordCloudTooltip);
      circle.addEventListener("click", () => {
        void activateTimelineBucket(point, entry.keyword);
      });
      svg.appendChild(circle);

      const hitArea = document.createElementNS(svgNs, "circle");
      hitArea.setAttribute("cx", point.x.toFixed(2));
      hitArea.setAttribute("cy", point.y.toFixed(2));
      hitArea.setAttribute("r", "12");
      hitArea.setAttribute("fill", "transparent");
      hitArea.setAttribute("class", "timeline-line-hit");
      hitArea.addEventListener("mousemove", (event) => {
        showTimelineTooltip(event, {
          keyword: entry.keyword,
          tooltipDate: point.tooltipDate,
          positive: point.positive,
          negative: point.negative,
        });
      });
      hitArea.addEventListener("mouseleave", hideWordCloudTooltip);
      hitArea.addEventListener("click", () => {
        void activateTimelineBucket(point, entry.keyword);
      });
      svg.appendChild(hitArea);
    });

    const row = document.createElement("div");
    row.className = "chart-row timeline-keyword-row";
    row.innerHTML = `<div class="chart-labels"><span class="timeline-keyword-row-label"><span class="timeline-keyword-swatch" style="background:${lineColor}"></span>${esc(
      entry.keyword
    )}</span><span>${fmt(totalReviews)} ${esc(t("reviewCount"))}</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${positivePortion}%"></div><div class="stacked-negative" style="width:${negativePortion}%"></div></div><div class="chart-labels review-status-breakdown"><span>${esc(
      `${t("positive")} ${fmt(totalPositive)} (${positivePortion}%)`
    )}</span><span>${esc(`${t("negative")} ${fmt(totalNegative)} (${negativePortion}%)`)}</span></div>`;
    summaryList.appendChild(row);
  });

  buckets.forEach((bucket, index) => {
    if (index % labelStep !== 0 && index !== buckets.length - 1) return;
    const label = document.createElement("div");
    label.className = "timeline-line-label";
    label.textContent = bucket.label;
    label.style.left = `${((leftPadding + xStep * index) / plotWidth) * 100}%`;
    plot.appendChild(label);
  });

  plot.appendChild(svg);
  shell.appendChild(axis);
  shell.appendChild(plot);
  els.timelineStatus.textContent = interp(t("timelineKeywordStatus"), {
    terms: fmt(keywords.length),
    buckets: fmt(buckets.length),
  });
  els.timelineChart.appendChild(shell);
  if (summaryList.childElementCount) els.timelineChart.appendChild(summaryList);
  renderTimelineMarkersList();
}

function renderTimelineChart(reviews) {
  const { buckets } = buildTimelineBuckets(reviews);
  els.timelineChart.innerHTML = "";
  hideWordCloudTooltip();
  if (!buckets.length) {
    els.timelineStatus.textContent = t("noReviews");
    els.timelineChart.innerHTML = `<div class="status-text">${esc(t("noReviews"))}</div>`;
    renderTimelineMarkersList();
    return;
  }

  if (state.timelineMode === "keywords") {
    renderTimelineKeywordChart(reviews, buckets);
    return;
  }

  els.timelineStatus.textContent = `${fmt(reviews.length)} ${t("reviewCount")}`;
  renderTimelineReviewCountChart(reviews, buckets);
}

function renderReviewStatusBar(reviews) {
  const positive = reviews.filter((review) => review.voted_up).length;
  const negative = reviews.length - positive;
  const total = reviews.length || 1;
  const positivePortion = ((positive / total) * 100).toFixed(1);
  const negativePortion = ((negative / total) * 100).toFixed(1);
  const scoreText = interp(t("reviewStatusScore"), { score: positivePortion });
  const positiveText = interp(t("reviewStatusPositive"), {
    count: fmt(positive),
    portion: positivePortion,
  });
  const negativeText = interp(t("reviewStatusNegative"), {
    count: fmt(negative),
    portion: negativePortion,
  });

  els.reviewStatusBar.innerHTML = `<div class="chart-row review-status-row"><div class="chart-labels"><span>${
    t("summaryPositiveRate")
  }: ${renderPositiveRateValue(positivePortion)}</span><span>${fmt(total)} ${esc(t("reviewCount"))}</span></div><div class="stack-bar"><div class="seg seg-pos-steam" style="width:${positivePortion}%"></div><div class="seg seg-neg-steam" style="width:${negativePortion}%"></div></div><div class="chart-labels review-status-breakdown"><span>${esc(
    `${t("positive")} ${positiveText}`
  )}</span><span>${esc(`${t("negative")} ${negativeText}`)}</span></div></div>`;
}

function getLanguageName(code) {
  if (code === "all") return t("allLanguage");
  return LANGUAGES.find(([, value]) => value === code)?.[0] || code;
}

function getLanguageDisplayName(code) {
  if (code === "all") return `ALL ${t("allLanguage")}`;
  const prefix = LANGUAGE_REGION_CODES[code] || code.toUpperCase();
  return `${prefix} ${getLanguageName(code)}`;
}

function getLanguageLabel(code) {
  if (code === "all") return getLanguageDisplayName(code);
  const total = state.summaryRows.reduce((sum, row) => sum + row.total_reviews, 0) || 1;
  const row = state.summaryRows.find((entry) => entry.languageCode === code);
  const portion = row ? ((row.total_reviews / total) * 100).toFixed(2) : "0.00";
  return `${getLanguageDisplayName(code)} (${portion}%)`;
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
  const title =
    mode === "loading"
      ? t("fetchLoadingTitle")
      : mode === "success"
        ? t("fetchCompleteTitle")
        : mode === "error"
          ? t("fetchErrorTitle")
          : t("fetchIdleTitle");
  els.fetchStateTitle.textContent = title;
  els.fetchStateText.textContent = message;
  els.fetchProgressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
  els.fetchProgressTrack.classList.toggle("hidden", mode === "success");
  els.reviewStatusBar.classList.toggle("hidden", mode !== "success");
  if (state.activeBlockingTask && mode === "loading") {
    updateLoadingOverlay(title, message);
  }
  requestAnimationFrame(updateFetchControlsPin);
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
  if (els.reviewTopicFilter) {
    els.reviewTopicFilter.innerHTML = [`<option value="all">${esc(topicText("topicAll"))}</option>`]
      .concat(getTopicCatalog().map((topic) => `<option value="${topic.id}">${esc(getTopicLabel(topic.id))}</option>`))
      .join("");
    els.reviewTopicFilter.value = state.reviewFilters.topic;
  }
}

function updateToggleButtons(container, activeValue, attribute) {
  const attrName = attribute.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  container.querySelectorAll(`[data-${attrName}]`).forEach((button) => {
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
  els.analysisPanelTimeline.classList.toggle("hidden", state.analysisTab !== "timeline");
  els.analysisPanelTopics.classList.toggle("hidden", state.analysisTab !== "topics");
  els.dataPanelDistribution.classList.toggle("hidden", state.dataTab !== "distribution");
  els.dataPanelPlaytime.classList.toggle("hidden", state.dataTab !== "playtime");
  updateTimelineUi();

  if (state.analysisTab === "reviews" && state.reviewRenderPending) {
    state.reviewRenderPending = false;
    renderReviews(state.reviewDisplayedReviews);
  }
  if (state.analysisTab === "topics" && state.currentAppId && state.topicLastRenderKey !== getTopicClusterAnalysisKey()) {
    void runDataTask(topicText("topicStatusLoading"), () => renderTopicClusters());
  }
}

function updateTimeRangeUi() {
  updateToggleButtons(els.timeRangeToggle, state.timeRange.mode, "timeRange");
  const displayRange = getDisplayTimeRangeDates();
  els.timeRangeStart.value = displayRange.start;
  els.timeRangeEnd.value = displayRange.end;
  updateAiAnalysisScope();
}

function updateTimelineUi() {
  updateToggleButtons(els.timelineModeToggle, state.timelineMode, "timelineMode");
  els.timelineKeywordControls.classList.toggle("hidden", state.timelineMode !== "keywords");
  renderTimelineKeywordList();
  renderTimelineMarkersList();
}

function updateTopicUi() {
  if (els.topicLanguageSelection) {
    populateLanguageSelect(els.topicLanguageSelection);
    els.topicLanguageSelection.value = state.topicLanguage;
  }
  if (els.topicSourceToggle) {
    updateToggleButtons(els.topicSourceToggle, state.topicSource, "topicSource");
  }
  if (els.topicChartViewToggle) {
    updateToggleButtons(els.topicChartViewToggle, state.topicChartView, "topicChartView");
  }
}

function getTargetTranslationLanguage() {
  return state.currentUiLanguage === "ja" ? "Japanese" : "English";
}

function getTranslationKey(review) {
  return [getSavedReviewKey(review), state.currentUiLanguage, state.ai.model].join("::");
}

const AI_ASSISTANT_SPRITES = {
  sleep: "./assets/sprites/anachan/AnaChan_sleep.png",
  rest: "./assets/sprites/anachan/AnaChan_rest.png",
  hello: "./assets/sprites/anachan/AnaChan_hello.png",
  stand: "./assets/sprites/anachan/AnaChan_stand.png",
  laptop: "./assets/sprites/anachan/AnaChan_laptop.png",
  exclamation: "./assets/sprites/anachan/AnaChan_exclamation.png",
};

function scheduleAiAssistantRefresh() {
  if (state.aiAssistant.timer) {
    clearTimeout(state.aiAssistant.timer);
    state.aiAssistant.timer = null;
  }
  const remaining = state.aiAssistant.temporaryUntil - Date.now();
  if (remaining > 0) {
    state.aiAssistant.timer = setTimeout(() => {
      state.aiAssistant.timer = null;
      refreshAiAssistantSprite();
    }, remaining);
  }
}

function setAiAssistantTemporaryMode(mode, duration = 3200) {
  state.aiAssistant.temporaryMode = mode;
  state.aiAssistant.temporaryUntil = Date.now() + duration;
  scheduleAiAssistantRefresh();
  refreshAiAssistantSprite();
}

function getAiAssistantMode() {
  if (state.aiAssistant.temporaryMode && state.aiAssistant.temporaryUntil > Date.now()) {
    return state.aiAssistant.temporaryMode;
  }
  if (state.aiAssistant.temporaryMode) {
    state.aiAssistant.temporaryMode = "";
    state.aiAssistant.temporaryUntil = 0;
  }
  if (state.aiAssistant.generating) return "laptop";
  if (state.activeBlockingTask) return "laptop";
  if (state.aiAssistant.connecting) return "rest";
  if (state.ai.connected) return "stand";
  return "sleep";
}

function getAiAssistantStatusText() {
  if (state.aiAssistant.generating) return t("aiStatusGenerating");
  if (state.activeBlockingTask) return t("aiStatusLoading");
  if (state.aiAssistant.connecting) return t("aiStatusConnecting");
  if (state.ai.connected) return t("aiStatusConnected");
  return t("aiStatusDisconnected");
}

function getAiAssistantStatusClass() {
  if (state.aiAssistant.generating || state.activeBlockingTask || state.aiAssistant.connecting) return "status-busy";
  if (state.ai.connected) return "status-connected";
  return "status-disconnected";
}

function refreshAiAssistantSprite() {
  if (!els.aiAssistantSprite) return;
  const mode = getAiAssistantMode();
  els.aiAssistantSprite.src = AI_ASSISTANT_SPRITES[mode] || AI_ASSISTANT_SPRITES.sleep;
  els.aiAssistantSprite.classList.toggle("working", Boolean(state.aiAssistant.generating || state.activeBlockingTask || state.aiAssistant.connecting));
}

function updateAiUi(status = "") {
  if (!els.aiSettingsButton) return;
  document.body.classList.toggle("ai-connected", state.ai.connected);
  if (els.aiAssistantStatus) {
    els.aiAssistantStatus.textContent = getAiAssistantStatusText();
    els.aiAssistantStatus.classList.remove("status-disconnected", "status-connected", "status-busy");
    els.aiAssistantStatus.classList.add(getAiAssistantStatusClass());
  }
  if (els.aiConnectionStatus) {
    els.aiConnectionStatus.textContent = status || (state.ai.connected ? t("aiConnected") : t("aiDisconnected"));
  }
  refreshAiAssistantSprite();
  renderAiAnalysisMessages();
}

function toggleAiSettingsPanel(forceOpen) {
  if (!els.aiSettingsPanel || !els.aiSettingsButton) return;
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : els.aiSettingsPanel.classList.contains("hidden");
  els.aiSettingsPanel.classList.toggle("hidden", !shouldOpen);
  els.aiSettingsButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
}

function renderAiModelOptions() {
  if (!els.aiModelSelect) return;
  const models = state.ai.models.length
    ? state.ai.models
    : state.ai.model
      ? [{ name: state.ai.model, displayName: state.ai.model }]
      : [];
  els.aiModelSelect.innerHTML = models.length
    ? models
        .map((model) => `<option value="${esc(model.name)}">${esc(model.displayName || model.name)}</option>`)
        .join("")
    : `<option value="">${esc(t("aiModelsPrompt"))}</option>`;
  els.aiModelSelect.value = state.ai.model && models.some((model) => model.name === state.ai.model) ? state.ai.model : models[0]?.name || "";
  state.ai.model = els.aiModelSelect.value;
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

function anonymizeReviewAuthor(author, recommendationid) {
  const safeAuthor = author && typeof author === "object" ? author : {};
  const alias = buildAnonymousReviewerAlias(safeAuthor.steamid, recommendationid);
  return {
    ...safeAuthor,
    steamid: alias,
    personaname: alias,
    profile_url: "",
  };
}

function anonymizeReview(review) {
  if (!review || typeof review !== "object") return review;
  return {
    ...review,
    author: anonymizeReviewAuthor(review.author, review.recommendationid),
  };
}

function anonymizeReviewPayload(payload) {
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.reviews)) return payload;
  return {
    ...payload,
    reviews: payload.reviews.map((review) => anonymizeReview(review)),
  };
}

function getCurrentAppName() {
  const app = state.appDetails.get(state.currentAppId)?.[state.currentAppId]?.data;
  return app?.name || state.currentAppId || "";
}

function getAiAnalysisTargetLanguage() {
  return state.currentUiLanguage === "ja" ? "Japanese" : "English";
}

function getActiveTimeRangeLabel() {
  const locale = state.currentUiLanguage === "ja" ? "ja-JP" : "en-US";
  const { start, end } = getDisplayTimeRangeDates();
  if (state.timeRange.mode === "lifetime") return t("timeSpanLifetime");
  if (state.timeRange.mode === "week") return t("timeSpanWeek");
  if (state.timeRange.mode === "month") return t("timeSpanMonth");
  if (state.timeRange.mode === "year") return t("timeSpanYear");
  if (!start || !end) return t("timeSpanCustom");
  return `${new Date(`${start}T00:00:00`).toLocaleDateString(locale)} - ${new Date(`${end}T00:00:00`).toLocaleDateString(locale)}`;
}

function normalizeAiQuestionTerms(question) {
  const asciiTerms = String(question || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, " ")
    .split(/\s+/)
    .filter((term) => term.length >= 3 && !AI_QUESTION_STOPWORDS.has(term));
  const cjkTerms = String(question || "").match(/[\u3040-\u30ff\u3400-\u9fff]{2,}/gu) || [];
  return [...new Set([...asciiTerms, ...cjkTerms])].slice(0, 12);
}

function classifyAiQuestion(question) {
  const text = String(question || "").toLowerCase();
  if (/\b(how many|count|percentage|percent|rate|ratio|share|when|which language)\b/.test(text)) return "factual";
  if (/\b(compare|difference|before|after|versus|vs|changed|change|trend|improve|worsen)\b/.test(text)) return "comparative";
  if (/\b(what.*want|wanted feature|feature request|wish|hope|should add|missing feature)\b/.test(text)) return "feature_request";
  if (/\b(pillar|core|main draw|defining|identity|why.*like|what.*keep.*playing)\b/.test(text)) return "pillar";
  if (/\b(what should|priority|recommend|advice|focus on|roadmap|fix first)\b/.test(text)) return "advisory";
  return "analytical";
}

function getAiQuestionModeLabel(mode) {
  return (
    {
      factual: "factual",
      comparative: "comparative",
      feature_request: "feature_request",
      pillar: "pillar",
      advisory: "advisory",
      analytical: "analytical",
    }[mode] || "analytical"
  );
}

function trimReviewSnippet(text, maxLength = 280) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}窶ｦ`;
}

function reviewMatchesAiTerm(review, term) {
  const text = String(review.review || "");
  if (!term) return false;
  if (containsJapanese(term) || containsHan(term)) return text.includes(term);
  return buildKeywordRegex(term).test(text);
}

function inferQuestionTopicIds(questionTerms, topicRows) {
  return topicRows
    .filter((row) => {
      const label = String(row.label || "").toLowerCase();
      const keywords = row.keywords || [];
      return questionTerms.some((term) => {
        const lower = String(term).toLowerCase();
        return (
          label.includes(lower) ||
          row.id.includes(lower) ||
          keywords.some((keyword) => String(keyword).toLowerCase().includes(lower))
        );
      });
    })
    .map((row) => row.id);
}

function scoreReviewForAi(review, questionTerms, focusTopicIds) {
  let score = 0;
  questionTerms.forEach((term) => {
    if (reviewMatchesAiTerm(review, term)) score += containsJapanese(term) || containsHan(term) ? 3.6 : 3;
  });
  if (focusTopicIds.some((topicId) => review._topics?.includes(topicId))) score += 3.5;
  if (review._topics?.length) score += Math.min(1.2, review._topics.length * 0.35);
  score += Math.min(1, getReviewLength(review) / 900);
  score += Math.min(0.75, (review.author?.playtime_forever || 0) / 2400);
  return score;
}

function selectRepresentativeAiReviews(reviews, questionTerms, focusTopicIds, limit = AI_ANALYSIS_SNIPPET_LIMIT) {
  const scored = reviews
    .map((review) => ({ review, score: scoreReviewForAi(review, questionTerms, focusTopicIds) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || (right.review.timestamp_created || 0) - (left.review.timestamp_created || 0));

  const positives = scored.filter((entry) => entry.review.voted_up).slice(0, Math.ceil(limit / 2));
  const negatives = scored.filter((entry) => !entry.review.voted_up).slice(0, Math.ceil(limit / 2));
  const merged = [];
  while ((positives.length || negatives.length) && merged.length < limit) {
    if (negatives.length) merged.push(negatives.shift());
    if (positives.length && merged.length < limit) merged.push(positives.shift());
  }

  if (merged.length < limit) {
    scored.forEach((entry) => {
      if (merged.length >= limit) return;
      if (!merged.some((picked) => getSavedReviewKey(picked.review) === getSavedReviewKey(entry.review))) merged.push(entry);
    });
  }

  return merged.slice(0, limit).map(({ review, score }) => ({
    id: review.recommendationid,
    language: getLanguageName(review.language),
    sentiment: review.voted_up ? t("positive") : t("negative"),
    createdAt: new Date((review.timestamp_created || 0) * 1000).toISOString(),
    playtimeMinutes: review.author?.playtime_forever || 0,
    topics: (review._topics || []).map((topicId) => getTopicLabel(topicId)),
    score: Number(score.toFixed(2)),
    snippet: trimReviewSnippet(review.review),
  }));
}

function matchesAnyPattern(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function buildAiThemeCandidates(reviews, questionTerms, focusTopicIds) {
  const topicSummaries = new Map();
  reviews.forEach((review) => {
    (review._topics || []).forEach((topicId) => {
      const entry = topicSummaries.get(topicId) || {
        topicId,
        label: getTopicLabel(topicId),
        mentions: 0,
        positive: 0,
        negative: 0,
        requestCount: 0,
        retentionCount: 0,
        pillarCount: 0,
      };
      entry.mentions += 1;
      if (review.voted_up) entry.positive += 1;
      else entry.negative += 1;
      const text = String(review.review || "");
      if (matchesAnyPattern(text, AI_REQUEST_PATTERNS)) entry.requestCount += 1;
      if (matchesAnyPattern(text, AI_RETENTION_PATTERNS)) entry.retentionCount += 1;
      if (matchesAnyPattern(text, AI_PILLAR_PATTERNS)) entry.pillarCount += 1;
      if (focusTopicIds.includes(topicId)) entry.mentions += 0.5;
      if (questionTerms.some((term) => reviewMatchesAiTerm(review, term))) entry.mentions += 0.25;
      topicSummaries.set(topicId, entry);
    });
  });
  return [...topicSummaries.values()]
    .map((entry) => ({
      ...entry,
      positiveRate: entry.mentions ? (entry.positive / entry.mentions) * 100 : 0,
      negativeRate: entry.mentions ? (entry.negative / entry.mentions) * 100 : 0,
    }))
    .sort((left, right) => right.mentions - left.mentions);
}

function selectPatternReviews(reviews, patterns, limit = 8) {
  return reviews
    .filter((review) => matchesAnyPattern(String(review.review || ""), patterns))
    .sort((left, right) => (right.timestamp_created || 0) - (left.timestamp_created || 0))
    .slice(0, limit)
    .map((review) => ({
      id: review.recommendationid,
      language: getLanguageName(review.language),
      sentiment: review.voted_up ? t("positive") : t("negative"),
      createdAt: new Date((review.timestamp_created || 0) * 1000).toISOString(),
      topics: (review._topics || []).map((topicId) => getTopicLabel(topicId)),
      snippet: trimReviewSnippet(review.review, 220),
    }));
}

function buildMarkerComparisons(reviews) {
  return state.timelineMarkers
    .filter((marker) => Number.isFinite(marker.dateMs))
    .slice(0, 8)
    .map((marker) => {
      const beforeStart = marker.dateMs - 14 * DAY_MS;
      const before = reviews.filter((review) => {
        const createdMs = (review.timestamp_created || 0) * 1000;
        return createdMs >= beforeStart && createdMs < marker.dateMs;
      });
      const after = reviews.filter((review) => {
        const createdMs = (review.timestamp_created || 0) * 1000;
        return createdMs >= marker.dateMs && createdMs < marker.dateMs + 14 * DAY_MS;
      });
      const beforePositive = before.filter((review) => review.voted_up).length;
      const afterPositive = after.filter((review) => review.voted_up).length;
      return {
        label: marker.label,
        date: new Date(marker.dateMs).toISOString().slice(0, 10),
        beforeReviewCount: before.length,
        afterReviewCount: after.length,
        beforePositiveRate: before.length ? Number(((beforePositive / before.length) * 100).toFixed(1)) : null,
        afterPositiveRate: after.length ? Number(((afterPositive / after.length) * 100).toFixed(1)) : null,
      };
    })
    .filter((entry) => entry.beforeReviewCount || entry.afterReviewCount);
}

async function buildAiEvidence(question) {
  const reviews = filterReviewsByActiveTimeRange(await collectReviews("all"));
  if (!reviews.length) return null;
  await ensureTopicTagsForReviews(reviews);
  const questionMode = classifyAiQuestion(question);
  const positiveCount = reviews.filter((review) => review.voted_up).length;
  const negativeCount = reviews.length - positiveCount;
  const topicRows = computeTopicRows(reviews);
  const summaryRows = buildSummaryRowsFromReviews(reviews);
  const questionTerms = normalizeAiQuestionTerms(question);
  const focusTopicIds = inferQuestionTopicIds(questionTerms, topicRows);
  const topKeywords =
    els.wordLanguageSelection?.value === "all" && state.wordCloudSentiment === "all" && state.wordCloudTerms.length
      ? state.wordCloudTerms.slice(0, 12)
      : extractWordCloudTerms(reviews).slice(0, 12);
  const snippets = selectRepresentativeAiReviews(reviews, questionTerms, focusTopicIds);
  const themeCandidates = buildAiThemeCandidates(reviews, questionTerms, focusTopicIds).slice(0, 6);
  const featureRequestReviews = selectPatternReviews(reviews, AI_REQUEST_PATTERNS, 8);
  const retentionReviews = selectPatternReviews(reviews.filter((review) => review.voted_up), AI_RETENTION_PATTERNS, 8);
  const pillarReviews = selectPatternReviews(reviews, AI_PILLAR_PATTERNS, 8);
  const minorityIssues = topicRows
    .filter((row) => row.reviewCount >= Math.max(3, Math.ceil(reviews.length * 0.01)) && row.negativeRate >= 60)
    .sort((left, right) => right.negativeRate - left.negativeRate || right.reviewCount - left.reviewCount)
    .slice(0, 3)
    .map((row) => ({
      topic: row.label,
      reviewCount: row.reviewCount,
      share: Number(row.mentionShare.toFixed(1)),
      positiveRate: Number(row.positiveRate.toFixed(1)),
      trend: row.trend,
    }));

  return {
    app: {
      appid: state.currentAppId,
      name: getCurrentAppName(),
    },
    questionMode,
    answerLanguage: getAiAnalysisTargetLanguage(),
    question,
    timeRange: {
      mode: state.timeRange.mode,
      label: getActiveTimeRangeLabel(),
      ...getDisplayTimeRangeDates(),
    },
    totals: {
      reviewCount: reviews.length,
      positiveCount,
      negativeCount,
      positiveRate: Number(((positiveCount / Math.max(1, reviews.length)) * 100).toFixed(1)),
    },
    byLanguage: summaryRows.slice(0, 8).map((row) => ({
      language: getLanguageName(row.languageCode),
      reviewCount: row.total_reviews,
      positiveRate: Number(((row.total_positive / Math.max(1, row.total_reviews)) * 100).toFixed(1)),
      rating: row.review_score_desc,
    })),
    topics: topicRows.slice(0, 6).map((row) => ({
      topic: row.label,
      reviewCount: row.reviewCount,
      share: Number(row.mentionShare.toFixed(1)),
      positiveRate: Number(row.positiveRate.toFixed(1)),
      negativeRate: Number(row.negativeRate.toFixed(1)),
      trend: row.trend,
      priority: row.priority,
      priorityScore: Number(row.priorityScore.toFixed(3)),
      keywords: row.keywords,
    })),
    minorityIssues,
    topKeywords: topKeywords.map((entry) => ({
      term: entry.term,
      reviewCount: entry.reviewCount,
      positiveRate: Number(entry.positiveRate.toFixed(1)),
    })),
    focus: {
      questionTerms,
      focusTopics: focusTopicIds.map((topicId) => getTopicLabel(topicId)),
    },
    inferredThemes: themeCandidates.map((entry) => ({
      topic: entry.label,
      mentions: Number(entry.mentions.toFixed(1)),
      positiveRate: Number(entry.positiveRate.toFixed(1)),
      requestCount: entry.requestCount,
      retentionCount: entry.retentionCount,
      pillarCount: entry.pillarCount,
    })),
    featureRequestReviews,
    retentionReviews,
    pillarReviews,
    markers: buildMarkerComparisons(reviews),
    representativeReviews: snippets,
  };
}

function getAiAnalysisCacheKey(question) {
  return [
    "aianalysis",
    state.currentAppId,
    state.ai.model,
    state.currentUiLanguage,
    state.timeRange.mode,
    state.timeRange.start || "",
    state.timeRange.end || "",
    state.cacheTimestamp || 0,
    hashText(String(question || "").trim().toLowerCase()),
  ].join("::");
}

function getAiAnalysisPreview(content) {
  const source = String(content || "").replace(/\r/g, "").trim();
  if (!source) return "";
  const lines = source.split("\n").map((line) => line.trim()).filter(Boolean);
  const answerIndex = lines.findIndex((line) => /^#{0,3}\s*answer\b[:：]?/i.test(line));
  const caveatIndex = lines.findIndex((line) => /^#{0,3}\s*caveats?\b[:：]?/i.test(line));
  const summaryLines = [];

  if (answerIndex >= 0) {
    for (let index = answerIndex; index < lines.length; index += 1) {
      const line = lines[index];
      if (index > answerIndex && /^#{0,3}\s*(why|evidence|caveats?)\b[:：]?/i.test(line)) break;
      summaryLines.push(line.replace(/^#{0,3}\s*answer\b[:：]?\s*/i, "").trim());
    }
  } else {
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (caveatIndex >= 0 && index >= caveatIndex) break;
      summaryLines.push(line);
      if (summaryLines.length >= 3) break;
    }
  }

  const normalized = summaryLines.join("\n").trim() || source;
  const compact = normalized.length <= 380 ? normalized : `${normalized.slice(0, 377).trimEnd()}...`;
  return compact;
}

function stripMarkdownForPreview(content) {
  return String(content || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function sanitizeMarkdownUrl(url) {
  const value = String(url || "").trim();
  return /^(https?:|mailto:)/i.test(value) ? value : "";
}

function renderMarkdownInline(text) {
  let html = esc(String(text || ""));
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = sanitizeMarkdownUrl(url);
    return safeUrl ? `<a href="${esc(safeUrl)}" target="_blank" rel="noreferrer">${label}</a>` : label;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^\w*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/(^|[^\w_])_([^_\n]+)_(?!_)/g, "$1<em>$2</em>");
  return html;
}

function renderMarkdownBlock(block) {
  const lines = String(block || "").split("\n");
  if (!lines.length) return "";
  const parts = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let quoteLines = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    parts.push(`<p>${paragraph.map((line) => renderMarkdownInline(line)).join("<br>")}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || !listItems.length) return;
    parts.push(`<${listType}>${listItems.map((item) => `<li>${renderMarkdownInline(item)}</li>`).join("")}</${listType}>`);
    listType = null;
    listItems = [];
  };

  const flushQuote = () => {
    if (!quoteLines.length) return;
    parts.push(`<blockquote>${quoteLines.map((line) => renderMarkdownInline(line)).join("<br>")}</blockquote>`);
    quoteLines = [];
  };

  lines.forEach((line) => {
    const heading = line.match(/^\s*(#{1,6})\s+(.+)$/);
    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    const quoted = line.match(/^\s*>\s?(.*)$/);

    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = Math.min(6, heading[1].length);
      parts.push(`<h${level}>${renderMarkdownInline(heading[2])}</h${level}>`);
      return;
    }

    if (unordered) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(unordered[1]);
      return;
    }

    if (ordered) {
      flushParagraph();
      flushQuote();
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(ordered[1]);
      return;
    }

    if (quoted) {
      flushParagraph();
      flushList();
      quoteLines.push(quoted[1]);
      return;
    }

    flushList();
    flushQuote();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushQuote();
  return parts.join("");
}

function renderMarkdownToHtml(content) {
  const source = String(content || "").replace(/\r/g, "");
  if (!source.trim()) return "";
  const blocks = [];
  const lines = source.split("\n");
  let current = [];
  let inFence = false;
  let fenceLines = [];

  const flushCurrent = () => {
    if (!current.length) return;
    blocks.push(renderMarkdownBlock(current.join("\n")));
    current = [];
  };

  const flushFence = () => {
    if (!fenceLines.length) return;
    blocks.push(`<pre><code>${esc(fenceLines.join("\n"))}</code></pre>`);
    fenceLines = [];
  };

  lines.forEach((line) => {
    if (/^\s*```/.test(line)) {
      if (inFence) {
        flushFence();
        inFence = false;
      } else {
        flushCurrent();
        inFence = true;
      }
      return;
    }

    if (inFence) {
      fenceLines.push(line);
      return;
    }

    if (!line.trim()) {
      flushCurrent();
      return;
    }

    current.push(line);
  });

  if (inFence) flushFence();
  flushCurrent();
  return blocks.join("");
}

function renderAiAnalysisMessages() {
  if (!els.aiAnalysisMessages) return;
  if (!state.aiAnalysisMessages.length) {
    const emptyText = !state.currentAppId
      ? t("aiAnalysisNeedApp")
      : !state.ai.connected
        ? t("aiAnalysisNeedConnection")
        : t("aiAnalysisEmpty");
    els.aiAnalysisMessages.innerHTML = `<div class="status-text">${esc(emptyText)}</div>`;
    return;
  }

  els.aiAnalysisMessages.innerHTML = state.aiAnalysisMessages
    .map((message, index) => {
      const label = message.role === "user" ? (state.currentUiLanguage === "ja" ? "あなた" : "You") : "AnaChan";
      const meta = message.meta ? `<div class="ai-analysis-message-meta">${esc(message.meta)}</div>` : "";
      const preview = message.role === "assistant" ? getAiAnalysisPreview(message.content) : "";
      const hasDetails = message.role === "assistant" && preview && preview !== String(message.content || "").trim();
      const expanded = Boolean(message.expanded);
      const expandLabel =
        state.currentUiLanguage === "ja" ? (expanded ? "詳細を隠す" : "詳細を表示") : expanded ? "Hide details" : "Show details";
      const renderedContent =
        message.role === "assistant" ? renderMarkdownToHtml(message.content) : esc(message.content).replace(/\n/g, "<br>");
      const body = hasDetails
        ? `<div class="ai-analysis-message-summary markdown-body">${renderMarkdownToHtml(preview)}</div>
           <button class="ai-analysis-expand" type="button" data-ai-expand="${index}" data-expanded="${expanded ? "true" : "false"}">${expandLabel}</button>
           <div class="ai-analysis-message-body markdown-body${expanded ? "" : " hidden"}">${renderedContent}</div>`
        : `<div class="ai-analysis-message-body${message.role === "assistant" ? " markdown-body" : ""}">${renderedContent}</div>`;
      return `<article class="ai-analysis-message ${esc(message.role)}"><div class="ai-analysis-message-head"><span class="ai-analysis-message-role">${esc(
        label
      )}</span><span>${esc(message.timestamp || "")}</span></div>${body}${meta}</article>`;
    })
    .join("");
  els.aiAnalysisMessages.scrollTop = els.aiAnalysisMessages.scrollHeight;
}

function renderAiAnalysisTemplates() {
  if (!els.aiAnalysisTemplates) return;
  const labels = {
    pillar: t("aiTemplatePillar"),
    feature: t("aiTemplateFeature"),
    trend: t("aiTemplateTrend"),
    sales: t("aiTemplateSales"),
  };
  els.aiAnalysisTemplates.querySelectorAll("[data-ai-template]").forEach((button) => {
    const key = button.dataset.aiTemplate;
    button.textContent = labels[key] || "";
  });
}

async function submitAiAnalysis() {
  if (!els.aiAnalysisInput) return;
  try {
    await askAiAnalysis(els.aiAnalysisInput.value);
    els.aiAnalysisInput.value = "";
  } catch (error) {
    renderAiAnalysisMessages();
  }
}

function updateAiAnalysisScope() {
  if (!els.aiAnalysisScope) return;
  els.aiAnalysisScope.textContent = `${t("aiAnalysisScope")} ${getActiveTimeRangeLabel()}`;
}

function pushAiAnalysisMessage(role, content, meta = "") {
  const locale = state.currentUiLanguage === "ja" ? "ja-JP" : "en-US";
  state.aiAnalysisMessages.push({
    role,
    content,
    meta,
    timestamp: new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }),
  });
  renderAiAnalysisMessages();
}

async function askAiAnalysis(question) {
  if (!API_BASE) throw new Error(t("noProxyConfigured"));
  if (!state.currentAppId) {
    renderAiAnalysisMessages();
    throw new Error(t("aiAnalysisNeedApp"));
  }
  if (!state.ai.connected || !state.ai.apiKey || !state.ai.model) {
    renderAiAnalysisMessages();
    throw new Error(t("aiAnalysisNeedConnection"));
  }

  const trimmedQuestion = String(question || "").trim();
  if (!trimmedQuestion) return;
  pushAiAnalysisMessage("user", trimmedQuestion);
  const cacheKey = getAiAnalysisCacheKey(trimmedQuestion);
  els.aiAnalysisSendButton.disabled = true;
  els.aiAnalysisSendButton.textContent = t("aiAnalysisLoading");
  state.aiAssistant.generating = true;
  refreshAiAssistantSprite();

  try {
    const cached = await getRecord(cacheKey);
    if (cached && Date.now() - cached.storedAt <= AI_ANALYSIS_CACHE_TTL) {
        pushAiAnalysisMessage("assistant", cached.value.answer, `${t("aiAnalysisCached")} - ${cached.value.meta}`);
      return;
    }

    const evidence = await buildAiEvidence(trimmedQuestion);
    if (!evidence) throw new Error(t("aiAnalysisNoReviews"));
    const payload = await postJson(`${API_BASE}/analyze`, {
      apiKey: state.ai.apiKey,
      baseUrl: state.ai.baseUrl,
      model: state.ai.model,
      question: trimmedQuestion,
      questionMode: evidence.questionMode,
      answerLanguage: evidence.answerLanguage,
      evidence,
    });
    const meta = interp(t("aiAnalysisEvidence"), {
      reviews: fmt(evidence.totals.reviewCount),
      topics: fmt(evidence.topics.length),
      snippets: fmt(evidence.representativeReviews.length),
    });
      pushAiAnalysisMessage("assistant", payload.answer || "", `${t("aiAnalysisLive")} - ${meta}`);
    await putRecord(cacheKey, { answer: payload.answer || "", meta });
  } catch (error) {
    if (isAbortError(error)) throw error;
    pushAiAnalysisMessage("assistant", `${t("aiAnalysisFailed")} ${error.message || error}`, "");
  } finally {
    state.aiAssistant.generating = false;
    els.aiAnalysisSendButton.disabled = false;
    els.aiAnalysisSendButton.textContent = t("aiAnalysisAsk");
    refreshAiAssistantSprite();
  }
}

function renderWordPreferenceList() {
  const chips = [];
  state.wordCloudPrefs.allowed.forEach((term) => {
    chips.push(
      `<span class="word-preference-chip allowed">${esc(term)} <button type="button" aria-label="Remove allowed phrase" data-pref-type="allowed" data-pref-term="${esc(term)}">×</button></span>`
    );
  });
  state.wordCloudPrefs.banned.forEach((term) => {
    chips.push(
      `<span class="word-preference-chip banned">${esc(term)} <button type="button" aria-label="Remove banned phrase" data-pref-type="banned" data-pref-term="${esc(term)}">×</button></span>`
    );
  });
  els.wordPreferenceList.innerHTML = chips.join("");
}

function renderPlaytimeCutoffControls() {
  els.playtimeCutoffControls.innerHTML = "";
}

function renderRecentApps() {
  if (!els.recentAppsPanel || !els.recentAppsList) return;
  const items = state.recentApps.slice(0, 8);
  els.recentAppsPanel.classList.toggle("hidden", !items.length);
  if (!items.length) {
    els.recentAppsList.innerHTML = "";
    return;
  }
  els.recentAppsList.innerHTML = items
    .map(
      (app) => `<button class="recent-apps-card${app.appid === state.currentAppId ? " active" : ""}" type="button" data-recent-appid="${esc(
        app.appid
      )}" aria-label="${esc(app.name)}"><img src="${esc(app.headerImage || "")}" alt="${esc(app.name)}" loading="lazy" /></button>`
    )
    .join("");
}

async function rememberRecentApp(appid, app) {
  const entry = {
    appid,
    name: app?.name || appid,
    headerImage: app?.header_image || "",
  };
  state.recentApps = [entry, ...state.recentApps.filter((item) => item.appid !== appid)].slice(0, 8);
  renderRecentApps();
  await persistRecentApps();
}

function applyTranslations() {
  document.documentElement.lang = state.currentUiLanguage;
  document.title = t("brandTitle");
  if (els.uiLanguageToggle) {
    els.uiLanguageToggle.innerHTML =
      '<span class="lang-pill" data-lang="ja">日本語</span><span class="lang-pill" data-lang="en">EN</span>';
  }
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (key && t(key)) node.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n="topicClusters"]').forEach((node) => {
    node.textContent = topicText("topicClusters");
  });
  document.querySelectorAll('[data-i18n="topicClustersEyebrow"]').forEach((node) => {
    node.textContent = topicText("topicClustersEyebrow");
  });
  document.querySelectorAll('[data-i18n="topicSource"]').forEach((node) => {
    node.textContent = topicText("topicSource");
  });
  document.querySelectorAll('[data-i18n="topicSourceAll"]').forEach((node) => {
    node.textContent = topicText("topicSourceAll");
  });
  document.querySelectorAll('[data-i18n="topicSourceSaved"]').forEach((node) => {
    node.textContent = topicText("topicSourceSaved");
  });
  document.querySelectorAll('[data-i18n="chartLine"]').forEach((node) => {
    node.textContent = topicText("chartLine");
  });
  document.querySelectorAll('[data-i18n="topicFilter"]').forEach((node) => {
    node.textContent = topicText("topicFilter");
  });
  document.querySelectorAll(".ai-analysis-expand").forEach((node) => {
    node.textContent = state.currentUiLanguage === "ja"
      ? (node.dataset.expanded === "true" ? "詳細を隠す" : "詳細を表示")
      : (node.dataset.expanded === "true" ? "Hide details" : "Show details");
  });

  els.appidInput.placeholder = t("appInputPlaceholder");
  els.reviewSearchInput.placeholder = t("searchPlaceholder");
  els.wordPreferenceInput.placeholder = t("wordPreferencePlaceholder");
  els.timelineKeywordInput.placeholder = t("timelineKeywordPlaceholder");
  if (els.aiAnalysisInput) els.aiAnalysisInput.placeholder = t("aiAnalysisPlaceholder");
  renderAiAnalysisTemplates();
  if (els.aiBaseUrlInput) els.aiBaseUrlInput.value = state.ai.baseUrl;
  if (els.aiApiKeyInput) els.aiApiKeyInput.value = state.ai.apiKey;
  if (els.loadingCancelButton) els.loadingCancelButton.textContent = t("loadingCancel");
  if (state.activeBlockingTask) {
    updateLoadingOverlay(els.fetchStateTitle?.textContent || t("loadingOverlayTitle"), els.fetchStateText?.textContent || t("loadingOverlayBody"));
  } else {
    updateLoadingOverlay(t("loadingOverlayTitle"), t("loadingOverlayBody"));
  }
  renderAiModelOptions();

  updateToggleButtons(els.uiLanguageToggle, state.currentUiLanguage, "lang");
  if (els.positiveRateColorToggle) {
    const pill = els.positiveRateColorToggle.querySelector("[data-positive-rate-colors]");
    if (pill) pill.classList.toggle("active", state.showPositiveRateColors);
  }
  updateToggleButtons(els.chartTypeToggle, state.chartType, "chart");
  updateToggleButtons(els.reviewSortToggle, state.reviewSort, "sort");
  updateToggleButtons(els.reviewSentimentToggle, state.reviewFilters.sentiment, "sentiment");
  updateToggleButtons(els.reviewSavedToggle, state.reviewFilters.saved, "savedFilter");
  updateToggleButtons(els.wordSentimentToggle, state.wordCloudSentiment, "wordSentiment");
  if (els.wordViewToggle) updateToggleButtons(els.wordViewToggle, state.wordCloudView, "wordView");
  updateReviewTabUi();
  updateWorkspaceTabs();
  updateTimeRangeUi();
  updateTimelineUi();
  updateTopicUi();
  updateAiUi();

  populateLanguageSelect(els.reviewLanguageSelection);
  populateLanguageSelect(els.playtimeLanguageSelection);
  populateLanguageSelect(els.wordLanguageSelection);
  populateReviewFilterSelects();
  renderPlaytimeCutoffControls();
  updateCacheTimestamp(state.cacheTimestamp);
  renderWordPreferenceList();
  renderRecentApps();
  updateAiAnalysisScope();
  renderAiAnalysisMessages();

  if (!API_BASE) els.deploymentNote.innerHTML = t("proxyRequired");
  if (state.summaryRows.length) {
    renderDistributionChart(state.summaryRows);
  }

  updateReviewSummary();
  if (state.analysisTab === "reviews") {
    renderReviews(state.reviewDisplayedReviews);
  } else {
    state.reviewRenderPending = Boolean(state.reviewDisplayedReviews.length);
  }
  if (state.reviewTab === "saved") els.reviewTitle.textContent = t("savedReviewsTitle");
  renderWordCloud();
  if (state.currentAppId && state.analysisTab === "timeline") void rerenderTimelineFromCache();
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
  throwIfTaskCancelled();
  const response = await fetch(url, { signal: getActiveTaskSignal() });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function postJson(url, body) {
  throwIfTaskCancelled();
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: getActiveTaskSignal(),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed: ${response.status}`);
  return payload;
}

async function fetchText(url) {
  throwIfTaskCancelled();
  const response = await fetch(url, { signal: getActiveTaskSignal() });
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
  state.savedReviews = Array.isArray(record?.value) ? record.value.map((review) => anonymizeReview(review)) : [];
  if (Array.isArray(record?.value)) await putRecord("savedreviews", state.savedReviews);
}

async function loadWordCloudPrefsFromCache() {
  const record = await getRecord("wordcloudprefs");
  const value = record?.value;
  state.wordCloudPrefs = {
    allowed: Array.isArray(value?.allowed) ? value.allowed : [],
    banned: Array.isArray(value?.banned) ? value.banned : [],
  };
}

async function loadTimelineKeywordsFromCache() {
  const record = await getRecord("timelinekeywords");
  state.timelineKeywords = Array.isArray(record?.value) ? record.value.slice(0, 6) : [];
}

function getTimelineMarkersStorageKey(appid) {
  return `timelinemarkers::${appid}`;
}

async function loadTimelineMarkersFromCache(appid) {
  if (!appid) {
    state.timelineMarkers = [];
    state.timelineMarkersAppId = null;
    return;
  }
  if (state.timelineMarkersAppId === appid) return;
  const record = await getRecord(getTimelineMarkersStorageKey(appid));
  state.timelineMarkers = Array.isArray(record?.value) ? record.value : [];
  state.timelineMarkersAppId = appid;
}

async function persistTimelineMarkers() {
  if (!state.currentAppId) return;
  await putRecord(getTimelineMarkersStorageKey(state.currentAppId), state.timelineMarkers);
}

async function loadAiSettingsFromCache() {
  const record = await getRecord("aisettings");
  if (record?.value?.baseUrl) state.ai.baseUrl = record.value.baseUrl;
  if (record?.value?.model) state.ai.model = record.value.model;
  if (record?.value?.apiKey) state.ai.apiKey = record.value.apiKey;
  if (Array.isArray(record?.value?.models)) state.ai.models = record.value.models;
  const translations = await getRecord("translations");
  state.translationCache = new Map(Object.entries(translations?.value || {}));
}

async function loadUiSettingsFromCache() {
  const record = await getRecord("uisettings");
  if (typeof record?.value?.showPositiveRateColors === "boolean") {
    state.showPositiveRateColors = record.value.showPositiveRateColors;
  }
}

async function loadRecentAppsFromCache() {
  const record = await getRecord("recentapps");
  state.recentApps = Array.isArray(record?.value) ? record.value.slice(0, 8) : [];
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

async function persistTimelineKeywords() {
  await putRecord("timelinekeywords", state.timelineKeywords.slice(0, 6));
}

async function persistAiSettings() {
  await putRecord("aisettings", {
    baseUrl: state.ai.baseUrl,
    model: state.ai.model,
    apiKey: state.ai.apiKey,
    models: state.ai.models,
  });
}

async function persistUiSettings() {
  await putRecord("uisettings", {
    showPositiveRateColors: state.showPositiveRateColors,
  });
}

async function persistRecentApps() {
  await putRecord("recentapps", state.recentApps.slice(0, 8));
}

async function persistTranslationCache() {
  await putRecord("translations", Object.fromEntries(state.translationCache.entries()));
}

function getTopicTagStorageKey(appid) {
  return `topictags::${appid}::v${TOPIC_TAGS_VERSION}`;
}

function getTopicClusterStorageKey(appid) {
  return `topicclusters::${appid}::v${TOPIC_CLUSTER_CACHE_VERSION}`;
}

function getTopicClusterAnalysisKey() {
  const { start, end } = getDisplayTimeRangeDates();
  const savedStamp =
    state.topicSource === "saved"
      ? getSavedReviewsForCurrentApp(state.topicLanguage)
          .map((review) => getSavedReviewKey(review))
          .sort()
          .join("|")
      : "all";
  return [state.currentAppId, state.topicLanguage, state.topicSource, start || "", end || "", savedStamp].join("::");
}

function getCollectedReviewsCacheKey(lang) {
  const { start, end } = getDisplayTimeRangeDates();
  return [state.currentAppId, lang, start || "", end || "", getActiveRangeFetchFloor() || "all"].join("::");
}

async function loadTopicTagCache(appid) {
  if (state.topicTagCacheAppId === appid) return state.topicTagCache;
  const record = await getRecord(getTopicTagStorageKey(appid));
  state.topicTagCacheAppId = appid;
  state.topicTagCache = new Map(Object.entries(record?.value || {}));
  return state.topicTagCache;
}

async function persistTopicTagCache(appid) {
  if (state.topicTagCacheAppId !== appid) return;
  const serializable = Object.fromEntries(state.topicTagCache.entries());
  await putRecord(getTopicTagStorageKey(appid), serializable);
}

async function loadTopicClusterCache(appid) {
  if (state.topicClusterCacheAppId === appid) return state.topicClusterCache;
  const record = await getRecord(getTopicClusterStorageKey(appid));
  state.topicClusterCacheAppId = appid;
  state.topicClusterCache = new Map(Object.entries(record?.value || {}));
  return state.topicClusterCache;
}

async function persistTopicClusterCache(appid) {
  if (state.topicClusterCacheAppId !== appid) return;
  const serializable = Object.fromEntries(state.topicClusterCache.entries());
  await putRecord(getTopicClusterStorageKey(appid), serializable);
}

function matchesTopicKeyword(rawText, normalizedText, keyword) {
  if (!keyword) return false;
  if (containsHan(keyword) || containsKana(keyword)) {
    return rawText.includes(keyword);
  }
  return createSearchRegex(keyword, false).test(normalizedText);
}

function analyzeReviewTopics(review) {
  const rawText = String(review.review || "");
  const normalizedText = normalizeWordCloudText(rawText);
  const topicMatches = {};
  let primaryTopic = null;
  let primaryScore = 0;

  getTopicCatalog().forEach((topic) => {
    const matches = new Set();
    const keywordGroups = [topic.keywords?.en || []];
    if (containsJapanese(rawText)) keywordGroups.push(topic.keywords?.ja || []);
    if (containsChinese(rawText)) keywordGroups.push(topic.keywords?.zh || []);
    keywordGroups.flat().forEach((keyword) => {
      if (matchesTopicKeyword(rawText, normalizedText, keyword)) matches.add(keyword);
    });
    if (!matches.size) return;
    topicMatches[topic.id] = [...matches];
    if (matches.size > primaryScore) {
      primaryScore = matches.size;
      primaryTopic = topic.id;
    }
  });

  return {
    topics: Object.keys(topicMatches),
    primaryTopic,
    topicMatches,
  };
}

function attachTopicTag(review, tag) {
  review._topics = Array.isArray(tag?.topics) ? tag.topics : [];
  review._primaryTopic = tag?.primaryTopic || null;
  review._topicMatches = tag?.topicMatches || {};
  return review;
}

async function ensureTopicTagsForReviews(reviews, options = {}) {
  const appid = state.currentAppId;
  if (!appid || !reviews.length) return reviews;
  const cache = await loadTopicTagCache(appid);
  const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
  let dirty = false;

  for (let index = 0; index < reviews.length; index += 1) {
    throwIfTaskCancelled();
    const review = reviews[index];
    const key = getSavedReviewKey(review);
    let tag = cache.get(key);
    if (!tag) {
      tag = analyzeReviewTopics(review);
      cache.set(key, tag);
      dirty = true;
    }
    attachTopicTag(review, tag);
    if (onProgress && (index === 0 || (index + 1) % 150 === 0 || index === reviews.length - 1)) {
      onProgress({ processed: index + 1, total: reviews.length });
      await yieldToUi();
    }
  }

  if (dirty) await persistTopicTagCache(appid);
  return reviews;
}

function computeTopicPriority(row) {
  const share = row.reviewCount / Math.max(1, row.totalReviews);
  const negativeRate = row.reviewCount ? row.negativeCount / row.reviewCount : 0;
  const trendBoost = row.trend === "up" ? 0.12 : row.trend === "down" ? -0.05 : 0;
  const severityBoost = Math.min(0.18, row.severityHits * 0.03);
  const score = share * 0.45 + negativeRate * 0.45 + trendBoost + severityBoost;
  return {
    score,
    priority: score >= 0.5 ? "high" : score >= 0.26 ? "medium" : "low",
  };
}

function computeTopicRows(reviews) {
  const sorted = [...reviews].sort((a, b) => (a.timestamp_created || 0) - (b.timestamp_created || 0));
  const midpoint = Math.floor(sorted.length / 2);
  const firstHalf = new Set(sorted.slice(0, midpoint).map((review) => getSavedReviewKey(review)));
  const secondHalf = new Set(sorted.slice(midpoint).map((review) => getSavedReviewKey(review)));

  return getTopicCatalog().map((topic) => {
    const topicReviews = reviews.filter((review) => review._topics?.includes(topic.id));
    const keywordCounts = new Map();
    let positiveCount = 0;
    let negativeCount = 0;
    let firstMentions = 0;
    let secondMentions = 0;
    let severityHits = 0;

    topicReviews.forEach((review) => {
      if (review.voted_up) positiveCount += 1;
      else negativeCount += 1;
      const key = getSavedReviewKey(review);
      if (firstHalf.has(key)) firstMentions += 1;
      if (secondHalf.has(key)) secondMentions += 1;
      const matches = review._topicMatches?.[topic.id] || [];
      matches.forEach((match) => keywordCounts.set(match, (keywordCounts.get(match) || 0) + 1));
      severityHits += matches.filter((match) => topic.severity.some((needle) => match.includes(needle))).length;
    });

    const trend =
      secondMentions > firstMentions * 1.15 ? "up" : secondMentions < Math.max(1, firstMentions * 0.85) ? "down" : "flat";

    const row = {
      id: topic.id,
      label: getTopicLabel(topic.id),
      color: topic.color,
      totalReviews: reviews.length,
      reviewCount: topicReviews.length,
      positiveCount,
      negativeCount,
      positiveRate: topicReviews.length ? (positiveCount / topicReviews.length) * 100 : 0,
      negativeRate: topicReviews.length ? (negativeCount / topicReviews.length) * 100 : 0,
      mentionShare: reviews.length ? (topicReviews.length / reviews.length) * 100 : 0,
      trend,
      severityHits,
      keywords: [...keywordCounts.entries()]
        .sort((left, right) => right[1] - left[1])
        .slice(0, 4)
        .map(([keyword]) => keyword),
    };
    const priorityInfo = computeTopicPriority(row);
    row.priority = priorityInfo.priority;
    row.priorityScore = priorityInfo.score;
    return row;
  })
    .filter((row) => row.reviewCount > 0)
    .sort((left, right) => right.reviewCount - left.reviewCount)
    .sort((left, right) => right.reviewCount - left.reviewCount);
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

  const value = anonymizeReviewPayload(force ? await load() : await getCachedValue(`reviews::${key}`, load));
  await putRecord(`reviews::${key}`, value);
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

  tooltip.innerHTML = `<strong class="language-inline">${getLanguageDisplayMarkup(row.languageCode)}</strong><div>${fmt(row.total_reviews)} ${t(
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
    item.innerHTML = `<span class="pie-dot" style="background:${palette[index % palette.length]}"></span><span class="language-inline">${getLanguageDisplayMarkup(
      row.languageCode
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
    element.innerHTML = `<div class="chart-labels"><span class="language-inline">${getLanguageDisplayMarkup(row.languageCode)}</span><span>${fmt(
      row.total_reviews
    )}</span></div><div class="chart-meta"><span>${t("portion")}: ${share}%</span><span>${t("score")}: ${renderPositiveRateValue(score, 0)} (${esc(
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
    .replace(/[^\p{L}\p{N}'\s\-繝ｼ]+/gu, " ");
}

function normalizePreferenceTerm(text) {
  return normalizeWordCloudText(text).replace(/\s+/g, " ").trim();
}

function normalizeJapaneseToken(token) {
  return String(token || "").trim();
}

function looksLikeContentTermEnhanced(token, blockedTerms) {
  if (state.wordCloudPrefs.allowed.includes(token)) return true;
  if (!token) return false;
  if (blockedTerms.has(token)) return false;
  if (containsKana(token)) {
    if (token.length < 2) return false;
    if (WORD_STOP_WORDS_JA.has(token) || WORD_GAME_STOP_WORDS_JA.has(token)) return false;
    if (/^[縺・繧悶・]+$/u.test(token)) return false;
    if (/^\d+$/u.test(token)) return false;
    return true;
  }
  if (containsChinese(token)) {
    if (token.length < 2) return false;
    if (WORD_STOP_WORDS_ZH.has(token) || WORD_GAME_STOP_WORDS_ZH.has(token)) return false;
    return true;
  }
  if (containsHan(token)) {
    if (token.length < 2) return false;
    if (WORD_STOP_WORDS_JA.has(token) || WORD_GAME_STOP_WORDS_JA.has(token)) return false;
    if (WORD_STOP_WORDS_ZH.has(token) || WORD_GAME_STOP_WORDS_ZH.has(token)) return false;
    return true;
  }
  return looksLikeContentTerm(token, blockedTerms);
}

function extractEnglishWordCloudTokens(text, blockedTerms) {
  return (normalizeWordCloudText(text).match(/[a-z][a-z'-]{2,}/g) || [])
    .map((token) => token.replace(/^'+|'+$/g, ""))
    .filter((token) => looksLikeContentTermEnhanced(token, blockedTerms));
}

function extractJapaneseWordCloudTokens(text, blockedTerms) {
  const matches =
    String(text || "").match(/[\u30A1-\u30FA繝ｼ]{2,}|[\u4E00-\u9FFF]{2,6}|[\u4E00-\u9FFF]{1,6}[\u3041-\u3096]{1,4}/gu) || [];
  return matches
    .map((token) => normalizeJapaneseToken(token))
    .filter((token) => looksLikeContentTermEnhanced(token, blockedTerms));
}

function extractChineseWordCloudTokens(text, blockedTerms) {
  const chunks = String(text || "").match(/[\u4E00-\u9FFF]{2,20}/gu) || [];
  const tokens = new Set();

  const addToken = (token) => {
    const normalized = String(token || "").trim();
    if (!normalized || normalized.length < 2) return;
    if (WORD_STOP_CHARS_ZH.has(normalized[0]) || WORD_STOP_CHARS_ZH.has(normalized[normalized.length - 1])) return;
    if ([...normalized].every((char) => WORD_STOP_CHARS_ZH.has(char))) return;
    if (looksLikeContentTermEnhanced(normalized, blockedTerms)) tokens.add(normalized);
  };

  chunks.forEach((chunk) => {
    if (chunk.length <= 4) {
      addToken(chunk);
      return;
    }

    for (let size = 2; size <= 4; size += 1) {
      for (let index = 0; index <= chunk.length - size; index += 1) {
        addToken(chunk.slice(index, index + size));
      }
    }
  });

  return [...tokens];
}

function extractWordCloudTokens(text, blockedTerms) {
  return [
    ...extractEnglishWordCloudTokens(text, blockedTerms),
    ...extractJapaneseWordCloudTokens(text, blockedTerms),
    ...extractChineseWordCloudTokens(text, blockedTerms),
  ];
}

function buildAllowedTermStats(reviews, allowedTerms) {
  const stats = new Map();
  allowedTerms.forEach((term) => {
    stats.set(term, { reviewCount: 0, occurrences: 0, positiveReviews: 0, negativeReviews: 0 });
  });

  reviews.forEach((review) => {
    const normalizedReview = normalizeWordCloudText(review.review);
    allowedTerms.forEach((term) => {
      const regex = createSearchRegex(term, true);
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
  const tokens = extractWordCloudTokens(name, new Set()).filter(Boolean);
  const blocked = new Set(tokens);
  for (let index = 0; index < tokens.length - 1; index += 1) {
    if (!containsHan(tokens[index]) && !containsHan(tokens[index + 1])) {
      blocked.add(`${tokens[index]} ${tokens[index + 1]}`);
    }
  }
  state.wordCloudPrefs.banned.forEach((term) => blocked.add(term));
  return blocked;
}

function looksLikeContentTerm(token, blockedTerms) {
  if (state.wordCloudPrefs.allowed.includes(token)) return true;
  if (!token) return false;
  if (blockedTerms.has(token)) return false;
  if (containsJapanese(token)) {
    if (token.length < 2) return false;
    if (WORD_STOP_WORDS_JA.has(token) || WORD_GAME_STOP_WORDS_JA.has(token)) return false;
    if (/^[縺・繧悶・]+$/u.test(token)) return false;
    if (/^\d+$/u.test(token)) return false;
    return true;
  }
  if (token.length < 3) return false;
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
    const tokens = extractWordCloudTokens(review.review, blockedTerms);

    const terms = [];
    tokens.forEach((token, index) => {
      terms.push(token);
      const next = tokens[index + 1];
      if (next && !containsHan(token) && !containsHan(next)) {
        const phrase = `${token} ${next}`;
        if (!blockedTerms.has(phrase) && looksLikeContentTermEnhanced(next, blockedTerms)) terms.push(phrase);
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
  )}: ${renderPositiveRateValue(entry.positiveRate)}</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function hideWordCloudTooltip() {
  const tooltip = document.querySelector(".word-cloud-tooltip");
  if (tooltip) tooltip.style.display = "none";
}

function renderWordCloudScatter() {
  const width = 1200;
  const height = 520;
  const margin = { top: 20, right: 30, bottom: 56, left: 72 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const maxReviewCount = Math.max(...state.wordCloudTerms.map((entry) => entry.reviewCount), 1);
  const rates = state.wordCloudTerms.map((entry) => entry.positiveRate);
  const minRate = Math.min(...rates, 0);
  const maxRate = Math.max(...rates, 100);
  const rateSpan = Math.max(1, maxRate - minRate);
  const tickRates = [0, 25, 50, 75, 100].filter((tick, index, array) => index === 0 || tick <= Math.max(100, maxRate));

  const wrap = document.createElement("div");
  wrap.className = "word-cloud-scatter";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const grid = document.createElementNS("http://www.w3.org/2000/svg", "g");
  grid.setAttribute("class", "word-cloud-scatter-grid");
  tickRates.forEach((tick) => {
    const y = margin.top + plotHeight - ((tick - minRate) / rateSpan) * plotHeight;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(margin.left));
    line.setAttribute("x2", String(margin.left + plotWidth));
    line.setAttribute("y1", String(y));
    line.setAttribute("y2", String(y));
    if (tick === 0) line.setAttribute("class", "axis-zero");
    grid.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(margin.left - 10));
    label.setAttribute("y", String(y + 4));
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "word-cloud-scatter-label");
    label.textContent = `${tick}%`;
    svg.appendChild(label);
  });
  svg.appendChild(grid);

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", String(margin.left));
  xAxis.setAttribute("x2", String(margin.left + plotWidth));
  xAxis.setAttribute("y1", String(margin.top + plotHeight));
  xAxis.setAttribute("y2", String(margin.top + plotHeight));
  xAxis.setAttribute("class", "word-cloud-scatter-axis");
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", String(margin.left));
  yAxis.setAttribute("x2", String(margin.left));
  yAxis.setAttribute("y1", String(margin.top));
  yAxis.setAttribute("y2", String(margin.top + plotHeight));
  yAxis.setAttribute("class", "word-cloud-scatter-axis");
  svg.appendChild(yAxis);

  const xTicks = [0, 0.25, 0.5, 0.75, 1];
  xTicks.forEach((tick) => {
    const value = Math.round(maxReviewCount * tick);
    const x = margin.left + tick * plotWidth;
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(x));
    label.setAttribute("y", String(margin.top + plotHeight + 22));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "word-cloud-scatter-label");
    label.textContent = fmt(value);
    svg.appendChild(label);
  });

  const xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xAxisLabel.setAttribute("x", String(margin.left + plotWidth / 2));
  xAxisLabel.setAttribute("y", String(height - 6));
  xAxisLabel.setAttribute("text-anchor", "middle");
  xAxisLabel.setAttribute("class", "word-cloud-scatter-axis-label");
  xAxisLabel.textContent = t("reviewCount");
  svg.appendChild(xAxisLabel);

  const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yAxisLabel.setAttribute("x", "16");
  yAxisLabel.setAttribute("y", String(margin.top + plotHeight / 2));
  yAxisLabel.setAttribute("text-anchor", "middle");
  yAxisLabel.setAttribute("transform", `rotate(-90 16 ${margin.top + plotHeight / 2})`);
  yAxisLabel.setAttribute("class", "word-cloud-scatter-axis-label");
  yAxisLabel.textContent = t("summaryPositiveRate");
  svg.appendChild(yAxisLabel);

  const ratesMin = Math.min(...rates);
  const ratesMax = Math.max(...rates);
  state.wordCloudTerms.forEach((entry) => {
    const x = margin.left + (entry.reviewCount / maxReviewCount) * plotWidth;
    const y = margin.top + plotHeight - ((entry.positiveRate - minRate) / rateSpan) * plotHeight;
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", String(x));
    point.setAttribute("cy", String(y));
    point.setAttribute("r", String(4 + Math.min(6, Math.log1p(entry.occurrences))));
    point.setAttribute("fill", getPositiveRateColor(entry.positiveRate, ratesMin, ratesMax));
    point.setAttribute("class", "word-cloud-scatter-point");
    point.addEventListener("mousemove", (event) => showWordCloudTooltip(event, entry));
    point.addEventListener("mouseleave", hideWordCloudTooltip);
    point.addEventListener("click", async () => {
      state.analysisTab = "reviews";
      updateWorkspaceTabs();
      els.reviewSearchInput.value = entry.term;
      els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      await runReviewSearch();
    });
    svg.appendChild(point);
  });

  wrap.appendChild(svg);
  els.wordCloudContainer.appendChild(wrap);
}

function getLanguageDisplayName(code, options = {}) {
  const { forSelect = false } = options;
  if (code === "all") return `ALL | ${t("allLanguage")}`;
  const flag = regionCodeToFlag(LANGUAGE_REGION_CODES[code]) || "";
  if (forSelect && IS_WINDOWS) {
    const region = (LANGUAGE_REGION_CODES[code] || code || "").toUpperCase();
    return `${region} | ${getLanguageName(code)}`;
  }
  return flag ? `${flag} ${getLanguageName(code)}` : `${(LANGUAGE_REGION_CODES[code] || code || "").toUpperCase()} ${getLanguageName(code)}`;
}

function getLanguageLabel(code) {
  if (code === "all") return getLanguageDisplayName(code, { forSelect: true });
  const total = state.summaryRows.reduce((sum, row) => sum + row.total_reviews, 0) || 1;
  const row = state.summaryRows.find((entry) => entry.languageCode === code);
  const portion = row ? ((row.total_reviews / total) * 100).toFixed(2) : "0.00";
  return `${getLanguageDisplayName(code, { forSelect: true })} (${portion}%)`;
}

function getLanguageDisplayName(code, options = {}) {
  const { forSelect = false } = options;
  const region = code === "all" ? "ALL" : (LANGUAGE_REGION_CODES[code] || code || "").toUpperCase();
  if (forSelect) return `${region} | ${getLanguageName(code)}`;
  return `${region} ${getLanguageName(code)}`;
}

function getLanguageDisplayMarkup(code) {
  const region = code === "all" ? "ALL" : (LANGUAGE_REGION_CODES[code] || code || "").toUpperCase();
  return `<span class="language-chip">${esc(region)}</span><span>${esc(getLanguageName(code))}</span>`;
}

function renderWordCloudScatter() {
  const width = 1200;
  const height = 520;
  const margin = { top: 20, right: 30, bottom: 56, left: 72 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const maxReviewCount = Math.max(...state.wordCloudTerms.map((entry) => entry.reviewCount), 1);
  const rates = state.wordCloudTerms.map((entry) => entry.positiveRate);
  const rawMinRate = Math.min(...rates);
  const rawMaxRate = Math.max(...rates);
  let minRate = Math.max(0, Math.floor((rawMinRate - 5) / 5) * 5);
  let maxRate = Math.min(100, Math.ceil((rawMaxRate + 5) / 5) * 5);
  if (maxRate - minRate < 10) {
    minRate = Math.max(0, minRate - 5);
    maxRate = Math.min(100, maxRate + 5);
  }
  const rateSpan = Math.max(1, maxRate - minRate);
  const targetTickCount = 5;
  const rawStep = rateSpan / Math.max(1, targetTickCount - 1);
  const niceSteps = [2, 5, 10, 20, 25];
  const tickStep = niceSteps.find((step) => rawStep <= step) || 25;
  const tickRates = [];
  for (let tick = minRate; tick <= maxRate + 0.0001; tick += tickStep) {
    tickRates.push(Math.min(maxRate, Math.round(tick)));
  }
  if (tickRates[tickRates.length - 1] !== maxRate) tickRates.push(maxRate);

  const wrap = document.createElement("div");
  wrap.className = "word-cloud-scatter";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const grid = document.createElementNS("http://www.w3.org/2000/svg", "g");
  grid.setAttribute("class", "word-cloud-scatter-grid");
  tickRates.forEach((tick) => {
    const y = margin.top + plotHeight - ((tick - minRate) / rateSpan) * plotHeight;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(margin.left));
    line.setAttribute("x2", String(margin.left + plotWidth));
    line.setAttribute("y1", String(y));
    line.setAttribute("y2", String(y));
    if (tick === minRate) line.setAttribute("class", "axis-zero");
    grid.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(margin.left - 10));
    label.setAttribute("y", String(y + 4));
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "word-cloud-scatter-label");
    label.textContent = `${tick}%`;
    svg.appendChild(label);
  });
  svg.appendChild(grid);

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", String(margin.left));
  xAxis.setAttribute("x2", String(margin.left + plotWidth));
  xAxis.setAttribute("y1", String(margin.top + plotHeight));
  xAxis.setAttribute("y2", String(margin.top + plotHeight));
  xAxis.setAttribute("class", "word-cloud-scatter-axis");
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", String(margin.left));
  yAxis.setAttribute("x2", String(margin.left));
  yAxis.setAttribute("y1", String(margin.top));
  yAxis.setAttribute("y2", String(margin.top + plotHeight));
  yAxis.setAttribute("class", "word-cloud-scatter-axis");
  svg.appendChild(yAxis);

  const xTicks = [0, 0.25, 0.5, 0.75, 1];
  xTicks.forEach((tick) => {
    const value = Math.round(maxReviewCount * tick);
    const x = margin.left + tick * plotWidth;
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(x));
    label.setAttribute("y", String(margin.top + plotHeight + 22));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "word-cloud-scatter-label");
    label.textContent = fmt(value);
    svg.appendChild(label);
  });

  const xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xAxisLabel.setAttribute("x", String(margin.left + plotWidth / 2));
  xAxisLabel.setAttribute("y", String(height - 6));
  xAxisLabel.setAttribute("text-anchor", "middle");
  xAxisLabel.setAttribute("class", "word-cloud-scatter-axis-label");
  xAxisLabel.textContent = t("reviewCount");
  svg.appendChild(xAxisLabel);

  const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yAxisLabel.setAttribute("x", "16");
  yAxisLabel.setAttribute("y", String(margin.top + plotHeight / 2));
  yAxisLabel.setAttribute("text-anchor", "middle");
  yAxisLabel.setAttribute("transform", `rotate(-90 16 ${margin.top + plotHeight / 2})`);
  yAxisLabel.setAttribute("class", "word-cloud-scatter-axis-label");
  yAxisLabel.textContent = t("summaryPositiveRate");
  svg.appendChild(yAxisLabel);

  const ratesMin = Math.min(...rates);
  const ratesMax = Math.max(...rates);
  state.wordCloudTerms.forEach((entry) => {
    const x = margin.left + (entry.reviewCount / maxReviewCount) * plotWidth;
    const y = margin.top + plotHeight - ((entry.positiveRate - minRate) / rateSpan) * plotHeight;
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", String(x));
    point.setAttribute("cy", String(y));
    point.setAttribute("r", String(4 + Math.min(6, Math.log1p(entry.occurrences))));
    point.setAttribute("fill", getPositiveRateColor(entry.positiveRate, ratesMin, ratesMax));
    point.setAttribute("class", "word-cloud-scatter-point");
    point.addEventListener("mousemove", (event) => showWordCloudTooltip(event, entry));
    point.addEventListener("mouseleave", hideWordCloudTooltip);
    point.addEventListener("click", async () => {
      state.analysisTab = "reviews";
      updateWorkspaceTabs();
      els.reviewSearchInput.value = entry.term;
      els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      await runReviewSearch();
    });
    svg.appendChild(point);
  });

  wrap.appendChild(svg);
  els.wordCloudContainer.appendChild(wrap);
}

function showTopicTooltip(event, row) {
  let tooltip = document.querySelector(".word-cloud-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "word-cloud-tooltip";
    document.body.appendChild(tooltip);
  }
  tooltip.innerHTML = `<strong>${esc(getTopicRowLabel(row))}</strong><div>${fmt(row.reviewCount)} reviews</div><div>${t(
    "positive"
  )}: ${fmt(row.positiveCount)}</div><div>${t("negative")}: ${fmt(row.negativeCount)}</div><div>${t(
    "summaryPositiveRate"
  )}: ${renderPositiveRateValue(row.positiveRate)}</div>`;
  tooltip.style.display = "block";
  tooltip.style.left = `${event.clientX + 14}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
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

  if (state.wordCloudView === "scatter") {
    renderWordCloudScatter();
  } else {
  const maxScore = state.wordCloudTerms[0]?.score || 1;
  const rates = state.wordCloudTerms.map((entry) => entry.positiveRate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  state.wordCloudTerms.forEach((entry, index) => {
    const span = document.createElement("span");
    span.className = "word-cloud-term";
    if (state.wordCloudPrefs.allowed.includes(entry.term)) {
      span.classList.add("is-allowed");
    }
    const scale = entry.score / maxScore;
    const color = getPositiveRateColor(entry.positiveRate, minRate, maxRate);
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
  }

  const topTerms = state.wordCloudTerms.slice(0, 10);
  const maxReviews = topTerms[0]?.reviewCount || 1;
  topTerms.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "chart-row";
    row.role = "button";
    row.tabIndex = 0;
    row.innerHTML = `<div class="chart-labels"><span>${esc(entry.term)}</span><span>${fmt(
      entry.reviewCount
    )}</span></div><div class="chart-meta"><span>${t("summaryPositiveRate")}: ${renderPositiveRateValue(
      entry.positiveRate
    )}</span><span>${fmt(entry.occurrences)} uses</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${(
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

function renderTopicChart(rows) {
  if (!els.topicChart) return;
  els.topicChart.innerHTML = "";
  if (!rows.length) {
    els.topicChart.innerHTML = `<div class="status-text">${esc(topicText("topicStatusEmpty"))}</div>`;
    return;
  }
  if (state.topicChartView === "line") {
    renderTopicLineChart(rows, state.topicActiveReviews);
    return;
  }
  const maxValue = Math.max(...rows.map((row) => row.reviewCount), 1);
  const wrap = document.createElement("div");
  wrap.className = "topic-bar-chart";
  rows.forEach((row) => {
    const column = document.createElement("button");
    column.type = "button";
    column.className = "topic-bar-column";
    column.innerHTML = `<span class="topic-bar" style="height:${((row.reviewCount / maxValue) * 100).toFixed(
      2
    )}%; background:${row.color}"></span><span class="topic-bar-label">${esc(getTopicRowLabel(row))}</span><span class="topic-bar-value">${fmt(
      row.reviewCount
    )} ﾂｷ ${row.mentionShare.toFixed(1)}%</span>`;
    column.addEventListener("click", () => {
      void openTopicInReviewBrowser(row.id);
    });
    column.addEventListener("mousemove", (event) => showTopicTooltip(event, row));
    column.addEventListener("mouseleave", hideWordCloudTooltip);
    wrap.appendChild(column);
  });
  els.topicChart.appendChild(wrap);
}

function getTopicTimelineSeries(reviews, buckets, rows) {
  const rowById = new Map(
    rows.map((row) => [
      row.id,
      {
        id: row.id,
        label: getTopicRowLabel(row),
        color: row.color,
        points: buckets.map((bucket) => ({
          key: bucket.key,
          startMs: bucket.startMs,
          endMs: bucket.endMs,
          label: bucket.label,
          tooltipDate: bucket.tooltipDate,
          total: 0,
          positive: 0,
          negative: 0,
          positiveRate: 0,
        })),
      },
    ])
  );

  reviews.forEach((review) => {
    const createdMs = review.timestamp_created * 1000;
    const bucketIndex = buckets.findIndex((bucket) => createdMs >= bucket.startMs && createdMs <= bucket.endMs);
    if (bucketIndex === -1) return;
    (review._topics || []).forEach((topicId) => {
      const entry = rowById.get(topicId);
      if (!entry) return;
      const point = entry.points[bucketIndex];
      point.total += 1;
      if (review.voted_up) point.positive += 1;
      else point.negative += 1;
      point.positiveRate = point.total ? (point.positive / point.total) * 100 : 0;
    });
  });

  return rows.map((row) => rowById.get(row.id)).filter(Boolean);
}

async function activateTopicBucket(bucket, topicId) {
  hideWordCloudTooltip();
  state.timeRange.mode = "custom";
  state.timeRange.start = formatDateInputValue(new Date(bucket.startMs));
  state.timeRange.end = formatDateInputValue(new Date(bucket.endMs));
  state.reviewTab = state.topicSource === "saved" ? "saved" : "browse";
  state.reviewFilters.topic = topicId;
  if (els.reviewTopicFilter) els.reviewTopicFilter.value = topicId;
  if (els.reviewLanguageSelection) els.reviewLanguageSelection.value = state.topicLanguage;
  state.analysisTab = "reviews";
  updateReviewTabUi();
  updateTimeRangeUi();
  updateWorkspaceTabs();
  await refreshScopedData();
  els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderTopicLineChart(rows, reviews) {
  if (!reviews?.length) {
    els.topicChart.innerHTML = `<div class="status-text">${esc(topicText("topicStatusEmpty"))}</div>`;
    return;
  }
  const { buckets } = buildTimelineBuckets(reviews);
  if (!buckets.length) {
    els.topicChart.innerHTML = `<div class="status-text">${esc(topicText("topicStatusEmpty"))}</div>`;
    return;
  }

  const series = getTopicTimelineSeries(reviews, buckets, rows);
  const points = series.flatMap((entry) => entry.points.map((point) => ({ ...point, keyword: entry.label })));
  const matchingPoints = points.filter((point) => point.total > 0);
  if (!matchingPoints.length) {
    els.topicChart.innerHTML = `<div class="status-text">${esc(topicText("topicStatusEmpty"))}</div>`;
    return;
  }

  const maxValue = Math.max(...matchingPoints.map((point) => point.total), 1);
  const labelStep = Math.max(1, Math.ceil(buckets.length / 10));
  const minRate = Math.min(...matchingPoints.map((point) => point.positiveRate));
  const maxRate = Math.max(...matchingPoints.map((point) => point.positiveRate));
  const plotWidth = 960;
  const plotHeight = 320;
  const leftPadding = 12;
  const rightPadding = 12;
  const topPadding = 12;
  const bottomPadding = 42;
  const usableWidth = plotWidth - leftPadding - rightPadding;
  const usableHeight = plotHeight - topPadding - bottomPadding;
  const xStep = buckets.length === 1 ? 0 : usableWidth / (buckets.length - 1);
  const svgNs = "http://www.w3.org/2000/svg";
  const shell = document.createElement("div");
  shell.className = "timeline-shell timeline-shell-keywords";
  const axis = document.createElement("div");
  axis.className = "timeline-y-axis timeline-y-axis-keywords";
  axis.innerHTML = `
    <div class="timeline-y-tick timeline-keyword-y-top">${fmt(maxValue)}</div>
    <div class="timeline-y-tick timeline-keyword-y-mid">${fmt(Math.max(1, Math.round(maxValue / 2)))}</div>
    <div class="timeline-y-tick timeline-keyword-y-bottom">0</div>
  `;
  const plot = document.createElement("div");
  plot.className = "timeline-plot timeline-plot-keywords";
  plot.innerHTML = `
    <div class="timeline-grid timeline-grid-keywords" aria-hidden="true">
      <div class="timeline-grid-line timeline-keyword-grid-top"></div>
      <div class="timeline-grid-line timeline-keyword-grid-mid"></div>
      <div class="timeline-grid-line zero timeline-keyword-grid-bottom"></div>
    </div>
  `;
  renderTimelineMarkerLines(plot, buckets[0]?.startMs, buckets[buckets.length - 1]?.endMs);
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${plotWidth} ${plotHeight}`);
  svg.setAttribute("class", "timeline-line-svg");
  const summaryList = document.createElement("div");
  summaryList.className = "timeline-keyword-summary topic-line-summary";

  series.forEach((entry) => {
    const visiblePoints = entry.points
      .map((point, pointIndex) => {
        const x = leftPadding + xStep * pointIndex;
        const y = topPadding + usableHeight - (point.total / maxValue) * usableHeight;
        return { ...point, x, y, pointIndex };
      })
      .filter((point) => point.total > 0);

    if (!visiblePoints.length) return;
    const totalPositive = entry.points.reduce((sum, point) => sum + point.positive, 0);
    const totalNegative = entry.points.reduce((sum, point) => sum + point.negative, 0);
    const totalReviews = totalPositive + totalNegative;
    const positivePortion = totalReviews ? ((totalPositive / totalReviews) * 100).toFixed(1) : "0.0";
    const negativePortion = totalReviews ? (100 - Number(positivePortion)).toFixed(1) : "0.0";

    const path = document.createElementNS(svgNs, "path");
    path.setAttribute(
      "d",
      visiblePoints
        .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
        .join(" ")
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", entry.color);
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("class", "timeline-line-path");
    svg.appendChild(path);

    visiblePoints.forEach((point) => {
      const show = (event) =>
        showTimelineTooltip(event, {
          keyword: entry.label,
          tooltipDate: point.tooltipDate,
          positive: point.positive,
          negative: point.negative,
        });

      const circle = document.createElementNS(svgNs, "circle");
      circle.setAttribute("cx", point.x.toFixed(2));
      circle.setAttribute("cy", point.y.toFixed(2));
      circle.setAttribute("r", "7");
      circle.setAttribute("fill", getPositiveRateColor(point.positiveRate, minRate, maxRate));
      circle.setAttribute("stroke", "rgba(11, 18, 25, 0.88)");
      circle.setAttribute("stroke-width", "1.5");
      circle.setAttribute("class", "timeline-line-point");
      circle.addEventListener("mousemove", show);
      circle.addEventListener("mouseleave", hideWordCloudTooltip);
      circle.addEventListener("click", () => {
        void activateTopicBucket(point, entry.id);
      });
      svg.appendChild(circle);

      const hitArea = document.createElementNS(svgNs, "circle");
      hitArea.setAttribute("cx", point.x.toFixed(2));
      hitArea.setAttribute("cy", point.y.toFixed(2));
      hitArea.setAttribute("r", "12");
      hitArea.setAttribute("fill", "transparent");
      hitArea.setAttribute("class", "timeline-line-hit");
      hitArea.addEventListener("mousemove", show);
      hitArea.addEventListener("mouseleave", hideWordCloudTooltip);
      hitArea.addEventListener("click", () => {
        void activateTopicBucket(point, entry.id);
      });
      svg.appendChild(hitArea);
    });

    const row = document.createElement("div");
    row.className = "chart-row timeline-keyword-row";
    row.innerHTML = `<div class="chart-labels"><span class="timeline-keyword-row-label"><span class="timeline-keyword-swatch" style="background:${entry.color}"></span>${esc(
      entry.label
    )}</span><span>${fmt(totalReviews)} ${esc(t("reviewCount"))}</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${positivePortion}%"></div><div class="stacked-negative" style="width:${negativePortion}%"></div></div><div class="chart-labels review-status-breakdown"><span>${esc(
      `${t("positive")} ${fmt(totalPositive)} (${positivePortion}%)`
    )}</span><span>${esc(`${t("negative")} ${fmt(totalNegative)} (${negativePortion}%)`)}</span></div>`;
    summaryList.appendChild(row);
  });

  buckets.forEach((bucket, index) => {
    if (index % labelStep !== 0 && index !== buckets.length - 1) return;
    const label = document.createElement("div");
    label.className = "timeline-line-label";
    label.textContent = bucket.label;
    label.style.left = `${((leftPadding + xStep * index) / plotWidth) * 100}%`;
    plot.appendChild(label);
  });

  plot.appendChild(svg);
  shell.appendChild(axis);
  shell.appendChild(plot);
  els.topicChart.appendChild(shell);
  if (summaryList.childElementCount) els.topicChart.appendChild(summaryList);
}

function renderTopicDetails(rows) {
  if (!els.topicDetails) return;
  els.topicDetails.innerHTML = "";
  const maxReviews = Math.max(...rows.map((row) => row.reviewCount), 1);
  rows.forEach((row) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "topic-card";
    card.style.borderColor = `${row.color}66`;
    card.style.boxShadow = `inset 0 0 0 1px ${row.color}22`;
    const positiveWidth = ((row.positiveCount / maxReviews) * 100).toFixed(2);
    const negativeWidth = ((row.negativeCount / maxReviews) * 100).toFixed(2);
    card.innerHTML = `<div class="topic-card-head"><div class="topic-card-title">${esc(
      getTopicRowLabel(row)
    )}</div><div class="topic-card-badges"><span class="topic-priority ${row.priority}">${esc(
      topicText(`topicPriority${row.priority[0].toUpperCase()}${row.priority.slice(1)}`)
    )}</span><span class="topic-trend">${esc(
      row.trend === "up" ? topicText("topicTrendUp") : row.trend === "down" ? topicText("topicTrendDown") : topicText("topicTrendFlat")
    )}</span></div></div><div class="chart-meta"><span>${topicText("topicShare")}</span><span>${fmt(
      row.reviewCount
    )} / ${fmt(row.totalReviews)} (${row.mentionShare.toFixed(
      1
    )}%)</span></div><div class="chart-meta"><span>${t("summaryPositiveRate")}: ${renderPositiveRateValue(
      row.positiveRate
    )}</span><span>${fmt(row.reviewCount)} ${t("reviewCount")}</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${positiveWidth}%"></div><div class="stacked-negative" style="width:${negativeWidth}%"></div></div><div class="chart-subtext"><span>${t("positiveCount").replace(
      "{count}",
      fmt(row.positiveCount)
    )} (${renderPositiveRateValue(row.positiveRate)})</span><span>${t("negativeCount").replace(
      "{count}",
      fmt(row.negativeCount)
    )} (${row.negativeRate.toFixed(1)}%)</span></div><div class="topic-chip-list">${row.keywords
      .map((keyword) => `<span class="topic-chip">${esc(keyword)}</span>`)
      .join("")}</div>`;
    const priority = card.querySelector(".topic-priority");
    if (priority) {
      priority.title = `${topicText(`topicPriority${row.priority[0].toUpperCase()}${row.priority.slice(1)}`)} (${row.priorityScore.toFixed(2)})`;
    }
    card.addEventListener("click", () => {
      void openTopicInReviewBrowser(row.id);
    });
    els.topicDetails.appendChild(card);
  });
}

async function renderTopicClusters() {
  if (!state.currentAppId) return;
  throwIfTaskCancelled();
  if (!els.topicStatus || !els.topicChart || !els.topicDetails) return;
  els.topicStatus.textContent = topicText("topicStatusLoading");
  els.topicChart.innerHTML = `<div class="status-text">${esc(topicText("topicStatusLoading"))}</div>`;
  els.topicDetails.innerHTML = "";
  const analysisKey = getTopicClusterAnalysisKey();
  const cached = await loadTopicClusterCache(state.currentAppId);
  const cachedRows = cached.get(analysisKey);
  if (cachedRows) {
    if (state.topicChartView === "line" && state.topicActiveReviewsKey !== analysisKey) {
      const reviews =
        state.topicSource === "saved"
          ? filterReviewsByActiveTimeRange(getSavedReviewsForCurrentApp(state.topicLanguage))
          : filterReviewsByActiveTimeRange(await collectReviews(state.topicLanguage));
      await ensureTopicTagsForReviews(reviews);
      state.topicActiveReviews = reviews;
      state.topicActiveReviewsKey = analysisKey;
    }
    state.topicRows = cachedRows;
    state.topicLastRenderKey = analysisKey;
    els.topicStatus.textContent = state.topicRows.length
      ? interp(topicText("topicStatusReady"), { topics: fmt(state.topicRows.length), reviews: fmt(state.topicRows[0]?.totalReviews || 0) })
      : topicText("topicStatusEmpty");
    renderTopicChart(state.topicRows);
    renderTopicDetails(state.topicRows);
    setFetchState("success", els.topicStatus.textContent, 100);
    return;
  }
  const reviews =
    state.topicSource === "saved"
      ? filterReviewsByActiveTimeRange(getSavedReviewsForCurrentApp(state.topicLanguage))
      : filterReviewsByActiveTimeRange(await collectReviews(state.topicLanguage));
  await ensureTopicTagsForReviews(reviews, {
    onProgress: ({ processed, total }) => {
      setFetchState("loading", `${topicText("topicStatusLoading")} ${fmt(processed)} / ${fmt(total)}`, 40 + (processed / Math.max(1, total)) * 50);
    },
  });
  state.topicRows = computeTopicRows(reviews);
  state.topicActiveReviews = reviews;
  state.topicActiveReviewsKey = analysisKey;
  cached.set(analysisKey, state.topicRows);
  await persistTopicClusterCache(state.currentAppId);
  state.topicLastRenderKey = analysisKey;
  els.topicStatus.textContent = state.topicRows.length
    ? interp(topicText("topicStatusReady"), { topics: fmt(state.topicRows.length), reviews: fmt(reviews.length) })
    : topicText("topicStatusEmpty");
  renderTopicChart(state.topicRows);
  renderTopicDetails(state.topicRows);
  setFetchState("success", els.topicStatus.textContent, 100);
}

async function openTopicInReviewBrowser(topicId) {
  state.reviewTab = state.topicSource === "saved" ? "saved" : "browse";
  state.reviewFilters.topic = topicId;
  if (els.reviewTopicFilter) els.reviewTopicFilter.value = topicId;
  if (els.reviewLanguageSelection) els.reviewLanguageSelection.value = state.topicLanguage;
  state.analysisTab = "reviews";
  updateReviewTabUi();
  updateWorkspaceTabs();
  await loadReviewTabData();
  els.reviewsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getFilteredReviews(reviews) {
  return reviews.filter((review) => {
    if (state.reviewFilters.sentiment === "positive" && !review.voted_up) return false;
    if (state.reviewFilters.sentiment === "negative" && review.voted_up) return false;
    if (state.reviewFilters.saved === "saved" && !isReviewSaved(review)) return false;
    if (state.reviewFilters.saved === "unsaved" && isReviewSaved(review)) return false;
    if (state.reviewFilters.topic !== "all" && !review._topics?.includes(state.reviewFilters.topic)) return false;

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
  const statusBarMarkup = `<div class="review-search-status-bar"><div class="review-search-status-head"><span>${t(
    "summaryPositiveRate"
  )}: ${renderPositiveRateValue(positiveRate)}</span><span>${fmt(state.reviewDisplayedReviews.length)} ${t("reviewCount")}</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${positiveRate}%"></div><div class="stacked-negative" style="width:${(
    100 - Number(positiveRate)
  ).toFixed(1)}%"></div></div><div class="review-search-status-foot"><span>${t("positive")}: ${fmt(
    positiveCount
  )}</span><span>${t("negative")}: ${fmt(negativeCount)}</span></div></div>`;

  if (state.reviewSearchStats) {
    els.searchSummary.innerHTML = `<div class="review-search-summary-row"><div class="review-search-summary-tags"><span class="search-summary-lead">${t(
      "searchSummaryLead"
    )}</span> <span class="search-summary-strong">${t("searchCount")}: ${fmt(
      state.reviewSearchStats.hitCount
    )}</span> <span class="search-summary-strong">${t("searchReviews")}: ${fmt(
      state.reviewSearchStats.matchedReviews
    )}</span> <span class="search-summary-strong">${t("searchShown")}: ${fmt(
      state.reviewDisplayedReviews.length
    )}</span></div>${statusBarMarkup}</div>`;
    return;
  }

  els.searchSummary.innerHTML = `<div class="review-search-summary-row"><div class="review-search-summary-tags"><span class="search-summary-lead">${t(
    "resultSummaryLead"
  )}</span> <span class="search-summary-strong">${t("searchShown")}: ${fmt(
    state.reviewDisplayedReviews.length
  )}</span></div>${statusBarMarkup}</div>`;
}

function applyReviewView() {
  const filtered = getFilteredReviews(state.reviewSourceReviews);
  state.reviewDisplayedReviews = getSortedReviews(filtered);
  updateReviewSummary();
  renderPaging(state.reviewDisplayedReviews.length, state.reviewSourceReviews.length);
  if (state.analysisTab === "reviews") {
    state.reviewRenderPending = false;
    renderReviews(state.reviewDisplayedReviews);
  } else {
    state.reviewRenderPending = true;
  }
}

function buildReviewCard(review) {
  const created = new Date(review.timestamp_created * 1000).toLocaleString(
    state.currentUiLanguage === "ja" ? "ja-JP" : "en-US"
  );
  const sentiment = review.voted_up ? t("positive") : t("negative");
  const saved = isReviewSaved(review);
  const safeText = esc(review.review || "");
  const highlighted = state.activeSearchRegex
    ? safeText.replace(state.activeSearchRegex, (match) => `<mark class="review-highlight">${match}</mark>`)
    : safeText;
  const topicTags = (review._topics || [])
    .map((topicId) => {
      const topic = getTopicDefinition(topicId);
      const color = topic?.color || "#66c0f4";
      return `<span class="review-topic-tag" style="border-color:${color}55; background:${color}18; color:${color}">${esc(
        getTopicLabel(topicId)
      )}</span>`;
    })
    .join("");
  const translationKey = getTranslationKey(review);
  const cachedTranslation = state.translationCache.get(translationKey);
  const translateButton = state.ai.connected
    ? `<button class="review-translate-button" type="button" data-translate-review="${esc(
        review.recommendationid
      )}" data-translate-appid="${esc(getReviewAppId(review))}">${esc(t("translateReview"))}</button>`
    : "";
  const translationMarkup = cachedTranslation
    ? `<div class="review-translation" data-translation-for="${esc(review.recommendationid)}">${esc(cachedTranslation)}</div>`
    : `<div class="review-translation hidden" data-translation-for="${esc(review.recommendationid)}"></div>`;
  const card = document.createElement("article");
  card.className = `review-card ${review.voted_up ? "positive" : "negative"}`;
  card.innerHTML = `<div class="review-banner">${esc(interp(t("reviewBy"), {
    sentiment,
  }))} <span>${esc(review.author.personaname || review.author.steamid)}</span><span class="review-topic-tags">${topicTags}</span>${translateButton}<button class="review-bookmark ${saved ? "is-saved" : ""}" type="button" data-bookmark-appid="${esc(
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
  const textNode = card.querySelector(".review-text");
  if (textNode) textNode.insertAdjacentHTML("afterend", translationMarkup);
  return card;
}

function renderReviews(reviews) {
  const token = ++state.reviewRenderToken;
  els.reviewsList.innerHTML = "";
  if (!reviews.length) {
    els.reviewsList.innerHTML = `<div class="status-text">${t("noReviews")}</div>`;
    return;
  }
  const chunkSize = 48;
  let index = 0;
  const appendChunk = () => {
    if (token !== state.reviewRenderToken) return;
    const fragment = document.createDocumentFragment();
    for (let count = 0; count < chunkSize && index < reviews.length; count += 1, index += 1) {
      fragment.appendChild(buildReviewCard(reviews[index]));
    }
    els.reviewsList.appendChild(fragment);
    if (index < reviews.length) {
      requestAnimationFrame(appendChunk);
    }
  };
  requestAnimationFrame(appendChunk);
}

function renderPaging(loaded, total) {
  els.pagingLabel.textContent = interp(t("loadedPaging"), {
    loaded: fmt(loaded),
    total: fmt(total),
  });
}

async function collectReviews(lang, force = false, options = {}) {
  const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
  throwIfTaskCancelled();
  const memoryKey = getCollectedReviewsCacheKey(lang);
  if (!force && state.collectedReviewsCache.has(memoryKey)) {
    const cached = state.collectedReviewsCache.get(memoryKey);
    if (onProgress) {
      onProgress({
        languageCode: lang,
        languageName: getLanguageName(lang),
        languageIndex: 0,
        totalLanguages: lang === "all" ? LANGUAGES.length : 1,
        pagesLoaded: 0,
        reviewsLoaded: cached.length,
        totalCollected: cached.length,
        fromMemory: true,
      });
      await yieldToUi();
    }
    return cached;
  }

  const targets = lang === "all" ? LANGUAGES.map(([, code]) => code) : [lang];
  const out = [];
  const fetchFloor = getActiveRangeFetchFloor();

  for (const [languageIndex, code] of targets.entries()) {
    throwIfTaskCancelled();
    const seen = new Set();
    let cursor = "*";
    let pagesLoaded = 0;
    let reviewsLoaded = 0;
    while (!seen.has(cursor)) {
      throwIfTaskCancelled();
      seen.add(cursor);
      const payload = await getReviews(state.currentAppId, code, cursor, force);
      const reviews = (payload.reviews || []).map((review) => ({ ...review, _appid: state.currentAppId }));
      out.push(...reviews);
      pagesLoaded += 1;
      reviewsLoaded += reviews.length;
      if (onProgress) {
        onProgress({
          languageCode: code,
          languageName: getLanguageName(code),
          languageIndex,
          totalLanguages: targets.length,
          pagesLoaded,
          reviewsLoaded,
          totalCollected: out.length,
        });
        await yieldToUi();
      }
      if (fetchFloor && reviews.length && reviews[reviews.length - 1].timestamp_created * 1000 < fetchFloor) {
        break;
      }
      if (!payload.reviews?.length || !payload.cursor) break;
      cursor = payload.cursor;
    }
  }

  if (!force) {
    state.collectedReviewsCache.set(memoryKey, out);
  }
  return out;
}

function resetReviewViewState() {
  const preservedTopic = state.reviewFilters.topic || "all";
  state.activeSearchRegex = null;
  state.reviewBaseReviews = [];
  state.reviewSourceReviews = [];
  state.reviewDisplayedReviews = [];
  state.reviewRenderPending = false;
  state.reviewRenderToken += 1;
  state.reviewSearchStats = null;
  state.reviewSort = "date";
  state.reviewFilters = { sentiment: "all", saved: "all", playtime: "all", length: "all", topic: preservedTopic };
  if (els.reviewPlaytimeFilter) els.reviewPlaytimeFilter.value = "all";
  if (els.reviewLengthFilter) els.reviewLengthFilter.value = "all";
  if (els.reviewTopicFilter) els.reviewTopicFilter.value = preservedTopic;
  updateToggleButtons(els.reviewSortToggle, state.reviewSort, "sort");
  updateToggleButtons(els.reviewSentimentToggle, state.reviewFilters.sentiment, "sentiment");
  updateToggleButtons(els.reviewSavedToggle, state.reviewFilters.saved, "savedFilter");
}

async function loadReviewTabData() {
  if (!state.currentAppId) return;

  const lang = els.reviewLanguageSelection.value;
  resetReviewViewState();
  setFetchState(
    "loading",
    interp(t("loadingLanguageReviews"), {
      language: getLanguageName(lang),
      pages: "0",
      reviews: "0",
    }),
    35
  );
  const reviews =
    state.reviewTab === "saved"
      ? filterReviewsByActiveTimeRange(getSavedReviewsForCurrentApp(lang))
      : filterReviewsByActiveTimeRange(
          await collectReviews(lang, false, {
            onProgress: ({ languageName, languageIndex, totalLanguages, pagesLoaded, reviewsLoaded }) => {
              const langShare = (languageIndex + Math.min(0.92, pagesLoaded * 0.18)) / Math.max(1, totalLanguages);
              setFetchState(
                "loading",
                interp(t("loadingLanguageReviews"), {
                  language: languageName,
                  pages: fmt(pagesLoaded),
                  reviews: fmt(reviewsLoaded),
                }),
                35 + langShare * 55
              );
            },
          })
        );
  await ensureTopicTagsForReviews(reviews);
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
  throwIfTaskCancelled();
  const lang = els.playtimeLanguageSelection.value;
  els.playtimeStatus.textContent = t("searchLoading");
  const reviews = filterReviewsByActiveTimeRange(await collectReviews(lang));
  const playtimeBuckets = getPlaytimeBuckets();
  const buckets = playtimeBuckets.map(() => ({ positive: 0, negative: 0 }));

  reviews.forEach((review) => {
    let index = playtimeBuckets.length - 1;
    for (let n = 0; n < playtimeBuckets.length; n += 1) {
      if (review.author.playtime_forever <= playtimeBuckets[n].max) {
        index = n;
        break;
      }
    }

    const bucket = buckets[index];
    if (review.voted_up) bucket.positive += 1;
    else bucket.negative += 1;
  });

  const max = Math.max(1, ...buckets.map((bucket) => bucket.positive + bucket.negative));

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
    const total = bucket.positive + bucket.negative;
    const positiveRate = total ? ((bucket.positive / total) * 100).toFixed(1) : "0.0";
    const positiveWidth = ((bucket.positive / max) * 100 || 0).toFixed(2);
    const negativeWidth = ((bucket.negative / max) * 100 || 0).toFixed(2);
    row.innerHTML = `<div class="playtime-label">${labelMarkup}</div><div class="chart-row playtime-summary"><div class="chart-meta"><span>${t(
      "summaryPositiveRate"
    )}: ${renderPositiveRateValue(positiveRate)}</span><span>${fmt(total)} ${t("reviewCount")}</span></div><div class="stacked-track"><div class="stacked-positive" style="width:${positiveWidth}%"></div><div class="stacked-negative" style="width:${negativeWidth}%"></div></div><div class="chart-subtext"><span>${t(
      "positiveCount"
    ).replace("{count}", fmt(bucket.positive))}</span><span>${t("negativeCount").replace("{count}", fmt(bucket.negative))}</span></div></div>`;
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
  throwIfTaskCancelled();
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
  setFetchState(
    "loading",
    interp(t("loadingLanguageReviews"), {
      language: getLanguageName(lang),
      pages: "0",
      reviews: "0",
    }),
    35
  );
  const reviews =
    state.reviewTab === "saved"
      ? filterReviewsByActiveTimeRange(getSavedReviewsForCurrentApp(lang))
      : filterReviewsByActiveTimeRange(
          await collectReviews(lang, false, {
            onProgress: ({ languageName, languageIndex, totalLanguages, pagesLoaded, reviewsLoaded }) => {
              const langShare = (languageIndex + Math.min(0.92, pagesLoaded * 0.18)) / Math.max(1, totalLanguages);
              setFetchState(
                "loading",
                interp(t("loadingLanguageReviews"), {
                  language: languageName,
                  pages: fmt(pagesLoaded),
                  reviews: fmt(reviewsLoaded),
                }),
                40 + langShare * 40
              );
            },
          })
        );
  setFetchState(
    "loading",
    interp(t("scanningKeywordMatches"), {
      keyword,
      reviews: fmt(reviews.length),
    }),
    88
  );
  const regex = createSearchRegex(keyword, true);
  let hitCount = 0;
  const matched = [];
  const chunkSize = 200;
  for (let index = 0; index < reviews.length; index += chunkSize) {
    throwIfTaskCancelled();
    const chunk = reviews.slice(index, index + chunkSize);
    chunk.forEach((review) => {
      const matches = review.review?.match(regex) || [];
      hitCount += matches.length;
      if (matches.length > 0) matched.push(review);
    });
    const processed = Math.min(reviews.length, index + chunk.length);
    const progress = reviews.length ? 88 + (processed / reviews.length) * 10 : 98;
    setFetchState(
      "loading",
      interp(t("scanningKeywordMatches"), {
        keyword,
        reviews: `${fmt(processed)} / ${fmt(reviews.length)}`,
      }),
      progress
    );
    if (processed < reviews.length) {
      await yieldToUi();
    }
  }

  state.activeSearchRegex = matched.length ? regex : null;
  state.reviewSearchStats = matched.length
    ? { hitCount, matchedReviews: matched.length, keyword }
    : null;
  state.reviewSourceReviews = matched;

  if (!matched.length) {
    renderReviews([]);
    renderPaging(0, reviews.length);
    els.searchSummary.textContent = t("searchNoMatch");
    setFetchState("success", t("searchNoMatch"), 100);
    return;
  }

  applyReviewView();
  setFetchState(
    "success",
    `${t("searchReviews")}: ${fmt(matched.length)} | ${t("searchCount")}: ${fmt(hitCount)}`,
    100
  );
}

async function generateWordCloud() {
  if (!state.currentAppId) return;
  throwIfTaskCancelled();
  const language = els.wordLanguageSelection.value || "all";
  els.wordCloudStatus.textContent = t("wordCloudLoading");
  els.wordCloudContainer.innerHTML = `<div class="word-cloud-empty">${esc(t("wordCloudLoading"))}</div>`;
  const reviews =
    state.wordCloudSentiment === "saved"
      ? filterReviewsByActiveTimeRange(getSavedReviewsForCurrentApp(language))
      : filterReviewsByActiveTimeRange(await collectReviews(language));
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

let wordCloudGenerationTimer = null;

function queueWordCloudGeneration(delay = 120) {
  if (!state.currentAppId) return;
  if (wordCloudGenerationTimer) clearTimeout(wordCloudGenerationTimer);
  wordCloudGenerationTimer = setTimeout(() => {
    wordCloudGenerationTimer = null;
    void runDataTask(t("wordCloudLoading"), () => generateWordCloud());
  }, delay);
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
  queueWordCloudGeneration();
}

async function removeWordPreference(kind, term) {
  if (kind === "allowed") state.wordCloudPrefs.allowed = state.wordCloudPrefs.allowed.filter((item) => item !== term);
  if (kind === "banned") state.wordCloudPrefs.banned = state.wordCloudPrefs.banned.filter((item) => item !== term);
  renderWordPreferenceList();
  await persistWordCloudPrefs();
  queueWordCloudGeneration();
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

function formatTopicMatches(review) {
  return Object.entries(review._topicMatches || {})
    .map(([topicId, matches]) => `${getTopicLabel(topicId)}:${(matches || []).join("/")}`)
    .join(" | ");
}

function getPrimaryTopicLabel(review) {
  return review._primaryTopic ? getTopicLabel(review._primaryTopic) : "";
}

function getTopicLabels(review) {
  return (review._topics || []).map((topicId) => getTopicLabel(topicId)).join("|");
}

function createCsvRow(review, includeSavedAt = false) {
  return [
    getReviewAppId(review),
    review.timestamp_created,
    ...(includeSavedAt ? [review.savedAt || ""] : []),
    review.author.personaname || review.author.steamid,
    review.language,
    review.author.playtime_forever,
    review.recommendationid,
    review.steam_purchase,
    review.voted_up,
    `"${getTopicLabels(review).replaceAll('"', '""')}"`,
    `"${getPrimaryTopicLabel(review).replaceAll('"', '""')}"`,
    `"${formatTopicMatches(review).replaceAll('"', '""')}"`,
    `"${String(review.review || "").replaceAll('"', '""')}"`,
  ].join(",");
}

async function downloadSavedReviewsCsv() {
  await ensureTopicTagsForReviews(state.reviewDisplayedReviews);
  const rows = [
    ["AppID", "Timestamp Created", "Saved At", "UserAlias", "Language", "PlayTimeTotal", "ReviewID", "Purchase", "Recommended", "Topics", "PrimaryTopic", "TopicMatches", "ReviewText"].join(","),
  ];
  for (let index = 0; index < state.reviewDisplayedReviews.length; index += 1) {
    throwIfTaskCancelled();
    rows.push(createCsvRow(state.reviewDisplayedReviews[index], true));
    if ((index + 1) % 200 === 0) await yieldToUi();
  }

  const blob = new Blob([`\uFEFF${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.currentAppId || "saved"}-saved-reviews.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function downloadAllReviewsCsv() {
  if (!state.currentAppId) return;
  throwIfTaskCancelled();
  const reviewsByKey = new Map();
  [...state.reviewCache.entries()].forEach(([key, payload]) => {
    if (!key.startsWith(`${state.currentAppId}::`)) return;
    (payload.reviews || []).forEach((review) => {
      const normalized = { ...review, _appid: state.currentAppId };
      reviewsByKey.set(getSavedReviewKey(normalized), normalized);
    });
  });
  const reviews = [...reviewsByKey.values()];
  await ensureTopicTagsForReviews(reviews);
  const rows = [
    ["AppID", "Timestamp Created", "UserAlias", "Language", "PlayTimeTotal", "ReviewID", "Purchase", "Recommended", "Topics", "PrimaryTopic", "TopicMatches", "ReviewText"].join(","),
  ];
  for (let index = 0; index < reviews.length; index += 1) {
    throwIfTaskCancelled();
    rows.push(createCsvRow(reviews[index]));
    if ((index + 1) % 200 === 0) await yieldToUi();
  }

  const blob = new Blob([`\uFEFF${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.currentAppId}-reviews.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function findReviewByIdentity(appid, recommendationid) {
  const key = `${appid}::${recommendationid}`;
  return (
    state.reviewDisplayedReviews.find((review) => getSavedReviewKey(review) === key) ||
    state.reviewSourceReviews.find((review) => getSavedReviewKey(review) === key) ||
    state.reviewBaseReviews.find((review) => getSavedReviewKey(review) === key) ||
    state.savedReviews.find((review) => getSavedReviewKey(review) === key)
  );
}

async function connectAiModel() {
  if (!API_BASE) {
    updateAiUi(t("noProxyConfigured"));
    return;
  }
  state.ai.baseUrl = els.aiBaseUrlInput.value.trim() || "https://generativelanguage.googleapis.com/v1beta";
  state.ai.model = els.aiModelSelect.value || state.ai.models[0]?.name || "";
  state.ai.apiKey = els.aiApiKeyInput.value.trim();
  state.ai.connected = false;
  state.aiAssistant.connecting = true;
  refreshAiAssistantSprite();
  els.aiConnectionStatus.textContent = t("aiTesting");

  try {
    await postJson(`${API_BASE}/translate`, {
      apiKey: state.ai.apiKey,
      baseUrl: state.ai.baseUrl,
      model: state.ai.model,
      targetLanguage: getTargetTranslationLanguage(),
      text: "Connection test.",
    });
    state.ai.connected = true;
    state.aiAssistant.connecting = false;
    await persistAiSettings();
    setAiAssistantTemporaryMode("hello");
    updateAiUi(t("aiConnected"));
    if (state.analysisTab === "reviews") renderReviews(state.reviewDisplayedReviews);
  } catch (error) {
    state.ai.connected = false;
    state.aiAssistant.connecting = false;
    updateAiUi(`${t("aiConnectFailed")} ${error.message}`);
  }
}

async function loadGeminiModels() {
  if (!API_BASE) return;
  state.ai.baseUrl = els.aiBaseUrlInput.value.trim() || "https://generativelanguage.googleapis.com/v1beta";
  state.ai.apiKey = els.aiApiKeyInput.value.trim();
  if (!state.ai.apiKey) return;
  state.ai.connected = false;
  state.aiAssistant.connecting = true;
  refreshAiAssistantSprite();
  els.aiConnectionStatus.textContent = t("aiLoadModels");
  try {
    const payload = await fetchJson(
      `${API_BASE}/ai/models?${new URLSearchParams({
        apiKey: state.ai.apiKey,
        baseUrl: state.ai.baseUrl,
      })}`
    );
    state.ai.models = payload.models || [];
    state.ai.model = state.ai.models.find((model) => model.name === state.ai.model)?.name || state.ai.models[0]?.name || "";
    renderAiModelOptions();
    await persistAiSettings();
    state.aiAssistant.connecting = false;
    updateAiUi(interp(t("aiModelsLoaded"), { count: fmt(state.ai.models.length) }));
  } catch (error) {
    state.ai.models = [];
    renderAiModelOptions();
    state.aiAssistant.connecting = false;
    updateAiUi(`${t("aiModelsFailed")} ${error.message}`);
  }
}

async function translateReview(appid, recommendationid, button) {
  const review = findReviewByIdentity(appid, recommendationid);
  if (!review || !state.ai.connected) return;
  const key = getTranslationKey(review);
  const target = getTargetTranslationLanguage();
  const container = button.closest(".review-card")?.querySelector(".review-translation");

  if (state.translationCache.has(key)) {
    if (container) {
      container.textContent = state.translationCache.get(key);
      container.classList.remove("hidden");
    }
    return;
  }

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = t("translatingReview");
  try {
    const payload = await postJson(`${API_BASE}/translate`, {
      apiKey: state.ai.apiKey,
      baseUrl: state.ai.baseUrl,
      model: state.ai.model,
      targetLanguage: target,
      text: review.review || "",
    });
    const translation = payload.translation || "";
    state.translationCache.set(key, translation);
    await persistTranslationCache();
    if (container) {
      container.textContent = translation;
      container.classList.remove("hidden");
    }
  } catch (error) {
    if (container) {
      container.textContent = `${t("translationFailed")} ${error.message}`;
      container.classList.remove("hidden");
    }
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function commitPlaytimeEdit(index, rawValue) {
  const parsed = parseDurationInput(rawValue);
  state.playtimeEditingIndex = null;
  if (parsed) {
    state.playtimeCutoffs[index] = parsed;
    state.playtimeCutoffs.sort((a, b) => a - b);
  }
  await runDataTask(t("searchLoading"), () => loadPlaytime());
}

async function refreshScopedData() {
  if (!state.currentAppId) return;

  throwIfTaskCancelled();
  setFetchState("loading", t("searchLoading"), 30);
  await loadTimelineMarkersFromCache(state.currentAppId);
  const allReviews = filterReviewsByActiveTimeRange(await collectReviews("all"));
  state.summaryRows = buildSummaryRowsFromReviews(allReviews);
  renderReviewStatusBar(allReviews);
  renderTimelineChart(allReviews);
  renderDistributionChart(state.summaryRows);
  populateLanguageSelect(els.reviewLanguageSelection);
  populateLanguageSelect(els.playtimeLanguageSelection);
  populateLanguageSelect(els.wordLanguageSelection);
  populateLanguageSelect(els.topicLanguageSelection);
  state.reviewBaseReviews = allReviews;
  state.reviewSourceReviews = allReviews;
  els.reviewTitle.textContent = `${getLanguageName("all")} ${t("selectedReviews")}`;
  applyReviewView();
  els.statusText.textContent = interp(t("loadedTotalReviews"), { count: fmt(allReviews.length) });
  setFetchState("success", `${interp(t("loadedTotalReviews"), { count: fmt(allReviews.length) })} ${t("usingCache")}`, 100);
  await warmUpAnalysisPanels();
}

async function warmUpAnalysisPanels() {
  if (!state.currentAppId) return;
  const appid = state.currentAppId;
  await yieldToUi();
  const tasks = [
    generateWordCloud(),
    loadPlaytime(),
    ensureTopicTagsForReviews(state.reviewBaseReviews).then(() => {
      if (state.currentAppId !== appid || state.analysisTab !== "reviews") return;
      renderReviews(state.reviewDisplayedReviews);
    }),
  ];
  if (state.analysisTab === "topics") tasks.push(renderTopicClusters());
  await Promise.allSettled(tasks);
  throwIfTaskCancelled();
}

async function rerenderTimelineFromCache() {
  if (!state.currentAppId) return;
  await loadTimelineMarkersFromCache(state.currentAppId);
  const reviews = filterReviewsByActiveTimeRange(await collectReviews("all"));
  renderTimelineChart(reviews);
}

function updateFetchControlsPin() {
  return;
}

async function refreshCurrentCache() {
  if (!state.currentAppId) return;

  await deletePrefix(`appdetails::${state.currentAppId}`);
  await deletePrefix(`groupdetails::${state.currentAppId}`);
  await deletePrefix(`reviews::${state.currentAppId}::`);
  await deletePrefix(`topictags::${state.currentAppId}::`);
  await deletePrefix(`topicclusters::${state.currentAppId}::`);

  state.appDetails.delete(state.currentAppId);
  state.groupDetails.delete(state.currentAppId);
  state.collectedReviewsCache.clear();
  state.topicTagCacheAppId = null;
  state.topicTagCache = new Map();
  state.topicClusterCacheAppId = null;
  state.topicClusterCache = new Map();
  state.topicLastRenderKey = "";
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
    throwIfTaskCancelled();

      state.currentAppId = appid;
      state.aiAnalysisMessages = [];
      state.collectedReviewsCache.clear();
    state.reviewFilters.topic = "all";
    state.topicLanguage = "all";
    state.topicSource = "all";
    state.topicLastRenderKey = "";
    setFetchState("loading", t("loadingAppDetails"), 8);
    const [details, group] = await Promise.all([getAppDetails(appid, force), getGroupDetails(appid, force)]);
    if (!details[appid]?.success) throw new Error(t("appNotFound"));
    const appData = details[appid]?.data;

    renderHero(appid, details, group);
    await rememberRecentApp(appid, appData);

    const rows = [];
    for (const [name, code] of LANGUAGES) {
      const payload = await getReviews(appid, code, "*", force);
      rows.push({
        languageName: name,
        languageCode: code,
        total_reviews: payload.query_summary.total_reviews || 0,
        total_positive: payload.query_summary.total_positive || 0,
        total_negative: payload.query_summary.total_negative || 0,
        review_score_desc: getReviewScoreDesc(
          payload.query_summary.total_reviews || 0,
          payload.query_summary.total_positive || 0
        ),
      });

      const message = interp(t("loadedLanguages"), { loaded: rows.length, total: LANGUAGES.length });
      els.statusText.textContent = message;
      setFetchState("loading", message, 18 + (rows.length / LANGUAGES.length) * 72);
    }

    rows.sort((left, right) => right.total_reviews - left.total_reviews);
    state.summaryRows = rows;
    state.wordCloudTerms = [];
    populateLanguageSelect(els.reviewLanguageSelection);
    populateLanguageSelect(els.playtimeLanguageSelection);
    populateLanguageSelect(els.wordLanguageSelection);
    els.workspaceSection.classList.remove("hidden");
    await refreshScopedData();
  } catch (error) {
    if (isAbortError(error)) throw error;
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
    const resolved = await runDataTask(t("resolvingGame"), () => resolveAppInput(input));
    if (!resolved?.appid) return;
    if (resolved.name) {
      els.appidInput.value = resolved.name;
      els.statusText.textContent = interp(t("resolvedGame"), resolved);
    }
    await runDataTask(t("loadingAppDetails"), () => loadSummary(resolved.appid));
  } catch (error) {
    els.statusText.textContent = error.message;
    setFetchState("error", error.message, 100);
  } finally {
    els.fetchButton.disabled = false;
  }
});

if (els.recentAppsList) {
  els.recentAppsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-recent-appid]");
    if (!button) return;
    const appid = button.dataset.recentAppid;
    const recent = state.recentApps.find((entry) => entry.appid === appid);
    if (!appid) return;
    if (recent?.name) els.appidInput.value = recent.name;
    void runDataTask(t("loadingAppDetails"), () => loadSummary(appid));
  });
}

els.refreshCacheButton.addEventListener("click", () => {
  void runDataTask(t("loadingAppDetails"), () => refreshCurrentCache());
});

els.downloadCsvButton.addEventListener("click", () => {
  void runDataTask(t("downloadCsv"), () => downloadAllReviewsCsv());
});

els.loadingCancelButton?.addEventListener("click", () => {
  cancelActiveTask();
});

els.aiSettingsButton.addEventListener("click", () => {
  setAiAssistantTemporaryMode("exclamation");
  toggleAiSettingsPanel();
});

els.aiConnectButton.addEventListener("click", () => {
  void connectAiModel();
});

if (els.aiAnalysisForm) {
  els.aiAnalysisForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitAiAnalysis();
  });
}
els.aiAnalysisSendButton?.addEventListener("click", () => {
  void submitAiAnalysis();
});
if (els.aiAnalysisMessages) {
  els.aiAnalysisMessages.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ai-expand]");
    if (!button) return;
    const index = Number(button.dataset.aiExpand);
    if (!Number.isInteger(index) || !state.aiAnalysisMessages[index]) return;
    state.aiAnalysisMessages[index].expanded = !state.aiAnalysisMessages[index].expanded;
    renderAiAnalysisMessages();
  });
}
if (els.aiAnalysisTemplates) {
  els.aiAnalysisTemplates.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ai-template]");
    if (!button || !els.aiAnalysisInput) return;
    const templateMap = {
      pillar: t("aiTemplatePillar"),
      feature: t("aiTemplateFeature"),
      trend: t("aiTemplateTrend"),
      sales: t("aiTemplateSales"),
    };
    els.aiAnalysisInput.value = templateMap[button.dataset.aiTemplate] || "";
    els.aiAnalysisInput.focus();
  });
}

document.addEventListener("click", (event) => {
  if (!els.aiAssistantAnchor) return;
  if (els.aiAssistantAnchor.contains(event.target)) return;
  toggleAiSettingsPanel(false);
});

els.aiApiKeyInput.addEventListener("change", () => {
  state.ai.apiKey = els.aiApiKeyInput.value.trim();
  void persistAiSettings();
  void loadGeminiModels();
});

els.aiApiKeyInput.addEventListener("blur", () => {
  state.ai.apiKey = els.aiApiKeyInput.value.trim();
  void persistAiSettings();
  void loadGeminiModels();
});

els.aiModelSelect.addEventListener("change", () => {
  state.ai.model = els.aiModelSelect.value;
  state.ai.connected = false;
  updateAiUi();
  void persistAiSettings();
});

els.uiLanguageToggle.addEventListener("click", () => {
  state.currentUiLanguage = state.currentUiLanguage === "ja" ? "en" : "ja";
  applyTranslations();
});

if (els.positiveRateColorToggle) {
  els.positiveRateColorToggle.addEventListener("click", async () => {
    state.showPositiveRateColors = !state.showPositiveRateColors;
    await persistUiSettings();
    applyTranslations();
    if (state.reviewBaseReviews.length) renderReviewStatusBar(state.reviewBaseReviews);
    if (state.summaryRows.length) renderDistributionChart(state.summaryRows);
    updateReviewSummary();
    renderWordCloud();
    if (state.topicRows.length) {
      renderTopicChart(state.topicRows);
      renderTopicDetails(state.topicRows);
    }
    if (els.playtimeChart.childElementCount) void runDataTask(t("searchLoading"), () => loadPlaytime());
  });
}

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

els.timelineModeToggle.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-timeline-mode]");
  if (!button || state.timelineMode === button.dataset.timelineMode) return;
  state.timelineMode = button.dataset.timelineMode;
  updateTimelineUi();
  await runDataTask(t("searchLoading"), () => rerenderTimelineFromCache());
});

els.timelineKeywordAddButton.addEventListener("click", () => {
  void runDataTask(t("searchLoading"), () => addTimelineKeyword());
});

els.timelineKeywordButton.addEventListener("click", async () => {
  state.timelineMode = "keywords";
  const terms = parseTimelineKeywordInput(els.timelineKeywordInput.value);
  if (terms.length) {
    state.timelineKeywords = [...new Set([...state.timelineKeywords, ...terms])].slice(0, 6);
    els.timelineKeywordInput.value = "";
    await persistTimelineKeywords();
  }
  updateTimelineUi();
  await runDataTask(t("searchLoading"), () => rerenderTimelineFromCache());
});

els.timelineKeywordInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  await runDataTask(t("searchLoading"), () => addTimelineKeyword());
});

els.timelineKeywordList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-timeline-keyword-remove]");
  if (!button) return;
  void removeTimelineKeyword(button.dataset.timelineKeywordRemove);
});

if (els.timelineMarkers) {
  els.timelineMarkers.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-timeline-marker]");
    if (!button) return;
    void removeTimelineMarker(button.dataset.removeTimelineMarker);
  });
  els.timelineMarkers.addEventListener("change", (event) => {
    const nameInput = event.target.closest("[data-timeline-marker-name]");
    if (nameInput) {
      const marker = state.timelineMarkers.find((entry) => entry.id === nameInput.dataset.timelineMarkerName);
      const label = String(nameInput.value || "").trim() || formatTimelineMarkerDate(marker?.dateMs || Date.now());
      void updateTimelineMarker(nameInput.dataset.timelineMarkerName, { label });
      return;
    }
    const dateInput = event.target.closest("[data-timeline-marker-date]");
    if (dateInput && dateInput.value) {
      const dateMs = new Date(`${dateInput.value}T00:00:00`).getTime();
      if (Number.isFinite(dateMs)) {
        void updateTimelineMarker(dateInput.dataset.timelineMarkerDate, { dateMs });
      }
    }
  });
}

window.addEventListener("scroll", updateFetchControlsPin, { passive: true });
window.addEventListener("resize", updateFetchControlsPin);

els.timeRangeToggle.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-time-range]");
  if (!button) return;
  state.timeRange.mode = button.dataset.timeRange;
  if (state.timeRange.mode !== "custom") {
    updateTimeRangeUi();
    if (state.currentAppId) await runDataTask(t("searchLoading"), () => refreshScopedData());
    return;
  }
  updateTimeRangeUi();
});

els.applyCustomRangeButton.addEventListener("click", async () => {
  const start = els.timeRangeStart.value;
  const end = els.timeRangeEnd.value;
  if (!start || !end) return;
  if (end < start) {
    setFetchState("error", t("invalidDateRange"), 100);
    return;
  }
  state.timeRange.mode = "custom";
  state.timeRange.start = start;
  state.timeRange.end = end;
  updateTimeRangeUi();
  if (state.currentAppId) await runDataTask(t("searchLoading"), () => refreshScopedData());
});

els.chartTypeToggle.addEventListener("click", () => {
  state.chartType = state.chartType === "bar" ? "pie" : "bar";
  applyTranslations();
  renderDistributionChart(state.summaryRows);
});

els.wordSentimentToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-word-sentiment]");
  if (!button || state.wordCloudSentiment === button.dataset.wordSentiment) return;
  state.wordCloudSentiment = button.dataset.wordSentiment;
  updateToggleButtons(els.wordSentimentToggle, state.wordCloudSentiment, "wordSentiment");
  queueWordCloudGeneration();
});

els.wordLanguageSelection.addEventListener("change", () => {
  queueWordCloudGeneration();
});

if (els.wordViewToggle) {
  els.wordViewToggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-word-view]");
    if (!button) return;
    state.wordCloudView = button.dataset.wordView;
    updateToggleButtons(els.wordViewToggle, state.wordCloudView, "wordView");
    renderWordCloud();
  });
}

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
  await runDataTask(t("searchLoading"), () => loadReviewTabData());
});

els.reviewLanguageSelection.addEventListener("change", () => {
  void runDataTask(t("searchLoading"), () => loadReviewBrowserForLanguage());
});
if (els.topicLanguageSelection) {
  els.topicLanguageSelection.addEventListener("change", async () => {
    state.topicLanguage = els.topicLanguageSelection.value || "all";
    await runDataTask(topicText("topicStatusLoading"), () => renderTopicClusters());
  });
}
if (els.topicSourceToggle) {
  els.topicSourceToggle.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-topic-source]");
    if (!button || state.topicSource === button.dataset.topicSource) return;
    state.topicSource = button.dataset.topicSource;
    updateTopicUi();
    await runDataTask(topicText("topicStatusLoading"), () => renderTopicClusters());
  });
}
if (els.topicChartViewToggle) {
  els.topicChartViewToggle.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-topic-chart-view]");
    if (!button || state.topicChartView === button.dataset.topicChartView) return;
    state.topicChartView = button.dataset.topicChartView;
    updateTopicUi();
    if (state.currentAppId && state.analysisTab === "topics") {
      await runDataTask(topicText("topicStatusLoading"), () => renderTopicClusters());
    }
  });
}
els.reviewSearchButton.addEventListener("click", () => {
  void runDataTask(t("searchLoading"), () => runReviewSearch());
});
els.playtimeLoadButton.addEventListener("click", () => {
  void runDataTask(t("searchLoading"), () => loadPlaytime());
});
els.savedReviewsDownloadButton.addEventListener("click", () => {
  void runDataTask(t("downloadSavedCsv"), () => downloadSavedReviewsCsv());
});
els.savedReviewsClearButton.addEventListener("click", unsaveDisplayedSavedReviews);

els.reviewsList.addEventListener("click", async (event) => {
  const translateButton = event.target.closest("[data-translate-review]");
  if (translateButton) {
    await translateReview(translateButton.dataset.translateAppid, translateButton.dataset.translateReview, translateButton);
    return;
  }
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
if (els.reviewTopicFilter) {
  els.reviewTopicFilter.addEventListener("change", () => {
    state.reviewFilters.topic = els.reviewTopicFilter.value;
    applyReviewView();
  });
}

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
  void runDataTask(t("searchLoading"), () => loadPlaytime());
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
    void runDataTask(t("searchLoading"), () => loadPlaytime());
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

Promise.all([
  loadSavedReviewsFromCache(),
  loadWordCloudPrefsFromCache(),
  loadTimelineKeywordsFromCache(),
  loadAiSettingsFromCache(),
  loadUiSettingsFromCache(),
  loadRecentAppsFromCache(),
]).finally(() => {
  const now = new Date();
  const monthAgo = new Date(now.getTime() - 30 * DAY_MS);
  state.timeRange.start = formatDateInputValue(monthAgo);
  state.timeRange.end = formatDateInputValue(now);
  els.timeRangeStart.value = state.timeRange.start;
  els.timeRangeEnd.value = state.timeRange.end;
  applyTranslations();
  updateCacheTimestamp(null);
  setFetchState("idle", t("fetchIdleBody"), 0);
  if (!API_BASE) {
    els.deploymentNote.classList.remove("hidden");
    els.deploymentNote.innerHTML = t("proxyRequired");
  }
  renderRecentApps();
  updateAiUi();
  updateFetchControlsPin();
});



