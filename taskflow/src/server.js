import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("update-task", (task) => {
    console.log("🔄 Task Updated:", task);
    io.emit("task-updated", task);
  });

  socket.on("delete-task", (taskId) => {
    console.log("❌ Task Deleted:", taskId);
    io.emit("task-deleted", taskId);
  });

  socket.on("new-task", (task) => {
    console.log("🆕 New Task Received from Client:", task);
    io.emit("new-task", task);
  });

  // 🔥 Fix: Handle "task-moved" event
  socket.on("task-moved", (task) => {
    console.log("🚚 Task Moved:", task);
    io.emit("task-moved", task); // ✅ Ensure all clients get the update
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Start WebSocket server
httpServer.listen(3001, () => {
  console.log("✅ WebSocket server running on port 3001");
});
