import React from 'react';

const ErrorMessage = (props) => {
    return (
        <div className="text-center">
            <p>{props.msg}</p>
        </div>
    )
}

export default ErrorMessage;