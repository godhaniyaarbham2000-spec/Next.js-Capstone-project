"use client"
import { useState, useEffect } from "react"
import { updateTaskStatus } from "@/app/actions/tasks"

type Task = { id: string, title: string, description: string | null, status: string, priority: string, projectId: string }



export default function KanbanBoard({ initialTasks, projectId }: { initialTasks: Task[], projectId: string }) {
  const [tasks, setTasks] = useState(initialTasks)
  
  // Update local state when server data changes (like after adding a new task)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(initialTasks)
  }, [initialTasks])

  const columns = ["TODO", "IN_PROGRESS", "DONE"]

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId)
  }

  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")
    if (!taskId) return

    updateStatus(taskId, status)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const updateStatus = async (taskId: string, status: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t))
    await updateTaskStatus(taskId, status, projectId)
  }

  return (
    <div className="flex gap-4 mt-6 h-full min-h-[500px]">
      {columns.map(col => (
        <div key={col} className="flex-1 bg-gray-100 rounded-lg p-4 flex flex-col gap-3" onDrop={(e) => handleDrop(e, col)} onDragOver={handleDragOver}>
          <h3 className="font-bold border-b pb-2">{col.replace("_", " ")}</h3>
          {tasks.filter(t => t.status === col).map(task => (
            <div 
              key={task.id} 
              draggable 
              onDragStart={(e) => handleDragStart(e, task.id)} 
              onClick={(e) => {
                // If clicking directly on the card, navigate to task details
                // We use closest to avoid triggering when clicking the buttons
                if (!(e.target as HTMLElement).closest('button')) {
                  window.location.href = `/tasks/${task.id}`
                }
              }}
              className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing border-l-4 border-blue-500 hover:bg-gray-50 flex flex-col group relative"
            >
              <h4 className="font-semibold pr-12">{task.title}</h4>
              {task.description && <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>}
              
              <div className="mt-3 flex justify-end">
                {task.status === "TODO" && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); updateStatus(task.id, "IN_PROGRESS"); }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors font-medium"
                  >
                    Move to Progress
                  </button>
                )}
                {task.status === "IN_PROGRESS" && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); updateStatus(task.id, "DONE"); }}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors font-medium"
                  >
                    Move to Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
