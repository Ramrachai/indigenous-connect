'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, User, Tag, TrendingUp, Search, Zap, Share2, ThumbsUp, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { samplePosts } from './data'
import { DatePickerWithRange } from '@/components/ui/dateRange'

const categories = ['All', 'Culture', 'Health', 'Environment', 'Art', 'Politics']

export default function SocialBlogPage() {
    const [posts, setPosts] = useState(samplePosts)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const [newComment, setNewComment] = useState('')
    const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})
    const [commentPages, setCommentPages] = useState<Record<string, number>>({})

    useEffect(() => {
        const filteredPosts = samplePosts.filter(post =>
            (activeCategory === 'All' || post.category === activeCategory) &&
            (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setPosts(filteredPosts)
    }, [searchQuery, activeCategory])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
    }

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ))
    }

    const handleShare = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, shares: post.shares + 1 } : post
        ))
    }

    const handleComment = (postId: string) => {
        if (newComment.trim()) {
            setPosts(posts.map(post =>
                post.id === postId ? {
                    ...post,
                    comments: [...post.comments, {
                        id: String(post.comments.length + 1),
                        author: 'Current User',
                        content: newComment,
                        likes: 0
                    }]
                } : post
            ))
            setNewComment('')
        }
    }

    const toggleComments = (postId: string) => {
        setExpandedComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }))
        if (!commentPages[postId]) {
            setCommentPages(prev => ({ ...prev, [postId]: 1 }))
        }
    }

    const loadMoreComments = (postId: string) => {
        setCommentPages(prev => ({ ...prev, [postId]: (prev[postId] || 1) + 1 }))
    }

    return (
        <div className="container mx-auto py-6 px-4">
            <div className='flex flex-col md:flex-row flex-wrap gap-4 justify-between items-center mb-6'>
                <Tabs defaultValue="All" className='w-full md:w-auto'>
                    <TabsList className="flex flex-wrap">
                        {categories.map(category => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                onClick={() => handleCategoryChange(category)}
                                className="px-3 py-1 text-sm"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className='w-full md:w-auto'>
                    <DatePickerWithRange />
                </div>

                <div className="flex w-full md:w-auto items-center space-x-2">
                    <Input
                        type="search"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full md:w-64"
                    />
                    <Button variant="default" size="icon"><Search size={16} /></Button>
                </div>
            </div>



            <div className="flex flex-col md:flex-row gap-4">
                <div className="hidden md:block md:w-1/4">
                    <Card className='sticky top-4'>
                        <CardHeader>
                            <CardTitle className='text-center text-lg'>Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add event content here */}
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full md:w-1/2">
                    {posts?.map((post) => (
                        <Card key={post.id} className="overflow-hidden mb-6">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={post.author.avatar} />
                                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{post.author.name}</CardTitle>
                                        <CardDescription>
                                            <span className="flex items-center text-xs">
                                                <Calendar className="mr-1" size={12} />
                                                {new Date(post.createdAt).toLocaleDateString('en-GB')}
                                                <Clock className="ml-2 mr-1" size={12} />
                                                {post.readTime} min read
                                            </span>
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 md:h-64 object-cover rounded-md mb-4"
                                />
                                <p className="text-gray-600 mb-4">{post.content}</p>
                                <Badge variant="secondary" className="mb-2">
                                    <Tag className="mr-1" size={12} />
                                    {post.category}
                                </Badge>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start space-y-4">
                                <div className="flex justify-between w-full">
                                    <Button variant="ghost" onClick={() => handleLike(post.id)}>
                                        <ThumbsUp className="mr-2" size={16} /> {post.likes}
                                    </Button>
                                    <Button variant="ghost" onClick={() => handleShare(post.id)}>
                                        <Share2 className="mr-2" size={16} /> {post.shares}
                                    </Button>
                                    <Button variant="ghost" onClick={() => toggleComments(post.id)}>
                                        <MessageCircle className="mr-2" size={16} />
                                        {post.comments.length}
                                        {expandedComments[post.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </Button>
                                </div>
                                {expandedComments[post.id] && (
                                    <>
                                        <div className="w-full space-y-2">
                                            {post.comments.slice(0, commentPages[post.id] * 10).map(comment => (
                                                <div key={comment.id} className="bg-gray-100 p-2 rounded">
                                                    <p className="font-semibold">{comment.author}</p>
                                                    <p>{comment.content}</p>
                                                </div>
                                            ))}
                                            {post.comments.length > commentPages[post.id] * 10 && (
                                                <Button variant="link" onClick={() => loadMoreComments(post.id)}>
                                                    Load more comments
                                                </Button>
                                            )}
                                        </div>

                                        <div className="flex w-full space-x-2">
                                            <Textarea
                                                placeholder="Write a comment..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="w-full"
                                            />
                                            <Button onClick={() => handleComment(post.id)}>Post</Button>
                                        </div>

                                    </>

                                )}

                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="hidden md:block md:w-1/4">
                    <Card className='sticky top-4'>
                        <CardHeader>
                            <CardTitle className='text-center text-lg'>Live Chat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Add live chat content here */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}