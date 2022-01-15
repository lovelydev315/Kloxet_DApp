import React from "react";
const BomItem = ({details}) => {
    return (
        <React.Fragment>
            <img src={details.thumbImage} alt={'Image for' + details.selectedMonthYear} />
            <p className="bom-month">{details.monthName}</p>
           {/*  <p className="bom-status">Receieved</p> */}
        </React.Fragment>
    );
}

export default BomItem;