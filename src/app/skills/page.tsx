// src/app/skills/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { API_URL } from '@/config/api'

interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency: number;
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_URL}/skills`)
            if (!res.ok) throw new Error('Failed to fetch skills')
            const data = await res.json()
            setSkills(data)
        } catch (error) {
            console.error('Error fetching skills:', error)
        }
    }

    const categories = Array.from(new Set(skills.map(skill => skill.category)))

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">My Skills</h1>
            {categories.map(category => (
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills
                            .filter(skill => skill.category === category)
                            .map(skill => (
                                <Card key={skill.id}>
                                    <CardHeader>
                                        <CardTitle>{skill.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Progress value={skill.proficiency} className="w-full" />
                                        <p className="text-sm text-gray-500 mt-2">
                                            Proficiency: {skill.proficiency}%
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}