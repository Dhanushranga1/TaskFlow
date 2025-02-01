import KanbanBoardWrapper from "@/components/KanbanBoardWrapper";
import CreateTask from "@/components/CreateTask";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">TaskFlow Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <CreateTask />
        </div>
        <div className="col-span-2">
          <KanbanBoardWrapper />
        </div>
      </div>
    </div>
  );
}
