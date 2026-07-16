import { getTasks } from "@/app/actions/tasks"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import KanbanBoard from "@/components/KanbanBoard"
import AddTaskModal from "@/components/AddTaskModal"

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  if (!project) notFound()

  const tasks = await getTasks(project.id)

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-500">{project.description}</p>
        </div>
        <AddTaskModal projectId={project.id} />
      </div>
      <KanbanBoard initialTasks={tasks} projectId={project.id} />
    </div>
  )
}
