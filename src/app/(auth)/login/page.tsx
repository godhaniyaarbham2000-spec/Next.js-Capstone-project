"use client"
import { loginAction } from "@/app/actions/auth"
import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await loginAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        router.push("/projects")
        router.refresh()
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Log in to TaskFlow</h1>
        <p className="text-gray-500 mt-2">Enter your email and password below</p>
      </div>
      {error && <div className="p-3 bg-red-100 text-red-600 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" required className="mt-1 w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 transition">Log In</button>
      </form>
      <div className="text-center text-sm">
        Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>
    </div>
  )
}
