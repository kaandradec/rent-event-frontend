import { useState, useEffect } from 'react';
import { Avatar, Input } from "@nextui-org/react";
import api from '@/api';
import { useAuthStore } from '@/store/auth';

export const UserConfiguration = () => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
    });

    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (token) {
            api.get('/api/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                });
        }
    }, [token]);

    return (
        <main className="mt-40">
            <section className="max-w-xl border-2 rounded-xl p-5 mx-4 md:mx-auto">
                <div className="flex gap-4 items-center mb-4">
                    <h1 className="text-3xl font-bold">Usuario</h1>
                </div>
                <div className="flex gap-4 items-center mb-4">
                    <Avatar isBordered radius="lg" src={userData.avatar || "/lunacat.png"} className="w-20 h-20 text-large mb-4"/>
                </div>
                <div className="max-w-xs mx-auto">
                    <Input
                        className="mb-5"
                        type="text"
                        label="Nombre de Usuario"
                        variant="bordered"
                        name="username"
                        value={userData.username}
                        readOnly
                    />
                </div>
            </section>
        </main>
    );
};
