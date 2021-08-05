const refreshingTimeInterval = 5; // in seconds

const maxSearchInstancesToBeStored = 5;


const dataToShow = [
	{
		keyName : "Name",
		label : "Name",
		value : ""
	},
	{
		keyName : "Symbol",
		label : "Symbol",
		value : ""
	},
	{
		keyName : "Description",
		label : "Description",
		value : ""
	},
	{
		keyName : "AnalystTargetPrice",
		label : "Current Price",
		value : ""
	},
	{
		keyName : "Exchange",
		label : "Change traded on",
		value : ""
	},
	{
		keyName : "Industry",
		label : "Industry",
		value : ""
	},
	{
		keyName : "PERatio",
		label : "PE Ratio",
		value : ""
	},
	{
		keyName : "MarketCapitalization",
		label : "Market Cap",
		value : ""
	}
]

export {
	refreshingTimeInterval,
	maxSearchInstancesToBeStored,
	dataToShow
}