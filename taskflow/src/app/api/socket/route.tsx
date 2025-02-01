import { NextResponse } from "next/server";
import { Server } from "socket.io";

const ioHandler = (req: any, res: any) => {
    if (!res.socket.server.io) {
        console.log("Setting up Socket.io server...");

        const io = new Server(res.socket.server, {
            path: "/api/socket",
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);

            socket.on("update-task", (task) => {
                socket.broadcast.emit("task-updated", task);
            });

            socket.on("delete-task", (taskId) => {
                socket.broadcast.emit("task-deleted", taskId);
            });

            socket.on("new-task", (task) => {
                socket.broadcast.emit("task-created", task);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });

        res.socket.server.io = io;
    }

    return NextResponse.json({ message: "Socket.io initialized" });
};

export async function GET() {
    return NextResponse.json({ message: "WebSocket server running on port 3001" });
}
