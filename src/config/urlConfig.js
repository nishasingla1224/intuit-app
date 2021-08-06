

const env = process.env.NODE_ENV; // process.node.environment

let matchingStocksSearchUrl; 
let stockDetailsUrl;
switch(env){
    case "development":
        matchingStocksSearchUrl = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey=FVSBF83P2GIQ2RL0";
        stockDetailsUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey=FVSBF83P2GIQ2RL0";
        break;

    case "production":
        matchingStocksSearchUrl = '';
        stockDetailsUrl = '';
        break;

    default:
}

export {
    matchingStocksSearchUrl,
    stockDetailsUrl
}