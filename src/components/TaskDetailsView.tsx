"use client"

import { useState } from "react"
import EditTaskForm from "./EditTaskForm"

type Task = { 
  id: string, 
  title: string, 
  description: string | null, 
  status: string, 
  priority: string, 
  projectId: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignee: any, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any 
}

export default function TaskDetailsView({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
        <EditTaskForm task={task} onCancel={() => setIsEditing(false)} />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-start pr-8">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <button 
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-gray-700 font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
        >
          Edit Task
        </button>
      </div>
      <p className="text-gray-500 mt-2">{task.description || "No description provided."}</p>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <strong className="block text-gray-700">Status</strong>
          <span className="inline-block mt-1 px-2 py-1 bg-gray-100 rounded text-sm font-medium">
            {task.status.replace("_", " ")}
          </span>
        </div>
        <div>
          <strong className="block text-gray-700">Priority</strong>
          <span className="inline-block mt-1 px-2 py-1 bg-gray-100 rounded text-sm font-medium">
            {task.priority}
          </span>
        </div>
        <div>
          <strong className="block text-gray-700">Project</strong>
          <span className="inline-block mt-1">{task.project?.name}</span>
        </div>
        <div>
          <strong className="block text-gray-700">Assignee</strong>
          <span className="inline-block mt-1">{task.assignee?.name || "Unassigned"}</span>
        </div>
      </div>
    </>
  )
}
