

const env = process.env.NODE_ENV; // process.node.environment

let matchingStocksSearchUrl; 
let stockDetailsUrl;
switch(env){
    case "development":
        matchingStocksSearchUrl = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey=WKQA3GKM8RO4I9NT";
        stockDetailsUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey=WKQA3GKM8RO4I9NT";
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