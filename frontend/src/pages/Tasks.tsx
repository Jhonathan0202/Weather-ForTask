import { useEffect, useState, type JSX } from "react";
import type { Task, Block } from "../types/types";
import { dataTasks, dataBlocks } from "../assets/tempData";
import { useParams } from "react-router";

const Tasks = (): JSX.Element => {
    const { blockId } = useParams<{ blockId: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [block, setBlock] = useState<Block>();

    useEffect((): void => {
        setTasks(dataTasks);
        const foundBlock = dataBlocks.find(
            (b: Block): boolean => b.id === parseInt(blockId ? blockId : "0"),
        );
        setBlock(foundBlock);
    }
    , []);

    return (
        <p>{block?.title}</p>
    );
};
export default Tasks;
