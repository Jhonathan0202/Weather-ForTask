import { NavLink, Outlet } from "react-router";
import type { JSX } from "react";

const Headers = (): JSX.Element => {
    return (
        <>
            <header>
                <h1>Weather For<span style={{ color:"#00d4ff" }}>Task</span></h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                            >
                                Tarefas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/notas"
                            >
                                Notas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/clima"
                            >
                                Clima
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default Headers;
