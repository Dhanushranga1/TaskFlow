"use client";

import { useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "./TaskCard";
import { io, Socket } from "socket.io-client";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "To-Do" | "In Progress" | "Completed";
    priority: string;
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("/api/tasks/get");
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Set up WebSocket connection
    useEffect(() => {
        const newSocket = io("http://localhost:3001");

        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket server");
        });

        newSocket.on("task-updated", (updatedTask: Task) => {
            console.log("🔄 Task Updated:", updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
            );
        });

        newSocket.on("task-deleted", (taskId: string) => {
            console.log("❌ Task Deleted:", taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        });

        newSocket.on("new-task", (newTask: Task) => {
            console.log("🆕 New Task Created:", newTask);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        });

        newSocket.on("task-moved", (movedTask: Task) => {
            console.log("🚚 Task Moved:", movedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === movedTask.id ? movedTask : task))
            );
        });

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Move Task Handler (Drag & Drop)
    const moveTask = async (id: string, newStatus: "To-Do" | "In Progress" | "Completed") => {
        try {
            console.log("🚚 Moving task: ${id} to ${newStatus}");
            const response = await fetch("/api/tasks/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!response.ok) {
                console.error("Failed to update task status");
                return;
            }

            const updatedTask = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status: newStatus } : task
                )
            );

            if (socket) {
                console.log("📡 Emitting task-moved event:", updatedTask);
                socket.emit("task-moved", updatedTask);
            } else {
                console.warn("⚠️ Socket is null when trying to emit task-moved!");
            }
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    // Handle Task Deletion
    const deleteTask = async (taskId: string) => {
        try {
            const response = await fetch("/api/tasks/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: taskId }),
            });

            if (response.ok) {
                console.log("✅ Task deleted successfully:", taskId);
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                
                if (socket) {
                    socket.emit("delete-task", taskId);
                }
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Handle Task Editing
    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));

        if (socket) {
            socket.emit("update-task", updatedTask);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-4 p-6">
                {["To-Do", "In Progress", "Completed"].map((status) => (
                    <KanbanColumn
                        key={status}
                        status={status as Task["status"]}
                        tasks={tasks}
                        moveTask={moveTask}
                        onDelete={deleteTask}
                        onEdit={updateTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
}

function KanbanColumn({
    status,
    tasks,
    moveTask,
    onDelete,
    onEdit,
}: {
    status: Task["status"];
    tasks: Task[];
    moveTask: (id: string, status: Task["status"]) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item: { id: string }) => moveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border p-4 text-black rounded-lg shadow-md min-h-[300px] ${isOver ? "bg-gray-200" : "bg-gray-100"}`}
        >
            <h2 className="text-lg font-bold mb-2">{status}</h2>
            {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                    <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
                ))}
        </div>
    );
}
