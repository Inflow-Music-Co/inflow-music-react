import React  from "react";

const style = {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999
}
const divStyle = {
    position: 'fixed',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%'
}

function Loader() {
    return (
        <div style={divStyle}>
            <div style={style} className="spinner-border text-success spinner-border-lg" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
