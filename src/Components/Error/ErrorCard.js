import React from 'react';

const ErrorCard = (props) => {
    return (
        <div className="text-center">
            <div className="card p-4 m-5">
                <div className="card-body">
                    <p>{props.title}</p>
                    <p>{props.msg}</p>
                </div>
            </div>
        
        </div>
    )
}

export default ErrorCard;