import express from "express";
import { readFile } from "fs/promises";
import * as fs from "fs";
import { join } from "path";

const app = express();

app.get("/unsafe/:path", async (req, res) => {
  try {
    const { path } = req.params;
    const SAFE_ROOT = "/safe/root/directory";
    const resolvedPath = fs.realpathSync(join(SAFE_ROOT, path));
    if (!resolvedPath.startsWith(SAFE_ROOT)) {
      res.status(403).send("Forbidden: Invalid file path");
      return;
    }
    const file = await readFile(resolvedPath);
    const contents = file.toString();
    res.send(contents);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Expressway listening on port ${port}`);
});
