import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import TaskModal from "@/components/TaskModal"
import TaskDetailsView from "@/components/TaskDetailsView"

export default async function TaskDetailModalPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { assignee: true, attachments: true, project: true }
  })

  if (!task) notFound()

  return (
    <TaskModal>
      <TaskDetailsView task={task} />
    </TaskModal>
  )
}
