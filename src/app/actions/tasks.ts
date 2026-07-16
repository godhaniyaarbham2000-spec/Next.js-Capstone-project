"use server"

import { revalidatePath } from "next/cache"
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

  revalidatePath('/', 'layout')
  return task
}

export async function updateTaskStatus(taskId: string, status: string, projectId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status }
  })

  revalidatePath('/', 'layout')
  revalidatePath('/', 'layout')
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

export async function updateTaskDetails(taskId: string, data: { title: string, description?: string, priority?: string }, projectId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
    }
  })

  revalidatePath('/', 'layout')
  revalidatePath('/', 'layout')
  return task
}
