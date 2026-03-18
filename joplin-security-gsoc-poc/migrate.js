const fs = require("fs");
const path = require("path");

// Read the real manifests.json from joplin/plugins repo
const manifestsPath = path.resolve("../joplin-plugins-repo/manifests.json");
const manifests = JSON.parse(fs.readFileSync(manifestsPath, "utf8"));

console.log(`Total plugins found: ${Object.keys(manifests).length}`);
console.log("\nBEFORE migration — sample plugin:");
const firstPlugin = Object.keys(manifests)[0];
console.log(JSON.stringify(manifests[firstPlugin], null, 2));

// Migration: add _reviewed, _github_repo, _review_date to all plugins
let migratedCount = 0;
for (const pluginId of Object.keys(manifests)) {
  manifests[pluginId]._reviewed = "unreviewed";
  manifests[pluginId]._review_date = null;
  if (!manifests[pluginId]._github_repo) {
    manifests[pluginId]._github_repo =
      manifests[pluginId].repository_url || null;
  }
  migratedCount++;
}

console.log("\nAFTER migration — same plugin:");
console.log(JSON.stringify(manifests[firstPlugin], null, 2));
console.log(
  `\nMigration complete. ${migratedCount} plugins migrated to "_reviewed": "unreviewed"`,
);

// Save the migrated manifests
const outputPath = path.resolve("./manifests-migrated.json");
fs.writeFileSync(outputPath, JSON.stringify(manifests, null, "\t"));
console.log(`\nMigrated file saved to: ${outputPath}`);
