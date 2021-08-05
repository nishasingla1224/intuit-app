import React,{useState,useCallback,useEffect} from 'react'
import {debounce,get } from "../../utils/services";

import "./index.scss";

function Suggestor({label, delay, handleSubmit,searchApi,options,setOptions}) {

    const [query, setQuery] = useState("");
   
    const getDebouncedApiData = useCallback(debounce(async(query) => {
        const res = await get(searchApi.replace("{query}",query));
        if(res){
            setOptions(res)
        }
      }, delay),[])
    
      useEffect(()=>{
        query && getDebouncedApiData(query);
      },[query]);
    
    
      const searchHandler = (event) => {
        setQuery(event.target.value);
      }

      const renderOptions = () => {
        return options.map((symbol, index) => {
            return <option value={symbol} key={index}/>
        })
    }

    return (
        <div className='suggestor'>
            <label htmlFor="symbol">{label}</label>
            <input list="symbols" name="symbol" id="symbol" value={query} onChange={searchHandler}/>
            <datalist id="symbols">
                {renderOptions()}
            </datalist>
            <button type="button" onClick={handleSubmit.bind(null,query)}>Search</button>
        </div>
    )
}

export default Suggestor;