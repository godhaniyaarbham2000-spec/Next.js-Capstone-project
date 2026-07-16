import prisma from "@/lib/prisma"

export default async function AdminStatsSlot() {
  const totalUsers = await prisma.user.count()
  const totalProjects = await prisma.project.count()
  const totalTasks = await prisma.task.count()

  return (
    <div className="bg-white border rounded p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">System Stats</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Total Users</span>
          <span className="font-semibold">{totalUsers}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Total Projects</span>
          <span className="font-semibold">{totalProjects}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Tasks</span>
          <span className="font-semibold">{totalTasks}</span>
        </div>
      </div>
    </div>
  )
}
