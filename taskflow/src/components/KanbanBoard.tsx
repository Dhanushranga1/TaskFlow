"use client";

import { useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "./TaskCard";

interface Task {
    id: string;
    title: string;
    status: "To-Do" | "In Progress" | "Completed";
    priority: string;
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch("/api/tasks/get")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const moveTask = async (id: string, newStatus: "To-Do" | "In Progress" | "Completed") => {
        await fetch("/api/tasks/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-4 p-6">
                {["To-Do", "In Progress", "Completed"].map((status) => (
                    <KanbanColumn key={status} status={status as Task["status"]} tasks={tasks} moveTask={moveTask} />
                ))}
            </div>
        </DndProvider>
    );
}

function KanbanColumn({ status, tasks, moveTask }: { status: Task["status"]; tasks: Task[]; moveTask: Function }) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item: { id: string }) => moveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return drop(
        <div className={`border p-4 text-black rounded-lg shadow-md min-h-[300px] ${isOver ? "bg-gray-200" : "bg-gray-100"}`}>
            <h2 className="text-lg font-bold mb-2">{status}</h2>
            {tasks.filter((task) => task.status === status).map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
