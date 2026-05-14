import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
import Headers from "./layouts/Header";
import { useEffect, useState } from "react";
import Home from "./pages/Blocks.tsx";
import Notes from "./pages/Notes";
import Weather from "./pages/Weather";
import Tasks from "./pages/Tasks";
import type { Block, Task } from "./types/types.ts";
import "./css/responsive.css";

function App() {
    const [blocks, setBlocks] = linkToLocalStorage<Block[]>("blocks", []);
    const [tasks, setTasks] = linkToLocalStorage<Task[]>("tasks", []);

    const route = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Headers />}>
                    <Route index element={<Home blocks={blocks} setBlocks={setBlocks} />} />
                    <Route path="notas" element={<Notes />} />
                    <Route path="clima" element={<Weather />} />
                </Route>
                <Route path="block/:blockId/tasks" element={<Tasks blocks={blocks} setBlocks={setBlocks} tasks={tasks} setTasks={setTasks} />} />
            </>
        ),
    );

    return <RouterProvider router={route} />;
}

function linkToLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        if (
            typeof window === 'undefined' ||
        !window.localStorage
        ) {
            return defaultValue;
        }

        const storedData = localStorage.getItem(key);
        const parsed = storedData !== null ? JSON.parse(storedData) as T : defaultValue as T;

        // Converter scheduledDate de string para Date para tarefas
        if (key === "tasks" && Array.isArray(parsed)) {
            return (parsed as any[]).map(task => ({
                ...task,
                scheduledDate: typeof task.scheduledDate === 'string' 
                    ? new Date(task.scheduledDate)
                    : task.scheduledDate
            })) as T;
        }
        
        return parsed;
    });

    useEffect(() => {
        window.localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }, [key, value]);

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export default App;
