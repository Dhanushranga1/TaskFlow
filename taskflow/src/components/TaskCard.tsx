"use client";

import { useDrag } from "react-dnd";

interface Task {
  id: string;
  title: string;
  status: "To-Do" | "In Progress" | "Completed";
  priority: string;
}

export default function TaskCard({ task }: { task: Task }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return drag(
        <div
            className={`p-3 border rounded-lg shadow-md bg-white cursor-grab ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            <h3 className="font-semibold text-black">{task.title}</h3>
            <p className="text-sm text-black">Priority: {task.priority}</p>
            <p className="text-xs bg-gray-200 p-1 mt-2 rounded text-black">Status: {task.status}</p>
        </div>
    );
}
