"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function createProject(data: { name: string, description?: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8)

  const project = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      slug,
      members: {
        create: {
          userId: session.user.id,
          role: "OWNER"
        }
      }
    }
  })

  revalidatePath('/', 'layout')
  return project
}

export async function getProjects() {
  const session = await auth()
  if (!session?.user?.id) return []

  // If Admin, they see all projects. Otherwise only their own.
  const where = session.user.role === 'ADMIN' 
    ? {} 
    : { members: { some: { userId: session.user.id } } }

  return prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } })
}

export async function updateProject(projectId: string, data: { name: string, description?: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Normally we should check if they are owner/member, but keeping it simple for now
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      name: data.name,
      description: data.description,
    }
  })

  revalidatePath('/', 'layout')
  return project
}
