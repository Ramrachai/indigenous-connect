// src/app/admin/comments/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { API_URL } from '@/config/api'

interface Comment {
    _id: string;
    blogPost: string;
    author: string;
    content: string;
    createdAt: string;
    isApproved: boolean;
}

export default function AdminComments() {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        try {
            const res = await fetch(`${API_URL}/comments/all`)
            if (!res.ok) throw new Error('Failed to fetch comments')
            const data = await res.json()
            setComments(data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleApprove = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${id}/approve`, {
                method: 'PUT',
            })
            if (!res.ok) throw new Error('Failed to approve comment')
            fetchComments()
        } catch (error) {
            console.error('Error approving comment:', error)
        }
    }

    const handleDisapprove = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${id}/disapprove`, {
                method: 'PUT',
            })
            if (!res.ok) throw new Error('Failed to disapprove comment')
            fetchComments()
        } catch (error) {
            console.error('Error disapproving comment:', error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete comment')
            fetchComments()
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Comments</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comments.map((comment) => (
                        <TableRow key={comment._id}>
                            <TableCell>{comment.author}</TableCell>
                            <TableCell>{comment.content.substring(0, 50)}...</TableCell>
                            <TableCell>{new Date(comment.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{comment.isApproved ? 'Approved' : 'Pending'}</TableCell>
                            <TableCell>
                                {!comment.isApproved && (
                                    <Button onClick={() => handleApprove(comment._id)} className="mr-2">
                                        Approve
                                    </Button>
                                )}
                                {comment.isApproved && (
                                    <Button onClick={() => handleDisapprove(comment._id)} className="mr-2">
                                        Disapprove
                                    </Button>
                                )}
                                <Button onClick={() => handleDelete(comment._id)} variant="destructive">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}