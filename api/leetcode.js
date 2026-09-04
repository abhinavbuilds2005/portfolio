/**
 * Universal Serverless Proxy for LeetCode Stats
 * Supports:
 * - Vercel Serverless Functions: export default / module.exports = async (req, res) => ...
 * - Netlify Functions: exports.handler = async (event, context) => ...
 * - Cloudflare Workers / Fetch: export default { fetch(req) { ... } }
 */

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";
const DEFAULT_USERNAME = "cseabhinav2005";

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentAcSubmissionList(username: $username, limit: 10) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

async function fetchLeetCodeStats(username = DEFAULT_USERNAME) {
  const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": `https://leetcode.com/${username}/`
    },
    body: JSON.stringify({
      query: LEETCODE_QUERY,
      variables: { username }
    })
  });

  if (!response.ok) {
    throw new Error(`LeetCode GraphQL gateway responded with ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`LeetCode GraphQL error: ${json.errors[0]?.message || "Unknown error"}`);
  }

  const user = json.data?.matchedUser;
  if (!user) {
    throw new Error(`User "${username}" not found on LeetCode.`);
  }

  const acList = user.submitStatsGlobal?.acSubmissionNum || [];
  const qList = json.data?.allQuestionsCount || [];

  const getAc = (diff) => acList.find(x => x.difficulty.toLowerCase() === diff.toLowerCase())?.count || 0;
  const getQ = (diff) => qList.find(x => x.difficulty.toLowerCase() === diff.toLowerCase())?.count || 0;

  return {
    username: user.username,
    totalSolved: getAc("All"),
    totalQuestions: getQ("All"),
    easySolved: getAc("Easy"),
    totalEasy: getQ("Easy"),
    mediumSolved: getAc("Medium"),
    totalMedium: getQ("Medium"),
    hardSolved: getAc("Hard"),
    totalHard: getQ("Hard"),
    ranking: user.profile?.ranking || "5,000,001+",
    contributionPoint: 0,
    contributionPoints: 0,
    reputation: user.profile?.reputation || 0,
    recentSubmissions: (json.data?.recentAcSubmissionList || []).map(s => ({
      id: s.id,
      title: s.title,
      titleSlug: s.titleSlug,
      timestamp: s.timestamp,
      lang: "C++",
      statusDisplay: "Accepted"
    })),
    syncedAt: new Date().toISOString()
  };
}

// Common headers for CORS and caching (5 minutes edge cache, 10 minutes stale-while-revalidate)
const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
};

// 1. Netlify Function handler
async function netlifyHandler(event, context) {
  if (event && event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: HEADERS,
      body: ""
    };
  }

  const username = (event && event.queryStringParameters && event.queryStringParameters.username) || DEFAULT_USERNAME;

  try {
    const data = await fetchLeetCodeStats(username);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: HEADERS,
      body: JSON.stringify({ error: error.message || "Failed to fetch from LeetCode" })
    };
  }
}

// 2. Vercel Serverless Function handler
async function vercelHandler(req, res) {
  // If invoked in Netlify environment where res is not passed
  if (!res || typeof res.status !== "function") {
    return netlifyHandler(req, null);
  }

  // Handle CORS Preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const username = (req.query && req.query.username) || DEFAULT_USERNAME;

  try {
    const data = await fetchLeetCodeStats(username);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: error.message || "Failed to fetch from LeetCode" });
  }
}

// Universal export
vercelHandler.handler = netlifyHandler;
vercelHandler.fetchLeetCodeStats = fetchLeetCodeStats;
module.exports = vercelHandler;
