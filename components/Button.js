import React from 'react'

const Button = ({ children, padding, style, onClick }) => {
    return (
        <>
            <div
                className="button user-select-none"
                style={style}
                onClick={onClick}
            >
                {children}
            </div>
            <style jsx>{`
                .button {
                    padding: ${padding};
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 100%;
                    letter-spacing: -0.03em;
                    color: #fff;
                    background: #465ac5;
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 8px;
                    text-align: center;
                }
            `}</style>
        </>
    )
}

export default Button
