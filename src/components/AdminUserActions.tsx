"use client"

import { useState } from "react"
import { toggleUserRoleAction, deleteUserAction } from "@/app/actions/admin"

export default function AdminUserActions({ user }: { user: any }) {
  const [isEditingRole, setIsEditingRole] = useState(false)
  const [role, setRole] = useState(user.role)

  const handleDelete = (e: React.FormEvent) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}? This cannot be undone.`)) {
      e.preventDefault()
    }
  }

  const handleRoleSave = (e: React.FormEvent) => {
    if (!window.confirm(`Are you sure you want to change ${user.name}'s role to ${role}?`)) {
      e.preventDefault()
    }
  }

  return (
    <div className="flex items-center gap-3">
      {isEditingRole ? (
        <form action={toggleUserRoleAction} onSubmit={handleRoleSave} className="flex items-center gap-2">
          <input type="hidden" name="userId" value={user.id} />
          {/* We pass the newly selected role to the action */}
          <input type="hidden" name="newRole" value={role} />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="text-sm border rounded p-1 outline-none focus:ring focus:ring-blue-200"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit" className="text-green-600 hover:underline text-sm font-medium">Save</button>
          <button type="button" onClick={() => setIsEditingRole(false)} className="text-gray-500 hover:underline text-sm font-medium">Cancel</button>
        </form>
      ) : (
        <button onClick={() => setIsEditingRole(true)} className="text-blue-600 hover:underline text-sm font-medium">Edit Role</button>
      )}

      {!isEditingRole && (
        <form action={deleteUserAction} onSubmit={handleDelete}>
          <input type="hidden" name="userId" value={user.id} />
          <button type="submit" className="text-red-600 hover:underline text-sm font-medium">Delete</button>
        </form>
      )}
    </div>
  )
}
