import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function TaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { assignee: true, attachments: true, project: true }
  })

  if (!task) notFound()

  return (
    <div className="max-w-3xl mx-auto border rounded p-6 shadow bg-white">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-500 mt-2">{task.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <strong className="block text-gray-700">Status</strong>
          <span>{task.status.replace("_", " ")}</span>
        </div>
        <div>
          <strong className="block text-gray-700">Priority</strong>
          <span>{task.priority}</span>
        </div>
        <div>
          <strong className="block text-gray-700">Project</strong>
          <span>{task.project.name}</span>
        </div>
        <div>
          <strong className="block text-gray-700">Assignee</strong>
          <span>{task.assignee?.name || "Unassigned"}</span>
        </div>
      </div>
    </div>
  )
}
