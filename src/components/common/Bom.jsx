import React from "react";
import BomItem from './BomItem';
const Bom = ({items, handleBomDetails, ...props }) => {
    return (
        items.map(bomItem => (
        <div key={bomItem._id} className="col-sm-4 col-xs-12 col-md-3 bom-item" onClick={() => handleBomDetails(bomItem)}>
            <BomItem details={bomItem}></BomItem>
        </div>
        ))
    );
}
export default Bom;