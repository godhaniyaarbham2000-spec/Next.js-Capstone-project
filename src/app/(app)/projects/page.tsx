import { getProjects } from "@/app/actions/projects"
import Link from "next/link"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded">New Project</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="block border rounded p-4 hover:shadow-md transition">
            <h2 className="text-xl font-bold">{project.name}</h2>
            {project.description && <p className="text-gray-500 mt-2">{project.description}</p>}
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full p-8 text-center border border-dashed rounded text-gray-500">
            No projects found. Create one!
          </div>
        )}
      </div>
    </div>
  )
}
