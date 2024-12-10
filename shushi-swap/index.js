import express from "express";
import bodyParser from "body-parser";
import { getSwapTokenData, getTrendingData } from "./data.js";
const app = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// functions

const trendingTokens = async (req, res) => {
  try {
    const { chainId } = req.query;
    console.log({ chainId });
    const data = await getTrendingData(chainId || 1);
    res.json(data);
  } catch (err) {
    res.json({
      error: JSON.stringify(err),
      code: 400,
    });
  }
};

const getTransactionData = async (req, res) => {
  try {
    const { tokenInAddress, tokenOutAddress, amountInWei, toAddress } =
      req?.body;
    console.log({ tokenInAddress, tokenOutAddress, amountInWei, toAddress });
    if (tokenInAddress && tokenOutAddress && amountInWei && toAddress) {
      const data = await getSwapTokenData(
        tokenInAddress,
        tokenOutAddress,
        amountInWei,
        toAddress
      );
      res.json(data);
    } else {
      res.json({
        error: "please fill required params",
        code: 400,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      error: JSON.stringify(err),
      code: 400,
    });
  }
};

// path creation

app.get("/trending-tokens", trendingTokens);
app.get("/tokens-data", getTransactionData);

app.get("/", (req, res) => {
  res.json({
    text: "text from swap page",
  });
});

export default app;
