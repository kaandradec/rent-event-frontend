import React from 'react';

interface Tarjeta {
    token: string;
    nombreTarjeta: string;
}

interface TarjetaListProps {
    tarjetas: Tarjeta[];
}

const TarjetaList: React.FC<TarjetaListProps> = ({ tarjetas }) => {
    return (
        <div className="mt-4">
            {tarjetas.map((tarjeta, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-md mb-2">
                    <p className="font-bold">Nombre de la Tarjeta: {tarjeta.nombreTarjeta}</p>
                    <p>Token: {tarjeta.token}</p>
                </div>
            ))}
        </div>
    );
};

export default TarjetaList;
