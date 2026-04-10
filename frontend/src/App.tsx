import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
import { dataBlocks } from "./assets/tempData.ts";
import Headers from "./layouts/Header";
import { useState } from "react";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Weather from "./pages/Weather";
import Tasks from "./pages/Tasks";
import type { Block } from "./types/types.ts";
import "./css/responsive.css";

function App() {
    const [blocks, setBlocks] = useState<Block[]>(dataBlocks);

    const route = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Headers />}>
                    <Route index element={<Home blocks={blocks} setBlocks={setBlocks} />} />
                    <Route path="notas" element={<Notes />} />
                    <Route path="clima" element={<Weather />} />
                </Route>
                <Route path="block/:blockId/tasks" element={<Tasks blocks={blocks} setBlocks={setBlocks} />} />
            </>
        ),
    );

    return <RouterProvider router={route} />;
}

export default App;
