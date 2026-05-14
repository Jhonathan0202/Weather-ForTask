import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Task, Block } from "../../types/types";
import * as dataHandler from "../../utils/DateHandler";

type FormData = {
    title: string,
    notifications: boolean,
    date: string,
    time: string,
    consultWeather: boolean,
    done: boolean,
};

type FormErrors = {
    title?: string,
    date?: string,
    time?: string,
};

type TaskModalProps = {
    block: Block | undefined,
    isDialogOpen: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>,
    onEdit: (task: Task) => void,
    onAdd: (task: Task) => void,
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    selectedIdTask?: number | null,
    setSelectedIdTask?: Dispatch<SetStateAction<number | null>>,
}

const TaskModal = (props: TaskModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        notifications: false,
        date: dataHandler.formatDate(new Date(), "en-US"),
        time: dataHandler.formatTime(new Date()),
        consultWeather: true,
        done: false,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const modalDialog = useRef<HTMLDialogElement>(null);

    useEffect((): (() => void) => {
        if (!props.isDialogOpen) return (): void => {};

        if(props.selectedIdTask) {
            const task = props.tasks.find((t: Task): boolean => t.id === props.selectedIdTask);
            if(task) {
                setFormData({
                    title: task.title,
                    notifications: task.notifications,
                    date: dataHandler.formatDate(task.scheduledDate, "en-US"),
                    time: dataHandler.formatTime(task.scheduledDate),
                    consultWeather: task.consultWeather,
                    done: task.done
                });
            }
        }
        else if(props.block) {
            setFormData({
                ...formData,
                notifications: props.block.notifications
            });
        }

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
        props.setSelectedIdTask && props.setSelectedIdTask(null);
        setFormErrors({});
        setFormData({
            title: "",
            notifications: false,
            date: dataHandler.formatDate(new Date(), "en-US"),
            time: dataHandler.formatTime(new Date()),
            consultWeather: true,
            done: false
        });
        document.body.style.overflow = "";
    };

    return (
        <dialog
            className="form-modal"
            aria-labelledby="form-task-title"
            ref={modalDialog}
            style={{
                borderColor: `var(--input-border-color)`,
            }}
        >
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="modal-content">
                <h2 id="form-task-title">
                    {
                        props.selectedIdTask ?
                            "Editar tarefa"
                        :
                            "Criar uma nova tarefa"
                    }
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
                        maxLength={120}
                        onChange={(e) => {
                            removeErrorKey("title");
                            setFormData((data) => {
                                return { ...data, title: e.target.value }
                            })
                        }}
                        value={formData.title}
                    />
                    <span
                        className="text-length"
                        style={{
                            color:
                                formData.title.trim().length == 120
                                    ? "var(--red)"
                                    : formData.title.trim().length >= 90
                                      ? "#FFCA2C"
                                      : "var(--color)",
                        }}
                    >
                        {formData.title.length}/120
                    </span>
                </label>
                <label style={{display: "flex", flexFlow: "column nowrap", gap: "10px"}}>
                    data para realizar a tarefa:
                    <div className="date-time">
                        <input
                            type="date"
                            min={dataHandler.formatDate(new Date(), "en-US")}
                            value={formData.date}
                            onChange={(e): void => {
                                setFormData({
                                    ...formData,
                                    date: e.target.value
                                })
                            }}
                        />
                        <input
                            type="time"
                            value={formData.time}
                            min={
                                formData.date === dataHandler.formatDate(new Date(), "en-US") ?
                                    dataHandler.formatTime(new Date())
                                :
                                    ""
                            }
                            step={1}
                            onChange={(e): void => {
                                setFormData({
                                    ...formData,
                                    time: `${e.target.value}`
                                })
                            }}
                        />
                    </div>
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
                        {
                            formData.notifications ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ddad00"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80Z"/></svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--light-gray)"><path d="M160-200v-80h80v-280q0-33 8.5-65t25.5-61l126 126H288L56-792l56-56 736 736-56 56-146-144H160Zm560-154L328-746q20-16 43-28t49-18v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v206ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Z"/></svg>
                        }
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
                        {
                            /* Ícones cloud e cloud off do fonts.google.com modificado */
                            formData.consultWeather ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#8E4F88"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Z"/></svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--light-gray)"><path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56Zm72-154L322-751q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210Z"/></svg>
                        }
                        <span>Consultar clima</span>
                    </label>
                </div>
                <button type="submit" style={{backgroundColor: "#39FF14", color: "var(--black-1)"}}>
                    {props.selectedIdTask ? "Atualizar" : "Adicionar"}
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

    function handleSubmit(): void {
        if (!validateForm()) return;

        const taskData: Task = {
            id: props.selectedIdTask ? props.selectedIdTask : Date.now(),
            title: formData.title,
            consultWeather: formData.consultWeather,
            done: formData.done,
            scheduledDate: dataHandler.stringToDatetime(formData.date, formData.time),
            notifications: formData.notifications,
        }

        if (props.selectedIdTask) {
            props.onEdit(taskData);
        } else {
            props.onAdd(taskData);
        }

        closeModal();
    }

    function validateForm(): boolean {
        const errors: FormErrors = {};
        
        const todayDate = new Date().setHours(0, 0, 0, 0);
        const selectedDate = dataHandler.stringToDatetime(formData.date, formData.time).setHours(0, 0, 0, 0);
        const currentTime = new Date().getTime();
        const selectedDateTime = dataHandler.stringToDatetime(formData.date, formData.time).getTime();

        if(todayDate > selectedDate) {
            errors.date = "A data selecionada é inválida, por favor selecione uma data futura ou a data atual.";
        }

        if(todayDate === selectedDate) {
            if(currentTime > selectedDateTime) {
                errors.time = "O horário selecionado é inválido, por favor selecione um horário futuro.";
            }
        }

        if(formData.title.trim() === "") {
            errors.title = "O título da tarefa é obrigatório.";
        }

        if(formData.title.trim().length > 120) {
            errors.title = "O título da tarefa deve conter no máximo 120 caracteres.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }
};
export default TaskModal;
