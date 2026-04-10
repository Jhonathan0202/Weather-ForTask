import { useEffect, useRef, type Dispatch, type JSX, type SetStateAction } from "react";
//import "../css/components/alertDialog.css";

type AlertBoxProps = {
    isAlertOpen: boolean,
    setIsAlertOpen: Dispatch<SetStateAction<boolean>>,
    title: string,
    children: string,
    color?: string,
    confirmButtonText?: string,
    onConfirm?: () => void,
};

const AlertBox = (props: AlertBoxProps): JSX.Element => {
    const alertDialog = useRef<HTMLDialogElement>(null);

    useEffect((): (() => void) => {
        if (!props.isAlertOpen) return () => {};

        alertDialog.current?.showModal();

        return () => {
            alertDialog.current?.close();
        }
    }, [props.isAlertOpen]);

    function closeDialog(): void {
        alertDialog.current?.close();
        props.setIsAlertOpen(false);
    }

    return (
        <dialog
            className="alert-box"
            ref={alertDialog}
        >
            <div>
                <h2
                    style={props.color? { textAlign: "center", color: props.color } : { textAlign: "center" }}
                >{props.title}</h2>
                {
                    !props.onConfirm &&
                    <button type="button" className="close" onClick={closeDialog} aria-label="Fechar">
                        {/* Ícone fechar do fonts.google.com modificado */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#F7F7F7"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>
                }
                <p
                    style={{textAlign: "center"}}
                >{props.children}</p>
                {props.onConfirm && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                        }}
                    >
                        <button
                            type="button"
                            onClick={closeDialog}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            style={props.color? {
                                backgroundColor: props.color
                            }: {}}
                            onClick={() => {
                                props.onConfirm?.();
                                closeDialog();
                            }}
                        >
                            {props.confirmButtonText || "Sim"}
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
export default AlertBox;
