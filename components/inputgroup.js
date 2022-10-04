import React, { useState } from 'react'

import { BsEmojiSmile } from 'react-icons/bs'
import { AiFillAccountBook } from 'react-icons/ai'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import Errortext from './Errortext'

// not files
const Inputgroup = ({
    label,
    id,
    type,
    placeholder,
    error,
    value,
    setter,
    important,
    style = {},
    icon = null,
    iconSize = 0,
    iconColor = 'black',
}) => {
    return (
        <div className="w-100" style={style}>
            <label htmlFor={id} className="mb-1">
                {important && (
                    <span style={{ color: 'red' }} className="poppins">
                        *
                    </span>
                )}
                <span style={{ fontWeight: 600 }}>{label}</span>
            </label>
            <div className="input-group position-relative">
                {Boolean(icon) && (
                    <span
                        className="position-absolute ps-1 h-100 d-flex align-items-center"
                        style={{ top: '0px', left: '0px', zIndex: 4 }}
                    >
                        {icon({ size: iconSize, color: iconColor })}
                    </span>
                )}
                <input
                    className="form-control d-block border-color custom-placeholder-color"
                    id={id}
                    type={type}
                    placeholder={placeholder || ''}
                    value={value}
                    onChange={(event) => {
                        event.preventDefault()
                        setter(event.target.value)
                    }}
                    style={{
                        paddingLeft: `${iconSize + 10}px`,
                    }}
                />
            </div>
            <Errortext error={error} />
        </div>
    )
}

// textgroup
const Textgroup = ({
    label,
    id,
    type,
    placeholder,
    error,
    value,
    setter,
    rows = 3,
    important,
    style = {},
    withEmoji = false,
}) => {
    const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false)

    return (
        <>
            <div className="w-100" style={style}>
                <label className="mb-2" htmlFor={id}>
                    {important && <span style={{ color: 'red' }}>*</span>}
                    <span style={{ fontWeight: 600 }} className="poppins">
                        {label}
                    </span>
                </label>
                <div className="input-group position-relative">
                    <textarea
                        className="form-control d-block border-color custom-placeholder-color"
                        id={id}
                        type={type}
                        placeholder={placeholder || ''}
                        value={value}
                        onChange={(event) => {
                            event.preventDefault()
                            setter(event.target.value)
                        }}
                        rows={rows}
                    />
                    {Boolean(withEmoji) && (
                        <>
                            <div className="emoji-activator position-absolute">
                                <span
                                    role={'button'}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setIsEmojiPickerActive((prev) => !prev)
                                    }}
                                >
                                    <BsEmojiSmile size={24} color={'#c4c4c4'} />
                                </span>
                            </div>
                            <div
                                style={{
                                    display: isEmojiPickerActive
                                        ? 'block'
                                        : 'none',
                                    zIndex: 4,
                                }}
                                className="emoji-picker"
                            >
                                <Picker
                                    onSelect={(emoji) => {
                                        console.log('Emoji Picked', emoji)
                                        setter((prev) => {
                                            let next = prev?.slice()
                                            next = next + emoji.native
                                            return next
                                        })
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <Errortext error={error} />
            </div>
            <style jsx>{`
                .emoji-activator {
                    right: 5px;
                    top: -30px;
                }
                .emoji-picker {
                    right: 10px;
                    top: 10px;
                    position: absolute;
                }
            `}</style>
        </>
    )
}

export { Textgroup }

export default Inputgroup
