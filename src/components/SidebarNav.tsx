"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarNav({ role }: { role: string }) {
  const pathname = usePathname()

  const navItems = [
    { name: "Projects", href: "/projects" },
    ...(role === "ADMIN" ? [{ name: "Admin", href: "/admin" }] : [])
  ]

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        // Active if exact match, or if it's the projects route and we're inside a specific project
        const isActive = pathname === item.href || (item.href === "/projects" && pathname.startsWith("/projects/"))
        
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`p-2 rounded font-medium transition-colors ${
              isActive 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
