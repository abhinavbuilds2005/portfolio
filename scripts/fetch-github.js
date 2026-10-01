import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_FILE = path.resolve(__dirname, '../src/data/build-metadata.json');
const CACHE_FILE = path.resolve(__dirname, '../src/data/github-cached.json');

// Get git commit info at build time
function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return { commitHash, branch };
  } catch (err) {
    return { commitHash: '3782bd7', branch: 'main' };
  }
}

const gitInfo = getGitInfo();
const now = new Date();
const formattedDate = now.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const DEFAULT_DATA = {
  username: "abhinavbuilds2005",
  publicRepos: 6,
  totalStars: 4,
  primaryLanguages: ["Python", "C++", "TypeScript", "SQL"],
  status: "verified",
  commitHash: gitInfo.commitHash,
  branch: gitInfo.branch,
  lastUpdated: formattedDate,
  updatedAt: now.toISOString()
};

async function fetchGitHubData() {
  let finalData = { ...DEFAULT_DATA };
  try {
    const res = await fetch('https://api.github.com/users/abhinavbuilds2005', {
      headers: { 'User-Agent': 'node-build-script' }
    });
    if (res.ok) {
      const user = await res.json();
      finalData = {
        ...finalData,
        username: user.login || "abhinavbuilds2005",
        publicRepos: user.public_repos || 6,
        followers: user.followers || 0,
        status: "synced_from_github",
      };
      console.log(`[Build] Successfully synced GitHub metadata. Commit: ${gitInfo.commitHash}`);
    } else {
      console.warn(`[Build] GitHub API responded ${res.status}. Using build-time defaults.`);
    }
  } catch (err) {
    console.warn("[Build] GitHub API unreachable. Using fallback metadata:", err.message);
  }

  writeOutput(finalData);
}

function writeOutput(data) {
  const dir = path.dirname(METADATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

await fetchGitHubData();
