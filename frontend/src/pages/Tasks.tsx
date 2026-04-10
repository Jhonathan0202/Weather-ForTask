import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import type { Task, Block } from "../types/types";
import { dataTasks } from "../assets/tempData";
import { useNavigate, useParams } from "react-router";
import SearchInput from "../components/SearchInput";
import AlertBox from "../components/AlertBox";
import TaskItem from "../components/Task/TaskItem";
import TaskModal from "../components/Task/TaskModal";

type TaskProps = {
    blocks: Block[],
    setBlocks: Dispatch<SetStateAction<Block[]>>,
}

const Tasks = ({ blocks, setBlocks }: TaskProps): JSX.Element => {
    const { blockId } = useParams<{ blockId: string }>();
    const [query, setQuery] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedIdTask, setSelectedIdTask] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [block, setBlock] = useState<Block>();
    const navigate = useNavigate();

    useEffect((): void => {
        const foundBlock = blocks.find(
            (b: Block): boolean => b.id === parseInt(blockId ? blockId : "0"),
        );
        setBlock(foundBlock);
        setTasks(
            dataTasks.filter((t: Task): boolean | undefined =>
                foundBlock?.tasks.includes(t.id),
            ),
        );
    }, [blockId, blocks]);

    const filteredTasks = (): Task[] => {
        if (query.trim() === "") return tasks;

        return tasks.filter((task: Task): boolean => {
            const title = task.title.toLowerCase();
            const searchQuery = query.toLowerCase();

            return title.includes(searchQuery);
        });
    }

    const taskItem = (task: Task): JSX.Element => {
        return <TaskItem
            key={task.id}
            task={task}
            tasks={tasks}
            setIsAlertOpen={setIsAlertOpen}
            setTasks={setTasks}
            setSelectedIdTask={setSelectedIdTask}
        />
    };

    const unDoneTasks: Task[] = filteredTasks().filter((t: Task): boolean => !t.done);
    const doneTasks: Task[] = filteredTasks().filter((t: Task): boolean => t.done);

    const tasksElements = (): JSX.Element => {
        if (tasks.length === 0) {
            return <p>Nenhuma tarefa encontrada para este bloco.</p>;
        }

        return (
            <div style={{display: "flex", flexFlow: "column nowrap", margin: "10px", gap: "10px"}}>
                {
                    unDoneTasks.length > 0 && (
                        <>
                            <button className="btn-group" aria-expanded="true">
                            Tarefas pendentes
                            </button>
                            <ul className="tasks-wrapper">
                                {
                                    unDoneTasks.map(
                                        (task: Task): JSX.Element => taskItem(task)
                                    )
                                }
                            </ul>
                        </>
                    )
                }
                {
                    doneTasks.length > 0 && (
                        <>
                            <button className="btn-group" aria-expanded="true">
                            Tarefas completas
                            </button>
                            <ul className="tasks-wrapper">
                                {
                                    doneTasks.map(
                                        (task: Task): JSX.Element => taskItem(task)
                                    )
                                }
                            </ul>
                        </>
                    )
                }
            </div>
        );
    };

    const numDoneTasks: number = tasks.length > 0 ? tasks.filter((t: Task): boolean => t.done).length : 0;
    const porcentDone: number = tasks.length > 0 ? Math.round((numDoneTasks / tasks.length) * 100) : 0;

    return (
        <>
            <header className="block-details">
                <div>
                    <button
                        aria-label="Voltar para a página anterior"
                        onClick={() => navigate(-1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                        >
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                    </button>
                    <h1>{block?.title}</h1>
                </div>
                <p>{block?.description}</p>
                <label>
                    {
                        tasks.length > 0 &&
                        (
                            <div
                                role="progressbar"
                                aria-valuenow={doneTasks.length}
                                aria-valuemax={tasks.length}
                                aria-valuemin={0}
                                className="progress-bar"
                            >
                                <div
                                    style={{
                                        width: `${porcentDone}%`,
                                        backgroundColor: porcentDone < 100 ? `var(--highlight-color)` : `#39FF14`,
                                    }}
                                ></div>
                            </div>
                        )
                    }
                    {
                        tasks.length > 0 &&
                        (
                            porcentDone === 100 ?
                            "Concluído" :
                            `${porcentDone}%`
                        )
                    }
                </label>
            </header>
            <main
                style={
                    tasks.length === 0 ?
                    {
                        display: "flex",
                        flexFlow: "column nowrap",
                        placeContent: "center",
                        gap: "20px",
                        alignItems: "center",
                    } : {}
                }
            >
                {
                    tasks.length > 0 &&
                    <SearchInput
                        query={query}
                        setQuery={setQuery}
                        placeholder="Pesquisar task..."
                    />
                }
                <button
                    className={"add" + (tasks.length === 0 ? " pulse " : "")}
                    aria-label="Criar um novo bloco"
                    style={
                        tasks.length > 0
                            ? {
                                  position: "fixed",
                                  bottom: "15px",
                                  right: "15px",
                              }
                            : undefined
                    }
                    onClick={() => {
                        setIsDialogOpen(true)
                    }}
                >
                    {/* Ícone adicionar do fonts.google.com modificado */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#030303"
                    >
                        <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
                    </svg>
                </button>
                {tasksElements()}
                <AlertBox
                    isAlertOpen={isAlertOpen}
                    setIsAlertOpen={setIsAlertOpen}
                    title="Deseja excluir esta tarefa?"
                    confirmButtonText="Excluir"
                    color="var(--red)"
                    onConfirm={deleteTask}
                >
                    Uma vez excluida não há como recuperar a tarefa.
                </AlertBox>
                <TaskModal
                    block={block}
                    setBloks={setBlocks}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    onEdit={editTask}
                    onAdd={addTask}
                />
            </main>
        </>
    );

    function editTask(): void {
        if(selectedIdTask === null) return;
        // TODO: Implementar função de editar tarefa
        setSelectedIdTask(null);
    }

    function addTask(): void {
        // TODO: Implementar função de adição
    }

    function deleteTask(): void {
        if(selectedIdTask === null) return;

        const newTasks = tasks.filter((task: Task) => task.id !== selectedIdTask);
        const newCountTasksDone = newTasks.filter((task: Task) => task.done === true).length;
        const newTasksIds = newTasks.map((task: Task) => task.id);

        setTasks(newTasks);

        setBlocks((prevBlocks: Block[]) =>
            prevBlocks.map((block: Block) =>
                block.id.toString() === blockId
                    ? { ...block, countTasksDone: newCountTasksDone, tasks: newTasksIds }
                    : block
            )
        );

        setSelectedIdTask(null);
    }
};
export default Tasks;
