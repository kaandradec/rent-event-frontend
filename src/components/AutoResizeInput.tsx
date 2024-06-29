import React, { useEffect, useRef, useState } from 'react';

interface AutoResizeInputProps {
    className?: string;
    type: string;
    color: string;
    name: string;
    value: string;
    readOnly: boolean;
}

const AutoResizeInput: React.FC<AutoResizeInputProps> = ({ className, type, color, name, value, readOnly }) => {
    const [inputWidth, setInputWidth] = useState(0);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 10); // Añadir un pequeño padding para que no se corte el texto
        }
    }, [value]);

    return (
        <div className="auto-resize-input">
            <span ref={spanRef} className="hidden-span">{value}</span>
            <input
                className={className}
                type={type}
                color={color}
                name={name}
                value={value}
                readOnly={readOnly}
                style={{ width: `${inputWidth}px` }}
            />
        </div>
    );
};

export default AutoResizeInput;


