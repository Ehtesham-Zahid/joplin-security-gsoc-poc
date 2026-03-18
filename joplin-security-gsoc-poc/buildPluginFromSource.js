const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

async function buildPluginFromSource(githubRepo, commitHash, outputDir) {
  const tempDir = path.resolve("./temp-plugin-build");

  try {
    console.log(`\n🔧 buildPluginFromSource()`);
    console.log(`📦 Repo: ${githubRepo}`);
    console.log(`🔖 Commit: ${commitHash}`);
    console.log("─".repeat(50));

    // Step 1: Clone the repo
    console.log("\n[1/5] Cloning repository...");
    execSync(`git clone ${githubRepo} ${tempDir}`, { stdio: "inherit" });

    // Step 2: Checkout the exact reviewed commit
    console.log(`\n[2/5] Checking out reviewed commit: ${commitHash}`);
    execSync(`git checkout ${commitHash}`, { cwd: tempDir, stdio: "inherit" });

    // Step 3: Install dependencies
    console.log("\n[3/5] Installing dependencies (npm install)...");
    execSync("npm install --ignore-scripts", {
      cwd: tempDir,
      stdio: "inherit",
    });

    // Step 4: Build from source
    console.log("\n[4/5] Building plugin from source (npm run dist)...");
    execSync("npm run dist", { cwd: tempDir, stdio: "inherit" });

    // Step 5: Find and copy the generated .jpl
    console.log("\n[5/5] Locating generated .jpl file...");
    const publishDir = path.resolve(tempDir, "publish");
    const files = fs.readdirSync(publishDir);
    const jplFile = files.find((f) => f.endsWith(".jpl"));

    if (!jplFile) throw new Error("No .jpl file found in publish/ folder");

    const jplSource = path.resolve(publishDir, jplFile);
    const jplDest = path.resolve(outputDir, jplFile);

    fs.ensureDirSync(outputDir);
    fs.copySync(jplSource, jplDest);

    console.log("\n" + "─".repeat(50));
    console.log(`✅ SUCCESS: Plugin built from source`);
    console.log(`📁 Output: ${jplDest}`);
    console.log(
      `🔒 This .jpl was built on trusted server from reviewed commit`,
    );
    console.log(`   NOT downloaded from npm or developer machine`);
  } catch (error) {
    console.error("\n❌ Build failed:", error.message);
  } finally {
    // Cleanup temp directory
    if (fs.existsSync(tempDir)) {
      fs.removeSync(tempDir);
      console.log("\n🧹 Temp directory cleaned up");
    }
  }
}

// Test with the copytags plugin at a specific commit
buildPluginFromSource(
  "https://github.com/JackGruber/joplin-plugin-copytags.git",
  "cb971eadf383829e34d7ea1a71359fe2cdf7a5e9",
  "./output",
);
