"use client"
import { registerAction } from "@/app/actions/auth"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const res = await registerAction(formData)
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-500 mt-2">Join your team on TaskFlow</p>
      </div>
      {error && <div className="p-3 bg-red-100 text-red-600 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" required className="mt-1 w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" required minLength={6} className="mt-1 w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="text-center text-sm">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
      </div>
    </div>
  )
}
