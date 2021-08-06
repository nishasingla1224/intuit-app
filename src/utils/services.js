
function commonErrorHandler(err) {
	return err.message;
  }

export const get = async (url) => {
    try {
      const data = await fetch(url, {
        method: "GET",
      });
      const jsonData = await data.json();
      return jsonData;
    } catch (error) {
      return commonErrorHandler(error);
    }
  }



export const debounce = (fn,delay) => {
	let timer ;
	return function(...rest){
	  const context = this;
	  const args = [...rest];
	  clearTimeout(timer)
	  timer = setTimeout(()=>{
	    fn.apply(context,args)
	  },delay);
	}
}

export const getOnlySymbols = (resultArr) => {
	return resultArr && resultArr.map(obj => obj["1. symbol"]) || [] ;
}

export const fillStockDetails = (dataToShow, resp) => {
	dataToShow.forEach((obj)=>{
		obj.value = resp[obj.keyName];
	})

	return dataToShow;
}