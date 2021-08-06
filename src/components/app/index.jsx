import React, {useState, useEffect, useCallback} from 'react';
import { get , getOnlySymbols, fillStockDetails } from "../../utils/services";
import { dataToShow,refreshingTimeInterval ,maxSearchInstancesToBeStored ,NoStockFound } from "../../utils/constants";
import {matchingStocksSearchUrl,stockDetailsUrl} from "../../config/urlConfig";
import StockDetailsCard from "../stockDetails";
import Suggestor from '../suggestor';
import PollingComponent from '../polling';

import "./index.scss";

let stocksList = [];
const stockObj = {};
let pollingInterval;

const AppComponent = () => {

  const [query, setQuery] = useState("");
  const [stockDetails, setStockDetails] = useState([]);
  const [matchingStocksList, setMatchingStocksList] = useState([]);
  const [errorMessage ,setErrorMessage] = useState("");
  const [refreshInterval ,setRefreshInterval] = useState(refreshingTimeInterval);
  const [activeStockIndex ,setActiveStockIndex] = useState(-1);

  

  const cacheStockDetails = (details,query)=>{
     let len = stocksList.length;
     if(len< maxSearchInstancesToBeStored && !stockObj[query] ){
        stockObj[query] = [...details];
        stocksList.push(query);
        setActiveStockIndex(stocksList.length-1);
     }else if(stockObj[query]){
         stockObj[query] = [...details];
     }

  }


  const onGettingStockDetails = (resp,query) => {
    let details;
    if(resp && Object.keys(resp).length>0){
      details = fillStockDetails(dataToShow, resp);
      setStockDetails(details);
      cacheStockDetails(details,query);
      setErrorMessage("");
    }else{
       setErrorMessage(NoStockFound);
    }
  }


  const setPollingOnStockInfo = (query) => {
    clearInterval(pollingInterval);
    pollingInterval = setInterval(getStockInfo.bind(null,query),refreshInterval*1000);
  }


  const getStockInfo = async (query) => {
    const api = stockDetailsUrl.replace("{symbol}",query);
    const data = await get(api);
    onGettingStockDetails(data,query);
  }

  const fetchStockDetails = (selectedStock) => {
    getStockInfo(selectedStock);
    setPollingOnStockInfo(selectedStock);
  };

  const setStocksList = (res) => {
    const allSymbolsMatched = getOnlySymbols(res && res.bestMatches);
    setMatchingStocksList(allSymbolsMatched);
  }

  const handleRefreshInterVal = (event) => {
      setRefreshInterval(event.target.value);
  }


  const showPrevNextStock = (action) => {
    let newIndex = (action == "prev") ? activeStockIndex-1 : activeStockIndex+1;    
    setActiveStockIndex(newIndex);
  }

  const searchHandler = (event) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    if(stocksList.length >0){
        setQuery(stocksList[activeStockIndex]);
        setStockDetails(stockObj[stocksList[activeStockIndex]]);
        fetchStockDetails(stocksList[activeStockIndex]);
    }      
  }, [activeStockIndex]);

  useEffect(() => {
    query && setPollingOnStockInfo(query);
  }, [refreshInterval]);


  const suggestorProps = {
    query,
    onQueryChange : searchHandler,
    label : "Search for a Stock Symbol",
    delay : 2000,
    handleSubmit: fetchStockDetails,
    searchApi : matchingStocksSearchUrl,
    options : matchingStocksList,
    setOptions : setStocksList
  }


  return(
      <div className="mainContainer">
        <div className='welcomeText'>Welcome to Stocks Portal</div>
        <div className="header">
            <div className="row">
            <button type="text" className="nextPrev" onClick={showPrevNextStock.bind(null,"prev")} disabled={[0, -1].indexOf(activeStockIndex)>-1}>{"< Prev"}</button>
            <Suggestor {...suggestorProps} /> 
            <button type="text"  className="nextPrev" onClick={showPrevNextStock.bind(null,"next")} disabled={activeStockIndex ===  stocksList.length -1 }>{"Next >"}</button> 
            </div>
            <PollingComponent value = {refreshInterval} onChange={handleRefreshInterVal} />        
        </div>        

        
        {   
            activeStockIndex >=0 && <StockDetailsCard stockDetails={stockDetails}/> 
        }
        {
            errorMessage && <label>{errorMessage}</label>
        }
        
      </div>
    )
}

export default AppComponent;