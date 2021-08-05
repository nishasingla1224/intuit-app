import React, {useState} from 'react';
import { get , getOnlySymbols, fillStockDetails } from "../../utils/services";
import { dataToShow,refreshingTimeInterval ,maxSearchInstancesToBeStored } from "../../utils/constants";
import {matchingStocksSearchUrl,stockDetailsUrl} from "../../config/urlConfig";
import StockDetailsCard from "../stockDetails";
import Suggestor from '../suggestor';
import PollingComponent from '../polling';

import "./index.scss";

const AppComponent = () => {

  const [stockDetails, setStockDetails] = useState([]);
  const [matchingStocksList, setMatchingStocksList] = useState([]);

  const [refreshInterval ,setRefreshInterval] = useState(refreshingTimeInterval);
  const [activeStock ,setActiveStock] = useState(null);
  const stocksList = new Array(5);
  const cacheStockDetails = (details)=>{
     let len = stocksList.length;
     if(len< maxSearchInstancesToBeStored){
         stocksList.push(details);
         setActiveStock(stocksList.length-1);
     }

  }
  const onGettingStockDetails = (resp) => {
    let details = [];
    if(resp && Object.keys(resp).length>0){
      details = fillStockDetails(dataToShow, resp);
      setStockDetails(details);
      cacheStockDetails(details);
    }else{
        setStockDetails([]);
    }
  }
  const setPollingOnStockInfo = (query) => {
      setInterval(getStockInfo.bind(null,query),refreshInterval*1000);
  }
  const getStockInfo = async (query) => {
    const api = stockDetailsUrl.replace("{symbol}",query);
    const data = await get(api);
    onGettingStockDetails(data);
  }

  const fetchStockDetails = (query) => {
    getStockInfo(query);
    setPollingOnStockInfo(query);
  }

  const setStocksList = (res) => {
    const allSymbolsMatched = getOnlySymbols(res && res.bestMatches);
    setMatchingStocksList(allSymbolsMatched);
  }

  const handleRefreshInterVal = (event) => {
      setRefreshInterval(event.target.value);
  }
  const showPrevNextStock = (event,action) => {
     
  }

  const suggestorProps = {
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
            <Suggestor {...suggestorProps} /> 
            {stocksList.length && <button type="text" onClick={showPrevNextStock("prev")}>prev</button>} 
            <button type="text" onClick={showPrevNextStock("next")}>next</button> 
            <PollingComponent value = {refreshInterval} onChange={handleRefreshInterVal} />        
        </div>        

        
        {   (stockDetails.length>0) && 
            <StockDetailsCard stockDetails={stockDetails}/>  ||
             <label>Not Found</label>
        }
        
        
      </div>
    )
}

export default AppComponent;