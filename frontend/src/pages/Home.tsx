import { useState } from "react";
import type { JSX, Dispatch, SetStateAction } from "react";
import type { Block } from "../types/types.ts";
import type { BlockColors } from "../types/colors.ts";
import BlockModal from "../components/block/BlockModal.tsx";
import CardBlock from "../components/block/CardBlock.tsx";
import BlockFilter from "../components/block/BlockFilter.tsx";
import SearchInput from "../components/SearchInput.tsx";
import AlertBox from "../components/AlertBox.tsx";

type HomeProps = {
    blocks: Block[],
    setBlocks: Dispatch<SetStateAction<Block[]>>,
};

const Home = ({ blocks, setBlocks }: HomeProps): JSX.Element => {
    const [selectedIdBlock, setSelectedIdBlock] = useState<number | null>(null);
    const [query, setQuery] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [filterColor, setFilterColor] = useState<BlockColors[]>([]);

    /* Dados de teste iniciais para os blocos */

    const filteredBlocks = (): Block[] => {
        if (query.trim() === "" && filterColor.length === 0) return blocks;
        return blocks.filter((block: Block): boolean => {
            const title = block.title.toLowerCase();
            const description = block.description.toLowerCase();
            const searchQuery = query.toLowerCase();

            if (filterColor.length === 0) {
                return (
                    title.includes(searchQuery) ||
                    description.includes(searchQuery)
                );
            }

            return (
                (title.includes(searchQuery) ||
                    description.includes(searchQuery)) &&
                filterColor.includes(block.color)
            );
        });
    };

    const cardBlocks: JSX.Element[] = filteredBlocks().map(
        (obj: Block): JSX.Element => {
            return (
                <li key={obj.id}>
                    <CardBlock
                        block={obj}
                        selectedIdBlock={selectedIdBlock}
                        setSelectedIdBlock={setSelectedIdBlock}
                        setIsDialogOpen={setIsDialogOpen}
                        onDelete={(): void => setIsAlertOpen(true)}
                    />
                </li>
            );
        },
    );

    return (
        <>
            <main
                style={
                    blocks.length == 0
                        ? {
                              display: "flex",
                              flexFlow: "column nowrap",
                              placeContent: "center",
                              gap: "20px",
                              alignItems: "center",
                          }
                        : { display: "flex", flexFlow: "column nowrap" }
                }
            >
                {blocks.length > 0 && (
                    <SearchInput
                        isFilterOpen={isFilterOpen}
                        setIsFilterOpen={setIsFilterOpen}
                        query={query}
                        setQuery={setQuery}
                        filterNum={filterColor.length}
                        placeholder="Pesquisar bloco..."
                    />
                )}
                {isFilterOpen && (
                    <BlockFilter
                        setFilterColor={setFilterColor}
                        filterColor={filterColor}
                    />
                )}
                <button
                    className={"add" + (blocks.length === 0 ? " pulse " : "")}
                    aria-label="Criar um novo bloco"
                    style={
                        blocks.length > 0
                            ? {
                                  position: "fixed",
                                  bottom: "15px",
                                  right: "15px",
                              }
                            : undefined
                    }
                    onClick={() => {
                        setSelectedIdBlock(null);
                        setIsDialogOpen(true);
                    }}
                >
                    {/* Ícone de adicionar do fonts.google.com modificado */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#030303"
                    >
                        <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
                    </svg>
                </button>
                {blocks.length == 0 ? (
                    <p
                        style={{
                            fontSize: "1rem",
                            textAlign: "center",
                        }}
                    >
                        Não há nenhum bloco de tarefas.
                        <br />
                        Criar um novo?
                    </p>
                ) : filteredBlocks().length > 0 ? (
                    <>
                        <ul className="card-wrapper">{cardBlocks}</ul>
                    </>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            height: "100%",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1rem",
                                textAlign: "center",
                            }}
                        >
                            Nenhum bloco encontrado.
                        </p>
                    </div>
                )}
                <BlockModal
                    blocks={blocks}
                    setBlocks={setBlocks}
                    setSelectedIdBlock={setSelectedIdBlock}
                    selectedIdBlock={selectedIdBlock}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                />
                <AlertBox
                    isAlertOpen={isAlertOpen}
                    setIsAlertOpen={setIsAlertOpen}
                    title="Deseja excluir este bloco?"
                    confirmButtonText="Excluir"
                    color="var(--red)"
                    onConfirm={deleteBlock}
                >
                    Uma vez excluído não sera possível recuperar o bloco ou suas
                    tarefas.
                </AlertBox>
            </main>
        </>
    );

    function deleteBlock(): void {
        if (selectedIdBlock === null) return;

        const blocksUpdated = blocks.filter(
            (block) => block.id !== selectedIdBlock,
        );

        setBlocks(blocksUpdated);
    }
};

export default Home;
