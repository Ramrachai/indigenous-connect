// src/app/projects/[id]/page.tsx
import { notFound } from 'next/navigation'
import { API_URL } from '@/config/api'

async function getProject(id: string) {
    const res = await fetch(`${API_URL}/projects/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await getProject(params.id)

    if (!project) {
        notFound()
    }

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <img src={project.imageUrl} alt={project.title} className="w-full max-w-2xl mb-8 rounded-lg shadow-lg" />
            <p className="text-xl mb-4">{project.description}</p>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
                <ul className="list-disc list-inside">
                    {project.technologies.map((tech: string) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
            </div>
            {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View on GitHub
                </a>
            )}
        </div>
    )
}