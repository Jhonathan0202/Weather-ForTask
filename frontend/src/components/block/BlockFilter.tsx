import type { JSX } from "react";
//import "../../css/components/blockFilter.css";
import { blockColors, type BlockColors } from "../../types/colors.ts";

type BlockFilterProps = {
    filterColor: BlockColors[],
    setFilterColor: React.Dispatch<React.SetStateAction<BlockColors[]>>,
};

const BlockFilter = ({ filterColor, setFilterColor }: BlockFilterProps) => {
    return (
        <div
            style={{
                padding: "15px 10px",
            }}
        >
            <section className="filter-wrapper">
                <h3>Cor: </h3>
                {Object.entries(blockColors).map(
                    ([colorName, colorValue]: [
                        string,
                        string,
                    ]): JSX.Element => (
                        <button
                            key={colorName}
                            className="color-option badge"
                            style={
                                Object.values(filterColor).includes(colorValue)
                                    ? {
                                          border: `1px solid ${colorValue}`,
                                          backgroundColor: `${colorValue}4D`,
                                          color: "var(--color)",
                                      }
                                    : {}
                            }
                            aria-label={`Filtrar blocos pela cor ${colorName}`}
                            aria-pressed={Object.values(filterColor).includes(
                                colorValue,
                            )}
                            onClick={() => {
                                !Object.values(filterColor).includes(colorValue)
                                    ? setFilterColor((prevColors) => [
                                          ...prevColors,
                                          colorValue,
                                      ])
                                    : setFilterColor((prevColors) =>
                                          prevColors.filter(
                                              (color) => color !== colorValue,
                                          ),
                                      );
                                
                            }}
                        >
                            {colorName}
                        </button>
                    ),
                )}
                {filterColor.length > 0 && (
                    <button
                        className="color-option badge"
                        aria-label="Limpar filtros de cor"
                        onClick={() => setFilterColor([])}
                        style={{
                            backgroundColor: "#ff3e9d34",
                            border: "1px solid #ff3e9d",
                            color: "#ff188b",
                        }}
                    >
                        Limpar
                    </button>
                )}
            </section>
        </div>
    );
};
export default BlockFilter;
