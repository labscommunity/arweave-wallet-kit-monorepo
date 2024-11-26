const { resolve } = require("node:path");

const { setPackageVersions } = require("./utils/setPackageVersions.js");

const ROOT_DIR = resolve(__dirname, "..");
const PKGS_DIR = resolve(ROOT_DIR, "packages");
const STRATEGIES_DIR = resolve(ROOT_DIR, "strategies");
const FRAMEWORKS_DIR = resolve(ROOT_DIR, "frameworks");
const VERSION = process.argv[process.argv.indexOf("--version") + 1];

setPackageVersions(PKGS_DIR, VERSION);
setPackageVersions(CONF_DIR, VERSION);
