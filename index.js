import express from "express";
import ShushiSwap from "./shushi-swap/index.js";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/swap", ShushiSwap);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
