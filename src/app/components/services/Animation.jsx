import React from 'react'

const Animation = ({loader}) => {
    return (
        <>
            {loader && <div className="dot-spinner absolute top-1/2 -translate-y-1/2 z-20">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>}
        </>
    )
}

export default Animation