import { Button } from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

export const BotonCrearEvento= () => {
const navigate = useNavigate();
    return (
            <Button
                onClick={() => navigate("/services")}
                size="lg"
                color="warning"
                variant="shadow"
                className="font-bold px-12"
            >
                CREAR EVENTO
            </Button>
    );
};