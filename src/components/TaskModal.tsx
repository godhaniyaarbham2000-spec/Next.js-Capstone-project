"use client"

import { useRouter } from "next/navigation"

export default function TaskModal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => router.back()}>
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto m-4 p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => router.back()} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
