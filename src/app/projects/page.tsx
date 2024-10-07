// src/app/projects/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/SearchBar'
import { API_URL } from '@/config/api'

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const projectsPerPage = 6

    useEffect(() => {
        fetchProjects()
    }, [currentPage, searchQuery])

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects?page=${currentPage}&limit=${projectsPerPage}&search=${searchQuery}`)
            if (!res.ok) throw new Error('Failed to fetch projects')
            const data = await res.json()
            setProjects(data.projects)
            setFilteredProjects(data.projects)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error('Error fetching projects:', error)
        }
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">My Projects</h1>
            <div className="mb-8">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>{project.technologies.join(', ')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover mb-4" />
                            <p>{project.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-8 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        variant={currentPage === page ? 'default' : 'outline'}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    )
}