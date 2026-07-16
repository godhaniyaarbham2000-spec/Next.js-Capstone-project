"use server"

import { revalidateTag } from "next/cache"
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

  revalidateTag('projects')
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
