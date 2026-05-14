import { useEffect, useRef, type Dispatch, type JSX, type SetStateAction } from "react";
//import "../css/components/alertDialog.css";

type AlertBoxProps = {
    isAlertOpen: boolean,
    setIsAlertOpen: Dispatch<SetStateAction<boolean>>,
    title: string,
    children: string,
    type: "info" | "delete" | "warning" | "error",
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

    // Icones para cada tipo de alerta do fonts.google.com modificados

    const warningErrorIcon: JSX.Element = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`status-icon ${props.type === "error" ? "error" : "warning"}`}
            style={{
                fill: props.type === "error" ? "#ff6467" : "#FFF066"
            }}
        >
            <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm330.5-51.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Zm40-100Z"/>
        </svg>
    )

    const deleteIcon: JSX.Element = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="status-icon delete"
            fill="#ff6467"
        >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    )

    const infoIcon: JSX.Element = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="status-icon info"
            fill="#00b8db"
        >
            <path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    )

    return (
        <dialog
            className="alert-box"
            ref={alertDialog}
            aria-labelledby="alertbox-title"
            aria-describedby="alertbox-text"
        >
            <div>
                <div
                    className="content"
                >
                    {
                        props.type === "delete" ? deleteIcon :
                        props.type === "error" ? warningErrorIcon :
                        props.type === "warning" ? warningErrorIcon :
                        props.type === "info" ? infoIcon :
                        null
                    }
                    <div>
                        <h2
                            id="alertbox-title"
                        >
                            {props.title}
                        </h2>
                        <p
                            id="alertbox-text"
                        >{props.children}</p>
                    </div>
                    <button type="button" className="close" onClick={closeDialog} aria-label="Fechar">
                        {/* Ícone fechar do fonts.google.com modificado */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#F7F7F7"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>
                </div>
                {props.onConfirm && (
                    <div
                        className="options"
                    >
                        {
                            (props.type === "delete" || props.type === "error") && (
                                <button
                                    type="button"
                                    onClick={closeDialog}
                                    style={{border: "2px solid #404E63"}}
                                >
                                    Cancelar
                                </button>
                            )
                        }
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
                            {props.confirmButtonText || "Ok"}
                        </button>
                    </div>
                )}
            </div>
        </dialog>
    );
};
export default AlertBox;
