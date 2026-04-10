import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Task, Block } from "../../types/types";
import * as dataHandler from "../../utils/DateHandler";

type FormData = {
    title: string,
    notifications: boolean,
    scheduledDate: Date,
    consultWeather: boolean,
    done: boolean,
};

type FormErrors = {
    title?: string,
};

type TaskModalProps = {
    block: Block | undefined,
    setBloks: Dispatch<SetStateAction<Block[]>>,
    isDialogOpen: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>,
    onEdit: () => void,
    onAdd: () => void,
    task?: Task,
}

const TaskModal = (props: TaskModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        notifications: props.block?.notifications || false,
        scheduledDate: new Date(),
        consultWeather: true,
        done: false,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const modalDialog = useRef<HTMLDialogElement>(null);

    useEffect((): (() => void) => {
        if (!props.isDialogOpen) return (): void => {};

        console.log()

        modalDialog.current?.showModal();
        document.body.style.overflow = "hidden";
        modalDialog.current?.addEventListener("close", closeModal);

        return (): void => {
            modalDialog.current?.removeEventListener("close", closeModal);
        };
    }, [props.isDialogOpen]);

    const closeModal = (): void => {
        modalDialog.current?.close();
        props.setIsDialogOpen(false);
        setFormErrors({});
        setFormData({
            title: "",
            notifications: false,
            scheduledDate: dataHandler.dateAdd(new Date(), 1),
            consultWeather: true,
            done: false
        });
        document.body.style.overflow = "";
    };

    return (
        <dialog
            className="form-modal"
            ref={modalDialog}
            style={{
                borderColor: `var(--input-border-color)`,
            }}
        >
            <form action="" className="modal-content">
                <h2 id="formTitle">
                    Criar uma nova tarefa
                </h2>
                <button
                    type="button"
                    className="close"
                    aria-label="Fechar"
                    onClick={() => {
                        closeModal();
                    }}
                >
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
                <label>
                    <input
                        type="text"
                        name="task"
                        placeholder="Tarefa..."
                        onChange={(e) => {
                            removeErrorKey("title");
                            setFormData((data) => {
                                return { ...data, title: e.target.value }
                            })
                        }}
                        value={formData.title}
                    />
                </label>
                <div
                    style={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        gap: "10px"//justifyContent: "space-around"
                    }}
                >
                    <label className="switch">
                        <input
                            type="checkbox"
                            name="notify"
                            role="switch"
                            className="sr-only"
                            checked={formData.notifications}
                            onChange={(): void =>
                                setFormData((data) => ({
                                    ...data,
                                    notifications: !data.notifications,
                                }))
                            }
                        />
                        <span
                            className="slider"
                            style={
                                formData.notifications ? {
                                    backgroundColor: "#ddad00"
                                } : {}
                            }
                        ></span>
                        <span>Notificar</span>
                    </label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            name="notify"
                            role="switch"
                            className="sr-only"
                            checked={formData.consultWeather}
                            onChange={(): void =>
                                setFormData((data) => ({
                                    ...data,
                                    consultWeather: !data.consultWeather,
                                }))
                            }
                        />
                        <span
                            className="slider"
                            style={
                                formData.consultWeather ? {
                                    backgroundColor: "#8E4F88"
                                } : {}
                            }
                        ></span>
                        <span>Consultar clima</span>
                    </label>
                </div>
                <button type="submit" style={{backgroundColor: "#39FF14", color: "var(--black-1)"}}>
                    Adicionar
                </button>
            </form>
        </dialog>
    );

    function removeErrorKey(key: keyof FormErrors): void {
        if (formErrors[key]) {
            const { [key]: _, ...rest } = formErrors;
            setFormErrors(rest);
        }
    }
};
export default TaskModal;
