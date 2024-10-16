import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

import { setPackageVersions } from "./utils/setPackageVersions.js";

const ROOT_DIR = resolve(import.meta.url, "..", "..");
const PUBLISH_DIR = resolve(ROOT_DIR, ".publish");
const CONFIGS_DIR = resolve(ROOT_DIR, "configs");
const PACKAGES_DIR = resolve(ROOT_DIR, "packages");
const VERSION = getVersion();

// ### Build Packages

spawnSync("pnpm", ["build"], { stdio: "inherit", cwd: ROOT_DIR });

// ### Prepare Publish Directory

mkdirSync(PUBLISH_DIR);

cpSync(CONFIGS_DIR, join(PUBLISH_DIR, "configs"), { recursive: true });
cpSync(PACKAGES_DIR, join(PUBLISH_DIR, "packages"), { recursive: true });

// ### Prepare Packages

setPackageVersions(join(PUBLISH_DIR, "configs"), VERSION);
setPackageVersions(join(PUBLISH_DIR, "packages"), VERSION);

// ### Publish Packages

const packages = readdirSync(join(PUBLISH_DIR, "packages"));
const configs = readdirSync(join(PUBLISH_DIR, "configs"));

// ### Clean Up

spawnSync("pnpm", ["clean"], { stdio: "inherit", cwd: ROOT_DIR });
// rmSync(PUBLISH_DIR, { recursive: true, force: true });

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

function getVersion(): string {
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
