import React from 'react';

interface EventProps {
    nombre: string;
    fecha: string;
}

export const Event: React.FC<EventProps> = ({ nombre, fecha }) => {
    return (
        <div className="border p-4 my-2">
            <p className="font-bold">Nombre Evento: {nombre}</p>
            <p className="font-bold">Fecha Evento: {fecha}</p>
        </div>
    );
};
