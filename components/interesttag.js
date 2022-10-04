import React from 'react'

const Tag = ({
    serverId,
    icon,
    content,
    size,
    color,
    interests = [],
    handleOnClick = () => {},
}) => {
    return (
        <>
            <p
                className={`tag p-3 d-flex align-items-center text-center m-0 ${
                    Boolean(interests?.includes(serverId)) ? 'active' : ''
                }`}
                role={'button'}
                onClick={(event) => {
                    handleOnClick(event)
                }}
            >
                <span className="me-2">
                    <img src={icon} height={size} />
                    {/* {icon({ color: color, size: size })} */}
                </span>
                {' ' + content}
            </p>
            <style jsx>{`
                .tag {
                    height: 30px;
                    border: 1px solid #dee0e5;
                    border-radius: 8px;
                    font-weight: 500;
                    font-size: 12px;
                }
                .tag:hover {
                    font-weight: 600;
                    color: ${color};
                    background-color: #f1f4f9;
                    border-color: transparent;
                }
                .active {
                    font-weight: 600;
                    color: ${color};
                    background-color: #f1f4f9;
                    border-color: transparent;
                }
            `}</style>
        </>
    )
}

export default Tag
