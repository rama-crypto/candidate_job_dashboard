import React from 'react'
import { BiErrorCircle } from 'react-icons/bi'

const Errortext = ({ error }) => {
    return (
        <>
            <span
                style={{
                    color: 'red',
                    fontSize: '0.9em',
                    opacity: error?.length ? '1' : '0',
                }}
            >
                {
                    <span className="me-2">
                        <BiErrorCircle color="red" size="0.9em" />
                    </span>
                }
                {error}
            </span>
        </>
    )
}

export default Errortext
