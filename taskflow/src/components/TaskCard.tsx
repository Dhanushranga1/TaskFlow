"use client";

import { useState } from "react";
import { useDrag } from "react-dnd";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "To-Do" | "In Progress" | "Completed";
    priority: string;
}

export default function TaskCard({
    task,
    onDelete,
    onEdit,
}: {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (updatedTask: Task) => void;
}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleEdit = async () => {
        setIsUpdating(true);
        const response = await fetch("/api/tasks/update", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedTask),
        });

        if (response.ok) {
            onEdit(editedTask);
            setIsEditing(false);
        } else {
            console.error("Failed to update task");
        }
        setIsUpdating(false);
    };

    return drag(
        <div className={`p-3 border rounded-lg shadow-md bg-white cursor-grab ${isDragging ? "opacity-50" : ""}`}>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-600">Priority: {task.priority}</p>
            <p className="text-xs bg-gray-200 p-1 mt-2 rounded">Status: {task.status}</p>

            <div className="mt-2 flex gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                    Delete
                </button>
            </div>

            {/* Edit Task Modal */}
            {isEditing && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <select
                            value={editedTask.priority}
                            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handleEdit}
                                disabled={isUpdating}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isUpdating ? "Updating..." : "Save Changes"}
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
