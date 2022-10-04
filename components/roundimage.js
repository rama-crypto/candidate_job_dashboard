import React from 'react'

const Roundimage = ({ imageUrl, size, whiteBorder, borderSize }) => {
    return (
        <>
            <div className="round"></div>
            <style jsx>{`
                .round {
                    background-image: url(${imageUrl});
                    background-size: cover;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    border: ${whiteBorder && borderSize
                            ? `${borderSize}px`
                            : '0px'}
                        solid white;
                }
            `}</style>
        </>
    )
}

export default Roundimage
