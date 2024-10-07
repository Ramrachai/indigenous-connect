// src/components/Comments.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { API_URL } from '@/config/api'

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
    isApproved: boolean;
    replies?: Comment[];
}

interface CommentsProps {
    blogPostId: string;
}

export function Comments({ blogPostId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState({ author: '', content: '' })
    const [replyTo, setReplyTo] = useState<string | null>(null)
    const { data: session } = useSession()

    useEffect(() => {
        fetchComments()
    }, [blogPostId])

    const fetchComments = async () => {
        try {
            const res = await fetch(`${API_URL}/comments/${blogPostId}`)
            if (!res.ok) throw new Error('Failed to fetch comments')
            const data = await res.json()
            setComments(data)
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent, parentCommentId?: string) => {
        e.preventDefault()
        try {
            const res = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newComment,
                    blogPostId,
                    parentCommentId,
                }),
            })
            if (!res.ok) throw new Error('Failed to post comment')
            setNewComment({ author: '', content: '' })
            setReplyTo(null)
            fetchComments()
        } catch (error) {
            console.error('Error posting comment:', error)
        }
    }

    const handleApprove = async (commentId: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${commentId}/approve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!res.ok) throw new Error('Failed to approve comment')
            fetchComments()
        } catch (error) {
            console.error('Error approving comment:', error)
        }
    }

    const handleDelete = async (commentId: string) => {
        try {
            const res = await fetch(`${API_URL}/comments/${commentId}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete comment')
            fetchComments()
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    const renderComment = (comment: Comment, isReply = false) => (
        <div key={comment._id} className={`bg-gray-100 p-4 rounded-lg mb-4 ${isReply ? 'ml-8' : ''}`}>
            <p className="font-bold">{comment.author}</p>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
            </p>
            {!isReply && (
                <Button onClick={() => setReplyTo(comment._id)} className="mt-2">
                    Reply
                </Button>
            )}
            {session?.user?.role === 'admin' && !comment.isApproved && (
                <Button onClick={() => handleApprove(comment._id)} className="mt-2 ml-2">
                    Approve
                </Button>
            )}
            {session?.user?.role === 'admin' && (
                <Button onClick={() => handleDelete(comment._id)} className="mt-2 ml-2" variant="destructive">
                    Delete
                </Button>
            )}
            {replyTo === comment._id && (
                <form onSubmit={(e) => handleSubmit(e, comment._id)} className="mt-4 space-y-4">
                    <Input
                        placeholder="Your Name"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                        required
                    />
                    <Textarea
                        placeholder="Your Reply"
                        value={newComment.content}
                        onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                        required
                    />
                    <Button type="submit">Post Reply</Button>
                    <Button type="button" onClick={() => setReplyTo(null)} variant="outline">
                        Cancel
                    </Button>
                </form>
            )}
            {comment.replies?.map((reply) => renderComment(reply, true))}
        </div>
    )

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => renderComment(comment))}
            <form onSubmit={(e) => handleSubmit(e)} className="mt-6 space-y-4">
                <Input
                    placeholder="Your Name"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                    required
                />
                <Textarea
                    placeholder="Your Comment"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                />
                <Button type="submit">Post Comment</Button>
            </form>
        </div>
    )
}