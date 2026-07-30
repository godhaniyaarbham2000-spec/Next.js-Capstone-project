import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import SidebarNav from "@/components/SidebarNav"

export default async function AppLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-gray-50 p-4 flex flex-col gap-4">
        <div className="font-bold text-xl">TaskFlow</div>
        <SidebarNav role={session.user.role} />
      </aside>
      <main className="flex-1 p-8 bg-white">
        {children}
        {modal}
      </main>
    </div>
  )
}
