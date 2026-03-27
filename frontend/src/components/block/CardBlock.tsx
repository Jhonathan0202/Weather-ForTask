import type { CSSProperties, JSX, Dispatch, SetStateAction } from "react";
import type { Block } from "../../types/types";
import { useNavigate } from "react-router";

type CardBlockProps = {
    block: Block;
    selectedIdBlock: number | null;
    setSelectedIdBlock: Dispatch<SetStateAction<number | null>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const CardBlock = (props: CardBlockProps): JSX.Element => {
    const navigator = useNavigate();

    const blockStyle: CSSProperties = {
        border: `2px solid ${props.block.color}4D`,
        backgroundImage: `linear-gradient(135deg, ${props.block.color}12 0%, rgba(255,255,255,0.025) 100%)`,
    };

    return (
        <div className="card" style={blockStyle} key={props.block.id}>
            <button
                type="button"
                className="card-content"
                style={
                    props.selectedIdBlock === props.block.id
                        ? { borderBottom: `1px solid ${props.block.color}` }
                        : undefined
                }
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
                            // Ícone do fonts.google.com de sino modificado para ter cor sólida
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Notificações habilitadas"
                                viewBox="0 -960 960 960"
                                fill="#fddc5f"
                                style={{
                                    height: "20px",
                                    width: "20px",
                                }}
                            >
                                <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80M160-200v-80h80v-280q0-100 70-170t170-70 170 70 70 170v280h80v80z" />
                                <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560zM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80M320-280h320v-280q0-66-47-113t-113-47-113 47-47 113z" />
                            </svg>
                        )}
                    </div>
                </div>
                <span
                    style={
                        props.selectedIdBlock === props.block.id
                            ? { transform: "rotate(180deg)" }
                            : undefined
                    }
                >
                    ▼
                </span>
            </button>
            <div
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
                            className={
                                props.block.tasks.length === 0 ? "desable" : ""
                            }
                            onClick={(): void => {
                                props.block.tasks.length > 0 ? navigator(`block/${props.block.id}/tasks`) : undefined
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
                    >
                        <button type="button">Excluir</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CardBlock;
