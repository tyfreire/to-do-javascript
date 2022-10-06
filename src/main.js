const Core = require("../src/core");

async function main() {
  await Core.cli();
  process.exit();
}

main();
