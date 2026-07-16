import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import TaskDetailsView from "@/components/TaskDetailsView"
import Link from "next/link"

export default async function TaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { assignee: true, attachments: true, project: true }
  })

  if (!task) notFound()

  return (
    <div className="max-w-3xl mx-auto py-12">
      <Link href={`/projects/${task.project.slug}`} className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to {task.project.name}
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <TaskDetailsView task={task} />
      </div>
    </div>
  )
}
