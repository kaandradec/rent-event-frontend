import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";


export const BotonVolver = () => {


    const navigate = useNavigate();

    const volver = () => {
        navigate('/account/config')
    }

    return (
            <Button variant="flat" className="container flex max-w-40 h-14 text-black dark:text-white"
                    color="default" onClick={volver}>
                Volver
            </Button>
    );
};
