import Link from "next/link"

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
      <h1 className="text-5xl font-bold tracking-tight">Task Management for Teams</h1>
      <p className="text-xl text-gray-500 max-w-2xl">Organize your projects, assign tasks, and track progress effortlessly.</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">Log In</Link>
        <Link href="/register" className="px-6 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition">Register</Link>
      </div>
    </div>
  )
}
