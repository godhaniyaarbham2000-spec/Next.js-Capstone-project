"use server"

import { revalidateTag } from "next/cache"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function createTask(data: { title: string, description?: string, projectId: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      projectId: data.projectId,
    }
  })

  revalidateTag(`tasks-${data.projectId}`)
  return task
}

export async function updateTaskStatus(taskId: string, status: string, projectId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status }
  })

  revalidateTag(`tasks-${projectId}`)
  revalidateTag(`task-${taskId}`)
  return task
}

export async function getTasks(projectId: string) {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.task.findMany({
    where: { projectId },
    include: { assignee: true, attachments: true },
    orderBy: { createdAt: 'desc' }
  })
}
