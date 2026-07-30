"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Helper to check if current user is admin
async function checkAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can perform this action")
  }
}

export async function toggleUserRoleAction(formData: FormData) {
  try {
    await checkAdmin()
    
    const userId = formData.get("userId") as string
    
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error("User not found")
    
    const newRole = formData.get("newRole") as string
    
    if (newRole !== "ADMIN" && newRole !== "USER") {
      throw new Error("Invalid role specified")
    }
    
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    })
    
    revalidatePath("/admin")
  } catch (error: any) {
    console.error("Failed to toggle role:", error)
    throw error
  }
}

export async function deleteUserAction(formData: FormData) {
  try {
    await checkAdmin()
    
    const userId = formData.get("userId") as string
    
    // Check if we are deleting ourselves
    const session = await auth()
    if (session?.user?.id === userId) {
      throw new Error("You cannot delete your own admin account")
    }
    
    await prisma.user.delete({
      where: { id: userId }
    })
    
    revalidatePath("/admin")
  } catch (error: any) {
    console.error("Failed to delete user:", error)
    throw error
  }
}
