//import "../css/components/searchInput.css";
import type { SetStateAction, Dispatch } from "react";

type searchInputProps = {
    filterNum?: number,
    isFilterOpen?: boolean,
    setIsFilterOpen?: Dispatch<SetStateAction<boolean>>,
    query: string,
    setQuery: Dispatch<SetStateAction<string>>,
    placeholder?: string,
};

const SearchInput = ({
    filterNum,
    isFilterOpen,
    setIsFilterOpen,
    query,
    setQuery,
    placeholder = "Pesquisar...",
}: searchInputProps) => {

    const countFiltersLabel = `Filtrar blocos${
    filterNum && filterNum > 0 
        ? `: (${filterNum}) filtr${filterNum > 1 ? 'os aplicados' : 'o aplicado'}` 
        : ""
    }`;

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
                    aria-label={countFiltersLabel}
                    aria-pressed={isFilterOpen}
                    onClick={(): void => {
                        setIsFilterOpen((value: boolean): boolean => !value);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-160v-280h-80v-80h240v80h-80v280h-80Zm0-440v-200h80v200h-80Zm160 0v-80h80v-120h80v120h80v80H360Zm80 440v-360h80v360h-80Zm240 0v-120h-80v-80h240v80h-80v120h-80Zm0-280v-360h80v360h-80Z"/></svg>
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
