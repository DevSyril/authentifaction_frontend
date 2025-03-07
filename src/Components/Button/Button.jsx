import React from 'react'
import './Button.css'

export default function Button({text, onClick, type, disabled}) {
    return (    
        <div>
            <button className='button' disabled = {disabled} type={type} onClick={onClick}>{text || "Opérations"}</button>
        </div>
    )
}
