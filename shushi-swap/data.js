import axios from "axios";

export const getTrendingData = async (chainId) => {
  let data = JSON.stringify({
    query: `query TrendingTokens($chainId: TrendingTokensChainId!) {
  trendingTokens(chainId: $chainId) {
    address
    symbol
    name
    decimals
    approved
  }
}`,
    variables: { chainId: parseInt(chainId) },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://production.data-gcp.sushi.com/graphql",
    headers: {
      accept: "application/graphql-response+json, application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      origin: "https://www.sushi.com",
      priority: "u=1, i",
      referer: "https://www.sushi.com/",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
    data: data,
  };

  const response = await axios.request(config).catch((error) => {
    console.log(error);
  });
  return response?.data;
  // .request(config)
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
};

export const getSwapTokenData = async (
  tokenInAddress,
  tokenOutAddress,
  amountInWei,
  toAddress
) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api.sushi.com/swap/v5/137?referrer=sushi&tokenIn=${tokenInAddress}&tokenOut=${tokenOutAddress}&amount=${amountInWei}&maxSlippage=0.005&to=${toAddress}&enableFee=true&feeReceiver=0xca226bd9c754F1283123d32B2a7cF62a722f8ADa&includeTransaction=true&includeRoute=true`,
    headers: {},
  };

  console.log({ tokenInAddress, tokenOutAddress, amountInWei, toAddress });

  const response = await axios.request(config).catch((error) => {
    console.log(error);
  });

  console.log({ response });

  return response?.data;
};
