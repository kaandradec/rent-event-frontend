import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface BotonPaisesProps {
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}
interface ApiResponse {
    error: boolean;
    msg: string;
    data: { name: string }[];
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

export const BotonPaises: React.FC<BotonPaisesProps> = ({setSelectedCountry, setSelectedCity}) => {
    const [paises, setPaises] = useState<string[]>([]);
    const [ciudades, setCiudades] = useState<string[]>([]);
    const [country, setCountry] = useState<string>("País");
    const [city, setCity] = useState<string>("Ciudad");

    useEffect(() => {
        setCity("Elige una ciudad")
    }, [country]);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            url: "https://countriesnow.space/api/v0.1/countries/population/cities"
        };

        axios(requestOptions)
            .then(response => {
                const result: ApiResponse = response.data;
                const countryNames = result.data.map(country => country.country);
                const uniqueCountryNames = [...new Set(countryNames)];  // Elimina duplicados
                setPaises(uniqueCountryNames);
            })
            .catch(error => console.log('error', error));
    }, []);

    const handleCountrySelection = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setCountry(selected);
        setSelectedCountry(selected);
        // Fetch cities for the selected country
        const requestOptions = {
            method: 'POST',
            url: "https://countriesnow.space/api/v0.1/countries/states",
            data: {
                country: selected
            }
        };

        axios(requestOptions)
            .then(response => {
                const result: StatesApiResponse = response.data;
                if (result.data) {
                    const stateNames = result.data.states.map(state => state.name);
                    setCiudades(stateNames);
                } else {
                    setCiudades([]);  // Handle case where no cities are found
                }
            })
            .catch(error => console.log('error', error));
    };

    const handleCitySelection = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setCity(selected);
        setSelectedCity(selected);
    };

    return (
        <div className="flex flex-col gap-3 mb-5">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered" className="flex w-full" aria-label={"País"}>
                        {country}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    aria-label={"País"}
                    selectedKeys={new Set([country])}
                    onSelectionChange={
                    (keys) => {
                        handleCountrySelection(keys as Set<string>)
                        setCity("Elige una ciudad")
                    }

                }
                    className="max-h-60 overflow-auto"
                >
                    {paises.map((pais) => (
                        <DropdownItem value={pais} key={pais}>{pais}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered" className="flex w-full" aria-label={"Ciudad"}>
                        {city}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    aria-label={"Ciudad"}
                    selectedKeys={new Set([city])}
                    onSelectionChange={(keys) => handleCitySelection(keys as Set<string>)}
                    className="max-h-60 overflow-auto"
                >
                    {ciudades.length > 0 ? (
                        ciudades.map((ciudad) => (
                            <DropdownItem value={ciudad} key={ciudad}>{ciudad}</DropdownItem>
                        ))
                    ) : (
                        <DropdownItem key="no-cities">No cities available</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
