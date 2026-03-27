import "../css/components/searchInput.css";
import type { SetStateAction, Dispatch } from "react";

type searchInputProps = {
    filterNum?: number;
    isFilterOpen?: boolean;
    setIsFilterOpen?: Dispatch<SetStateAction<boolean>>;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    placeholder?: string;
};

const SearchInput = ({
    filterNum,
    isFilterOpen,
    setIsFilterOpen,
    query,
    setQuery,
    placeholder = "Pesquisar...",
}: searchInputProps) => {
    return (
        <div className="search-input">
            <div>
                {/* Ícone de pesquisa do fonts.google.com modificado */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="search-icon"
                    viewBox="0 -960 960 960"
                >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
                <input
                    type="text"
                    id="search"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e): void => setQuery(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="search" className="sr-only">
                    {placeholder}
                </label>
                {query.length > 0 && (
                    /* Ícone de fechar do fonts.google.com modificado */
                    <button className="clear-icon" onClick={(): void => setQuery("")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#e3e3e3"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </button>
                )}
            </div>
            {setIsFilterOpen && (
                <button
                    className="filter-button"
                    aria-label={
                        filterNum !== undefined && filterNum > 0 ?
                        `Filtrar blocos (${filterNum})` : "Filtrar blocos"
                    }
                    aria-pressed={isFilterOpen}
                    onClick={(): void => {
                        setIsFilterOpen((value: boolean): boolean => !value);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    ><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>
                    {
                        filterNum !== undefined && filterNum > 0 && (
                            <span className="filter-count">{filterNum > 9 ? "9+" : filterNum}</span>
                        )
                    }
                </button>
            )}
        </div>
    );
};
export default SearchInput;
