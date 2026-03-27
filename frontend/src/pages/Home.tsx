import { useEffect, useState } from "react";
import { dataBlocks } from "../assets/tempData.ts";
import type { JSX } from "react";
import BlockModal from "../components/block/BlockModal.tsx";
import CardBlock from "../components/block/CardBlock.tsx";
import BlockFilter from "../components/block/BlockFilter.tsx";
import SearchInput from "../components/SearchInput.tsx";
import type { Block } from "../types/types.ts";

const Home = (): JSX.Element => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [selectedIdBlock, setSelectedIdBlock] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    /* Dados de teste iniciais para os blocos */
    useEffect((): void => {
        setBlocks(dataBlocks);
    }, []);

    const filteredBlocks = (): Block[] => {
        if (query.trim() === "") return blocks;
        return blocks.filter((block: Block): boolean => {
            const title = block.title.toLowerCase();
            const description = block.description.toLowerCase();
            const searchQuery = query.toLowerCase();

            return (
                title.includes(searchQuery) || description.includes(searchQuery)
            );
        });
    };

    const cardBlocks: JSX.Element[] = filteredBlocks().map(
        (obj: Block): JSX.Element => {
            return (
                <CardBlock
                    key={obj.id}
                    block={obj}
                    selectedIdBlock={selectedIdBlock}
                    setSelectedIdBlock={setSelectedIdBlock}
                    setIsDialogOpen={setIsDialogOpen}
                />
            );
        },
    );

    return (
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
                    placeholder="Pesquisar bloco..."
                />
            )}
            {
                isFilterOpen && <BlockFilter />
            }
            <button
                className="add"
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
                {/* Ícone adicionar do fonts.google.com modificado */}
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
                    <div className="card-wrapper">{cardBlocks}</div>
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
        </main>
    );
};

export default Home;
