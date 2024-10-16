import { resolve } from "node:path";
import { setPackageVersions } from "./utils/setPackageVersions";

const ROOT_DIR = resolve(import.meta.url, "..", "..");
const PKGS_DIR = resolve(ROOT_DIR, "packages");
const CONF_DIR = resolve(ROOT_DIR, "configs");

const VERSION = process.argv[process.argv.indexOf("--version") + 1];

setPackageVersions(PKGS_DIR, VERSION);
setPackageVersions(CONF_DIR, VERSION);
