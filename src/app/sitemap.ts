import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicRoutes: MetadataRoute.Sitemap = [
    { url: 'https://taskflow.vercel.app', lastModified: new Date() },
    { url: 'https://taskflow.vercel.app/login', lastModified: new Date() },
    { url: 'https://taskflow.vercel.app/register', lastModified: new Date() },
  ]
  
  try {
    const projects = await prisma.project.findMany()
    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `https://taskflow.vercel.app/projects/${p.slug}`,
      lastModified: p.createdAt,
    }))
    return [...publicRoutes, ...projectRoutes]
  } catch {
    return publicRoutes
  }
}
