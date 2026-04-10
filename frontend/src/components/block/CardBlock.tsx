import type { CSSProperties, JSX, Dispatch, SetStateAction } from "react";
import type { Block } from "../../types/types";
import { useNavigate } from "react-router";
import { blockColors } from "../../types/colors";

type CardBlockProps = {
    block: Block;
    selectedIdBlock: number | null;
    setSelectedIdBlock: Dispatch<SetStateAction<number | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    onDelete?: () => void;
};

const CardBlock = (props: CardBlockProps): JSX.Element => {
    const navigator = useNavigate();

    const blockStyle: CSSProperties = {
        border: `2px solid ${props.block.color}4D`,
        backgroundImage: `linear-gradient(135deg, ${props.block.color}12 0%, rgba(255,255,255,0.025) 100%)`,
    };

    return (
        <article
            className="card"
            style={blockStyle}
            key={props.block.id}
        >
            <button
                type="button"
                className="card-content"
                style={
                    props.selectedIdBlock === props.block.id
                        ? { borderBottom: `1px solid ${props.block.color}` }
                        : undefined
                }
                aria-label={`Bloco da categoria ${
                    Object.keys(blockColors).find(
                        (key) =>
                            blockColors[key as keyof typeof blockColors] ===
                            props.block.color,
                    ) ?? "Desconhecida"
                }`}
                aria-expanded={props.selectedIdBlock === props.block.id}
                onClick={() => {
                    props.setSelectedIdBlock(
                        props.selectedIdBlock === props.block.id
                            ? null
                            : props.block.id,
                    );
                }}
            >
                <div>
                    <h2>{props.block.title}</h2>
                    <p>
                        {props.block.description.length > 0
                            ? props.block.description
                            : "Sem descrição"}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "left",
                            gap: "10px",
                            flexFlow: "row nowrap",
                        }}
                    >
                        <span className="badge">
                            Tarefas: {props.block.countTasksDone}/
                            {props.block.tasks.length}
                        </span>
                        {props.block.notifications && (
                            // Ícone de notificação do fonts.google.com modificado
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Notificações habilitadas"
                                height="20px"
                                width="20px"
                                viewBox="0 -960 960 960"
                                fill="#fddc5f"
                            >
                                <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80Z"/>
                            </svg>
                        )}
                    </div>
                </div>
                {/* Ícone de seta para baixo do fonts.google.com modificado */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    style={
                    props.selectedIdBlock === props.block.id
                            ? { transform: "rotate(180deg)" }
                            : undefined
                    }
                >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
            </button>
            <section
                className={
                    "card-options" +
                    (props.selectedIdBlock === props.block.id ? " active" : "")
                }
                onClick={(e) => e.stopPropagation()}
            >
                <ul>
                    <li
                        style={{
                            borderRight: `1px solid ${props.block.color}`,
                        }}
                    >
                        <button
                            type="button"
                            onClick={(): void => {
                                navigator(`block/${props.block.id}/tasks`, {
                                    state: {
                                        block: props.block,
                                    },
                                })
                            }}
                        >
                            Visualizar tarefas
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={(): void => {
                                props.setSelectedIdBlock(props.block.id);
                                props.setIsDialogOpen(true);
                            }}
                        >
                            Editar
                        </button>
                    </li>
                    <li
                        style={{ borderLeft: `1px solid ${props.block.color}` }}
                        onClick={props.onDelete}
                    >
                        <button type="button">Excluir</button>
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default CardBlock;
