const { spawn } = require("node:child_process");
const { resolve, join } = require("node:path");
const { readdirSync } = require("node:fs");

const ROOT_DIR = resolve(__dirname, "..");

const packages = readdirSync(join(ROOT_DIR, "packages"));
const strategies = readdirSync(join(ROOT_DIR, "strategies"));
const frameworks = readdirSync(join(ROOT_DIR, "frameworks"));

async function main() {
  for (const pkg of packages) {
    await publish(join(ROOT_DIR, "packages", pkg));
  }
  for (const strategy of strategies) {
    await publish(join(ROOT_DIR, "strategies", strategy));
  }
  for (const framework of frameworks) {
    await publish(join(ROOT_DIR, "frameworks", framework));
  }
}

async function publish(cwd) {
  const cursor = spawn("npm", ["publish", "--access", "public"], {
    stdio: "inherit",
    cwd,
  });
  return new Promise((resolve, reject) => {
    cursor.on("close", resolve);
    cursor.on("error", reject);
  });
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(() => {
    process.exit(0);
  });
