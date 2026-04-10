import type { Dispatch, JSX, SetStateAction } from "react";
import type { Task } from "../../types/types";
import * as dataHandler from "../../utils/DateHandler"

type TaskItemProps = {
    task: Task,
    setTasks: Dispatch<SetStateAction<Task[]>>,
    tasks: SetStateAction<Task[]>,
    setSelectedIdTask: Dispatch<SetStateAction<null | number>>,
    setIsAlertOpen: Dispatch<SetStateAction<boolean>>,
}

const TaskItem = (props: TaskItemProps): JSX.Element => {

    const diffDays: number = dataHandler.diffInDays(props.task.scheduledDate);
    
    const scaduledDate: string =
        diffDays > 31 || diffDays < 0
            ? dataHandler.formatDate(props.task.scheduledDate)
            : diffDays > 0
                ? `${diffDays} dia(s) restantes`
                : dataHandler.formatTime(props.task.scheduledDate);

    const status: string =
        dataHandler.diffInSecs(props.task.scheduledDate) <= 0
            ? "delayed"
            : dataHandler.diffInSecs(props.task.scheduledDate) <= 86400
                ? "warning"
                : "";

    return (
        <li
            key={props.task.id}
            className={
                (props.task.done ? "task-item done " : "task-item ") + status
            }
        >
            <input
                type="checkbox"
                checked={props.task.done}
                aria-label={
                    props.task.done
                        ? "Desmarcar tarefa como concluída"
                        : "Marcar tarefa como concluída"
                }
                onChange={() => {
                    props.task.done = !props.task.done;
                    props.setTasks([...(props.tasks as [])]);
                }}
            />
            <div className="task-details">
                <h2>{props.task.title}</h2>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "row",
                    }}
                >
                    <span className="badge">{scaduledDate}</span>
                    {props.task.consultWeather && (
                        <span className="badge weather">
                            Consultar previsão do tempo
                        </span>
                    )}
                </div>
            </div>
            <button
                className="btn-option btn-edit"
                type="button"
                aria-label="Editar tarefa"
                onClick={() => {
                    props.setSelectedIdTask(props.task.id);
                    alert("Em Construção.");
                }}
            >
                {/* Ícone de editar do fonts.google.com modificado */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
            </button>
            <button
                className="btn-option btn-delete"
                type="button"
                aria-label="Excluir tarefa"
                onClick={() => {
                    props.setSelectedIdTask(props.task.id);
                    props.setIsAlertOpen(true)
                }}
            >
                {/* Ícone de excluir do fonts.google.com modificado */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
        </li>
    );
};

export default TaskItem;
