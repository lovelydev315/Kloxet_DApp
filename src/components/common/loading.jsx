import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="commonLoader">
      <Loader type="Oval" color="#eb6469" height="50" width="50" />
    </div>
  );
};

export default Loading;
