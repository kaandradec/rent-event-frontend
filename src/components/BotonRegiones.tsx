import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface BotonRegionesEcuadorProps {
    setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}
interface StatesApiResponse {
    error: boolean;
    msg: string;
    data: CountryData;
}

interface CountryData {
    iso2: string;
    iso3: string;
    name: string;
    states: StateData[];
}

interface StateData {
    name: string;
}

export const BotonRegionesEcuador: React.FC<BotonRegionesEcuadorProps> = ({ setSelectedRegion }) => {
    const [regiones, setRegiones] = useState<string[]>([]);
    const [region, setRegion] = useState<string>("Región");

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            url: "https://countriesnow.space/api/v0.1/countries/states",
            data: {
                country: "Ecuador"
            }
        };

        axios(requestOptions)
            .then(response => {
                const result: StatesApiResponse = response.data;
                if (result.data) {
                    const stateNames = result.data.states.map(state => state.name);
                    setRegiones(stateNames);
                } else {
                    setRegiones([]);  // Handle case where no states are found
                }
            })
            .catch(error => console.log('error', error));
    }, []);

    const handleRegionSelection = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setRegion(selected);
        setSelectedRegion(selected);
    };

    return (
        <div className="flex flex-col gap-4 mb-5">
            <Dropdown>

                <DropdownTrigger>
                    <Button variant="bordered" className="flex w-full" aria-label={"Región"}>
                        {region}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    aria-label={"Región"}
                    selectedKeys={new Set([region])}
                    onSelectionChange={(keys) => handleRegionSelection(keys as Set<string>)}
                    className="max-h-60 overflow-auto"
                >
                    {regiones.length > 0 ? (
                        regiones.map((reg) => (
                            <DropdownItem value={reg} key={reg}>{reg}</DropdownItem>
                        ))
                    ) : (
                        <DropdownItem key="no-regions">No regions available</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
