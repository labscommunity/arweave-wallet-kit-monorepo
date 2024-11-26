const { spawnSync } = require("node:child_process");
const { cpSync, mkdirSync, readdirSync, rmSync } = require("node:fs");
const { join, resolve } = require("node:path");

const { setPackageVersions } = require("./utils/setPackageVersions");

const ROOT_DIR = resolve(__dirname, "..");
const PUBLISH_DIR = resolve(ROOT_DIR, ".publish");
const PACKAGES_DIR = resolve(ROOT_DIR, "packages");
const STRATEGIES_DIR = resolve(ROOT_DIR, "strategies");
const FRAMEWORKS_DIR = resolve(ROOT_DIR, "frameworks");
const VERSION = getVersion();

// ### Build Packages

spawnSync("pnpm", ["build"], { stdio: "inherit", cwd: ROOT_DIR });

// ### Prepare Publish Directory

mkdirSync(PUBLISH_DIR);

cpSync(STRATEGIES_DIR, join(PUBLISH_DIR, "strategies"), { recursive: true });
cpSync(FRAMEWORKS_DIR, join(PUBLISH_DIR, "frameworks"), { recursive: true });
cpSync(PACKAGES_DIR, join(PUBLISH_DIR, "packages"), { recursive: true });

// ### Prepare Packages

setPackageVersions(join(PUBLISH_DIR, "strategies"), VERSION);
setPackageVersions(join(PUBLISH_DIR, "frameworks"), VERSION);
setPackageVersions(join(PUBLISH_DIR, "packages"), VERSION);

// ### Publish Packages

const packages = readdirSync(join(PUBLISH_DIR, "packages"));
const strategies = readdirSync(join(PUBLISH_DIR, "strategies"));
const frameworks = readdirSync(join(PUBLISH_DIR, "frameworks"));

// ### Clean Up

spawnSync("pnpm", ["clean"], { stdio: "inherit", cwd: ROOT_DIR });
// rmSync(PUBLISH_DIR, { recursive: true, force: true });

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function getVersion() {
  const pos = process.argv.indexOf("--version");
  if (pos === -1) {
    throw new Error("No version specified.");
  }
  const version = process.argv[pos + 1];
  if (version === undefined) {
    throw new Error("No version specified.");
  }
  return version;
}
