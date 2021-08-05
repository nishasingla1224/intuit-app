import React from 'react'

import "./index.scss";

let PollingComponent = ({value, onChange}) => {

    return (
        <div className="pollingContainer">
            <span className='pollingLabel'>Show Real Time Stock Details in</span>
            <input type="number" value = {value} onChange={onChange} />
            <span> (in sec)</span>
        </div>
    )
}

export default PollingComponent;

