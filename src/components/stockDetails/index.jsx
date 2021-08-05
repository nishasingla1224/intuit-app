import React from 'react';

// eslint-disable-next-line react/prop-types
const StockDetailsCard = ({stockDetails}) => {
	const renderDetails = () => {
		// eslint-disable-next-line react/prop-types
		return stockDetails.map((obj,index) => {
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div key={index}>
							<span className="label">{obj.label} : </span>
							<span className="value">{obj.value}</span>
						</div>
					)
				})
		
	}

	return (
		<div className="cardContainer">
			{ renderDetails() }
		</div>
	)
}


export default StockDetailsCard;