import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
import "./css/blocks.css";
import Headers from "./layouts/Header";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Weather from "./pages/Weather";
import Tasks from "./pages/Tasks";

const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Headers />}>
                <Route index element={<Home />} />
                <Route path="notas" element={<Notes />} />
                <Route path="clima" element={<Weather />} />
            </Route>
            <Route path="block/:blockId/tasks" element={<Tasks />} />
        </>
    ),
);

function App() {
    return <RouterProvider router={route} />;
}

export default App;
