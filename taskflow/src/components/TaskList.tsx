"use client";

import { useEffect, useState } from "react";

interface Task {
    id: string;
    title: string;
    status: string;
    priority: string;
    assignedTo?: { name: string };
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch("/api/tasks/get")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        await fetch("/api/tasks/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });

        // Refresh page or update state
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Task List</h2>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="border p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                        {task.assignedTo && (
                            <p className="text-sm text-gray-500">
                                Assigned to: {task.assignedTo.name}
                            </p>
                        )}
                        <p className="text-xs bg-gray-200 p-1 mt-2 rounded">
                            Status: {task.status}
                        </p>
                        <button
                            onClick={() => updateStatus(task.id, "In Progress")}
                            className="text-blue-500 hover:underline mr-2"
                        >
                            Start
                        </button>
                        <button
                            onClick={() => updateStatus(task.id, "Completed")}
                            className="text-green-500 hover:underline"
                        >
                            Complete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
