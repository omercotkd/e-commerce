import React from "react";

import "./loading-page.style.css";

const LoadingPage = () => {

    return(
        <div className="divLoader">
          <svg className="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
            <path  stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"></path>
          </svg>
        </div>
    );

};

export default LoadingPage;