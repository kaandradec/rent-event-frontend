import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export const DeleteModal = ({ isOpen, onClose, handleCancelEvent }) => {
    return (
        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">¿Está seguro de que desea cancelar el evento?</ModalHeader>
                        <ModalBody>
                            <p>
                                Al cancelar el evento, tendrá que pagar una multa del 30% del costo total del evento.
                            </p>
                            <p>
                                Esta acción no se puede deshacer. Si está seguro de que desea cancelar el evento, haga clic en "Cancelar Evento".
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cerrar ventana
                            </Button>
                            <Button color="danger" onPress={handleCancelEvent}>
                                Cancelar Evento
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}