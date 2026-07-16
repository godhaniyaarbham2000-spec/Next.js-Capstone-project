"use server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

export async function registerAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) return { error: "Invalid data" }
  
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } })
  if (existing) return { error: "Email already exists" }
  
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10)
  
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
      role: "USER"
    }
  })
  
  redirect("/login")
}

export async function loginAction(formData: FormData) {
  const { signIn } = await import("@/auth")
  const data = Object.fromEntries(formData.entries())
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    return { success: true }
  } catch (error) {
    return { error: "Invalid email or password" }
  }
}
