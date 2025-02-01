"use client";

import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTask = { title, description, priority };

        const response = await fetch("/api/tasks/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Task created successfully:", result);
            setMessage("Task created successfully!");
            setTitle("");
            setDescription("");

            // 🔥 Emit event and check if it logs
            console.log("📡 Emitting new-task event:", result);
            socket.emit("new-task", result);
        } else {
            console.error("❌ Failed to create task:", result);
            setMessage(result.error || "Failed to create task.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-bold text-black">Create Task</h2>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded bg-black text-white"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" className="w-full bg-black text-white p-2 rounded">
                Create Task
            </button>
            {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
    );
}
