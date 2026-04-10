import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type JSX,
    type SetStateAction,
    type SubmitEvent,
} from "react";
import type { Block } from "../../types/types.tsx";
import { blockColors } from "../../types/colors.ts";

type BlockModalProps = {
    blocks: Block[];
    setBlocks: Dispatch<SetStateAction<Block[]>>;
    selectedIdBlock: number | null;
    setSelectedIdBlock: Dispatch<SetStateAction<number | null>>;
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

type formData = {
    title: string;
    description: string;
    notifications: boolean;
    color: string;
};

type formErrors = {
    title?: string;
    description?: string;
};

const BlockModal = (props: BlockModalProps): JSX.Element => {
    const [formData, setFormData] = useState<formData>({
        title: "",
        description: "",
        notifications: false,
        color: blockColors.Laranja,
    });
    const [formErrors, setFormErrors] = useState<formErrors>({});
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const modalDialog = useRef<HTMLDialogElement>(null);

    useEffect((): (() => void) => {
        if (props.selectedIdBlock !== null) {
            const block = props.blocks.find(
                (block) => block.id === props.selectedIdBlock,
            );

            if (block) {
                setFormData({
                    title: block.title,
                    description: block.description,
                    notifications: block.notifications,
                    color: block.color,
                });
            }
        }
        if (!props.isDialogOpen) return (): void => {};

        modalDialog.current?.showModal();
        document.body.style.overflow = "hidden";
        modalDialog.current?.addEventListener("close", closeModal);

        return (): void => {
            modalDialog.current?.removeEventListener("close", closeModal);
        };
    }, [props.isDialogOpen]);

    const closeModal = (): void => {
        modalDialog.current?.close();
        props.setSelectedIdBlock(null);
        props.setIsDialogOpen(false);
        setFormErrors({});
        setFormData({
            title: "",
            description: "",
            notifications: false,
            color: blockColors.Laranja,
        });
        document.body.style.overflow = "";
    };

    const validateForm = (): boolean => {
        const errors: formErrors = {};

        if (!formData.title.trim()) {
            errors.title = "O campo título é obrigatório";
        }
        if (formData.description.trim().length > 255) {
            errors.description =
                "A descrição não pode ter mais de 255 caracteres";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getBorderColor = (
        key: keyof formErrors,
        isFocused: boolean,
    ): string => {
        if (isFocused) return `2px solid ${formData.color}`;
        if (formErrors[key]) return `2px solid var(--red)`;
        return `1px solid var(--input-border-color)`;
    };

    return (
        <dialog
            className="form-modal"
            aria-labelledby="formTitle"
            ref={modalDialog}
            style={{
                borderColor: `${formData.color}4D`,
            }}
        >
            <form onSubmit={handleFormSubmit} className="modal-content">
                <h2 id="formTitle" style={{ color: formData.color }}>
                    {props.selectedIdBlock !== null
                        ? "Editar bloco de tarefas"
                        : "Criar bloco de tarefas"}
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
                <ul
                    className="color-options"
                    aria-label="Selecione a cor do bloco"
                >
                    {Object.entries(blockColors).map(([key, color]) => (
                        <li key={key}>
                            <label
                                style={{
                                    backgroundColor: color,
                                    boxShadow:
                                        formData.color === color
                                            ? `0 0 8px 2px ${color}`
                                            : "none",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={formData.color === color}
                                    onChange={() => {
                                        if (formData.color !== color)
                                            setFormData({ ...formData, color });
                                    }}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <label>
                    <input
                        type="text"
                        name="title"
                        maxLength={120}
                        value={formData.title}
                        style={{
                            border: getBorderColor("title", isTitleFocused),
                        }}
                        onChange={(e) => {
                            removeErrorKey("title");
                            setFormData((obj) => ({
                                ...obj,
                                title: e.target.value,
                            }));
                        }}
                        placeholder="Título do bloco *"
                        onFocus={() => setIsTitleFocused(true)}
                        onBlur={() => setIsTitleFocused(false)}
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
                        {formData.title.trim().length}/120
                    </span>
                    {formErrors.title && (
                        <span className="text-error">{formErrors.title}</span>
                    )}
                </label>
                <label>
                    <textarea
                        name="description"
                        maxLength={255}
                        value={formData.description}
                        placeholder="Descrição do bloco (opcional)"
                        style={{
                            border: getBorderColor(
                                "description",
                                isDescriptionFocused,
                            ),
                        }}
                        onChange={(e) => {
                            removeErrorKey("description");
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            });
                        }}
                        onFocus={() => setIsDescriptionFocused(true)}
                        onBlur={() => setIsDescriptionFocused(false)}
                    />
                    <span
                        className="text-length"
                        style={{
                            color:
                                formData.description.length == 255
                                    ? "var(--red)"
                                    : formData.description.length >= 170
                                      ? "#FFCA2C"
                                      : "var(--color)",
                        }}
                    >
                        {formData.description.length}/255
                    </span>
                    {formErrors.description && (
                        <span className="text-error">
                            {formErrors.description}
                        </span>
                    )}
                </label>
                <label className="switch" style={{ width: "fit-content" }}>
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
                            formData.notifications
                                ? { backgroundColor: formData.color }
                                : {}
                        }
                    ></span>
                    <span>Notificar</span>
                </label>
                <button
                    type="submit"
                    style={{ backgroundColor: `${formData.color}` }}
                    onClick={props.selectedIdBlock !== null ? editBlock : addBlock}
                >
                    {props.selectedIdBlock !== null ? "Salvar" : "Criar"} bloco
                </button>
            </form>
        </dialog>
    );

    function removeErrorKey(key: keyof formErrors): void {
        if (formErrors[key]) {
            const { [key]: _, ...rest } = formErrors;
            setFormErrors(rest);
        }
    }

    function handleFormSubmit(e: SubmitEvent<HTMLFormElement>): void {
        e.preventDefault();
        props.selectedIdBlock !== null ? editBlock : addBlock;
    }

    function editBlock(): void {
        if (!validateForm() || props.selectedIdBlock === null) {
            return;
        }

        const blocksUpdated = props.blocks.map((block) => {
            if (block.id === props.selectedIdBlock) {
                return {
                    ...block,
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    notifications: formData.notifications,
                    color: formData.color,
                };
            }
            return block;
        });
        props.setBlocks(blocksUpdated);
        closeModal();
    }

    function addBlock(): void {
        console.log("Antes de validar", formData);
        if (!validateForm()) {
            return;
        }

        console.log("dfgdfgdfgdfgfdg")

        props.setBlocks((prev) => [
            ...prev,
            {
                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
                title: formData.title.trim(),
                description: formData.description.trim(),
                notifications: formData.notifications,
                color: formData.color,
                tasks: [],
                countTasksDone: 0,
            },
        ]);
        closeModal();
    }
};

export default BlockModal;
