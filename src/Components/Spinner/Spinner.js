import React from 'react';

const Spinner = (props) => {
    return (
        <div className="h-50 fixed-top d-flex justify-content-center align-items-center">
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner;