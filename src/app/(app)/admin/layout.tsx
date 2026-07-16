import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children, users, stats }: { children: React.ReactNode, users: React.ReactNode, stats: React.ReactNode }) {
  const session = await auth()
  
  if (session?.user?.role !== "ADMIN") {
    redirect("/projects")
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Manage users and system settings.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">{stats}</div>
        <div className="lg:col-span-2">{users}</div>
      </div>
      {children}
    </div>
  )
}
