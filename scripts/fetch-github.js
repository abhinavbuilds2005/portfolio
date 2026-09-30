import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.resolve(__dirname, '../src/data/github-cached.json');

const DEFAULT_DATA = {
  username: "abhinavbuilds2005",
  publicRepos: 7,
  totalStars: 4,
  primaryLanguages: ["Python", "C++", "TypeScript", "SQL"],
  status: "synced_at_build",
  updatedAt: new Date().toISOString()
};

async function fetchGitHubData() {
  try {
    const res = await fetch('https://api.github.com/users/abhinavbuilds2005');
    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}. Using cached/fallback data.`);
      return writeData(DEFAULT_DATA);
    }
    const user = await res.json();
    const data = {
      username: user.login || "abhinavbuilds2005",
      publicRepos: user.public_repos || 7,
      followers: user.followers || 0,
      totalStars: 4,
      primaryLanguages: ["Python", "C++", "TypeScript", "SQL"],
      status: "live_build_sync",
      updatedAt: new Date().toISOString()
    };
    writeData(data);
    console.log("Successfully fetched and cached GitHub telemetry at build time.");
  } catch (err) {
    console.warn("Could not reach GitHub API. Writing fallback cached data:", err.message);
    writeData(DEFAULT_DATA);
  }
}

function writeData(data) {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

fetchGitHubData();
