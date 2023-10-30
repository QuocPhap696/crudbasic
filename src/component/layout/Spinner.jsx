import React from "react";

const Spinner = () =>{
    return(
        <div className="spinner">
            <>
                <div className="spinner-border text-success" role="status"></div>
                <div className="spinner-border text-danger" role="status"></div>
                <div className="spinner-border text-warning" role="status"></div>
            </>
        </div>
        )
}

export default Spinner;