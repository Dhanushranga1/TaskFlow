"use client";

import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    });

    if (response.ok) {
      setMessage("Task created successfully!");
      setTitle("");
    } else {
      setMessage("Failed to create task.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Create Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Create Task
      </button>
      {message && <p className="text-sm text-green-500">{message}</p>}
    </form>
  );
}
