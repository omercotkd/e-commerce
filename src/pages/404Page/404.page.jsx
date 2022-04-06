import React, { useContext, useEffect } from "react";

import { AppContext } from "../../app";

const Page404 = () => {
    
    const { setPage404 } = useContext(AppContext);

    useEffect(() => {
        setPage404(true);
    }, []);
    
    return(
        <h1>page not found 404</h1>
    );
};

export default Page404;