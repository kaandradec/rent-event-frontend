import React from 'react';

interface Tarjeta {
    token: string;
    nombreTarjeta: string;
}

interface TarjetaListProps {
    tarjetas: Tarjeta[];
}

const TarjetaList: React.FC<TarjetaListProps> = ({ tarjetas }) => {
    const ultimaTarjeta = tarjetas.slice(-1);

    return (
        <div className="mt-4">
            {ultimaTarjeta.map((tarjeta, index) => (
                <div key={index} className="p-4 border-2 border-secondary rounded-md mb-2">
                    <p className="font-bold">Nombre de la Tarjeta: {tarjeta.nombreTarjeta}</p>
                    <p>Token: {tarjeta.token}</p>
                </div>
            ))}
        </div>
    );
};

export default TarjetaList;
