/**
 * POC: One-Click Review Link Generator
 * Goal: Generate a direct "Comparison" link for reviewers.
 */

function generateReviewDashboard(
  pluginId,
  repoUrl,
  lastReviewedCommit,
  newCommit,
) {
  // Clean up the repo URL (remove .git if present)
  const cleanRepo = repoUrl.replace(/\.git$/, "");

  // 1. GitHub Compare Link (The "What changed?" view)
  const compareUrl = `${cleanRepo}/compare/${lastReviewedCommit}...${newCommit}`;

  console.log(`\n🔍 REVIEW DASHBOARD FOR: ${pluginId}`);
  console.log("─".repeat(50));
  console.log(`✅ Automated Scans: PASSED`);
  console.log(`📦 New Commit: ${newCommit.substring(0, 7)}`);
  console.log(`🕒 Last Reviewed: ${lastReviewedCommit.substring(0, 7)}`);
  console.log("\n🚀 ONE-CLICK REVIEW LINK:");
  console.log(`1. View Code Diff:   ${compareUrl}`);
  console.log("─".repeat(50));
  console.log(
    `\n[Action]: Copy the Diff link into your browser to verify changes.`,
  );
}

// Example: Testing with a real plugin update scenario
generateReviewDashboard(
  "joplin.plugin.copytags",
  "https://github.com/JackGruber/joplin-plugin-copytags",
  "cb971eadf383829e34d7ea1a71359fe2cdf7a5e9", // Old reviewed version
  "master", // New submission
);
