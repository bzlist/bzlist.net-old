const fs = require("fs-extra");
const path = require("path");

(async() => {
  const src = "../dist";
  const copy = "./dist";

  await fs.remove(copy);
  await fs.copy(src, copy);
  await fs.remove(path.join(src, "browser", "index.html"));
})();