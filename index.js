import express from "express";
import { readFile } from "fs/promises";
const app = express();
app.get("/unsafe/:path", async (req, res) => {
    try {
        const { path } = req.params;
        const file = await readFile(path);
        const contents = file.toString();
        res.send(contents);
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Expressway listening on port ${port}`);
});
