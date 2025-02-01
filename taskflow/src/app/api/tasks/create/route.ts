import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";

const prisma = new PrismaClient();
const io = new Server();

export async function POST(req: Request) {
  try {
    const { title, description, priority, dueDate } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "Medium",
        dueDate: dueDate ? new Date(dueDate) : null, // ✅ Store due date
        status: "To-Do",
      },
    });

    io.emit("new-task", task); // 🔥 Real-time update
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
