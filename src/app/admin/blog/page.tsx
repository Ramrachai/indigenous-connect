// src/app/admin/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { API_URL } from '@/config/api'

interface BlogPost {
    id: string
    title: string
    content: string
    author: string
    createdAt: string
}

export default function AdminBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
    const [newPost, setNewPost] = useState<Omit<BlogPost, 'id' | 'createdAt'>>({
        title: '',
        content: '',
        author: '',
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/blog`)
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts')
            }
            const data = await response.json()
            setPosts(data)
        } catch (err) {
            setError('Failed to load blog posts. Please try again.')
            console.error('Error fetching blog posts:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (editingPost) {
            setEditingPost({ ...editingPost, [name]: value })
        } else {
            setNewPost(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            if (editingPost) {
                await updatePost(editingPost)
            } else {
                await createPost(newPost)
            }
            setEditingPost(null)
            setNewPost({ title: '', content: '', author: '' })
            await fetchPosts()
        } catch (err) {
            setError('Failed to save blog post. Please try again.')
            console.error('Error saving blog post:', err)
        } finally {
            setLoading(false)
        }
    }

    const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
        const response = await fetch(`${API_URL}/blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        })
        if (!response.ok) {
            throw new Error('Failed to create blog post')
        }
    }

    const updatePost = async (post: BlogPost) => {
        const response = await fetch(`${API_URL}/blog/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        })
        if (!response.ok) {
            throw new Error('Failed to update blog post')
        }
    }

    const deletePost = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${API_URL}/blog/${id}`, { method: 'DELETE' })
            if (!response.ok) {
                throw new Error('Failed to delete blog post')
            }
            await fetchPosts()
        } catch (err) {
            setError('Failed to delete blog post. Please try again.')
            console.error('Error deleting blog post:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading && posts.length === 0) {
        return <div>Loading blog posts...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <Input
                    name="title"
                    value={editingPost?.title || newPost.title}
                    onChange={handleInputChange}
                    placeholder="Post Title"
                    required
                />
                <Textarea
                    name="content"
                    value={editingPost?.content || newPost.content}
                    onChange={handleInputChange}
                    placeholder="Post Content"
                    required
                />
                <Input
                    name="author"
                    value={editingPost?.author || newPost.author}
                    onChange={handleInputChange}
                    placeholder="Author"
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Add Post')}
                </Button>
                {editingPost && (
                    <Button type="button" variant="outline" onClick={() => setEditingPost(null)} disabled={loading}>
                        Cancel Edit
                    </Button>
                )}
            </form>

            {posts.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map(post => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="outline" className="mr-2" onClick={() => setEditingPost(post)} disabled={loading}>
                                        Edit
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" disabled={loading}>Delete</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                                            </DialogHeader>
                                            <Button variant="destructive" onClick={() => deletePost(post.id)} disabled={loading}>
                                                Confirm Delete
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No blog posts found. Add a new post above.</p>
            )}
        </div>
    )
}