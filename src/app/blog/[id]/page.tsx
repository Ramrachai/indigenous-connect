'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Facebook,
    Twitter,
    Linkedin,
    Share2,
    ThumbsUp,
    MessageCircle,
    Bookmark,
    Clock,
    Calendar,
    User,
    ChevronLeft,
    Send
} from 'lucide-react'
import { format } from 'date-fns'

// Sample post data
const post = {
    id: '1',
    title: 'Preserving Indigenous Languages in the Digital Age',
    content: `
    <p>As technology advances, indigenous communities are finding innovative ways to preserve and promote their languages. This article explores digital tools and platforms that are helping to keep indigenous languages alive and accessible to younger generations.</p>
    
    <h2>The Importance of Language Preservation</h2>
    <p>Language is not just a means of communication; it's a carrier of culture, history, and identity. For indigenous communities, preserving their languages is crucial to maintaining their cultural heritage and passing it on to future generations.</p>
    
    <h2>Digital Tools for Language Preservation</h2>
    <p>Several digital platforms and applications have emerged to support language preservation efforts:</p>
    <ul>
      <li><strong>Language Learning Apps:</strong> Customized apps that teach indigenous languages through interactive lessons and games.</li>
      <li><strong>Digital Dictionaries:</strong> Online repositories of words, phrases, and pronunciations specific to indigenous languages.</li>
      <li><strong>Social Media Initiatives:</strong> Campaigns and groups on social platforms that encourage the use and sharing of indigenous languages.</li>
    </ul>
    
    <h2>Community-Driven Efforts</h2>
    <p>Many preservation projects are led by community members themselves, ensuring that the nuances and cultural context of the language are accurately captured in digital form.</p>
    
    <h2>Challenges and Future Directions</h2>
    <p>While digital tools offer new opportunities for language preservation, challenges remain, including limited internet access in some indigenous areas and the need for ongoing community engagement. Future efforts will likely focus on bridging these gaps and creating more immersive digital language experiences.</p>
  `,
    author: {
        name: 'Mina Chakma',
        avatar: '/placeholder.svg?height=40&width=40',
        bio: 'Linguist and Indigenous Rights Activist'
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-12T14:30:00Z',
    category: 'Culture',
    tags: ['language', 'technology', 'preservation', 'indigenous rights'],
    readTime: 8,
    image: 'https://picsum.photos/1200/600?random=1',
    likes: 128,
    comments: 24,
    shares: 56
}

// Sample comments
const initialComments = [
    {
        id: '1',
        author: {
            name: 'Rimi Tripura',
            avatar: '/placeholder.svg?height=32&width=32'
        },
        content: 'This is such an important topic. I\'ve seen firsthand how digital tools can help in preserving our language. Great article!',
        createdAt: '2024-03-11T11:15:00Z',
        likes: 15
    },
    {
        id: '2',
        author: {
            name: 'Aung Shing Marma',
            avatar: '/placeholder.svg?height=32&width=32'
        },
        content: 'I\'d love to see more examples of successful language preservation projects. Are there any specific apps or platforms you\'d recommend for smaller indigenous communities?',
        createdAt: '2024-03-11T14:30:00Z',
        likes: 8
    }
]

// Sample related posts
const relatedPosts = [
    {
        id: '2',
        title: 'The Role of Oral Traditions in Preserving Indigenous Knowledge',
        image: 'https://picsum.photos/300/200?random=2',
        author: 'Priya Chakma'
    },
    {
        id: '3',
        title: 'Indigenous Education: Balancing Traditional and Modern Learning',
        image: 'https://picsum.photos/300/200?random=3',
        author: 'Kamal Tripura'
    },
    {
        id: '4',
        title: 'The Impact of Globalization on Indigenous Cultures',
        image: 'https://picsum.photos/300/200?random=4',
        author: 'Sanjib Marma'
    }
]

export default function BlogPostPage() {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const router = useRouter()

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked)
    }

    const handleComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: String(comments.length + 1),
                author: {
                    name: 'Current User',
                    avatar: '/placeholder.svg?height=32&width=32'
                },
                content: newComment,
                createdAt: new Date().toISOString(),
                likes: 0
            }
            setComments([comment, ...comments])
            setNewComment('')
        }
    }

    const handleShare = (platform: string) => {
        // Implement share functionality for different platforms
        console.log(`Sharing on ${platform}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Posts
                </Button>

                <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={600}
                        className="w-full h-[400px] object-cover"
                    />

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary">{post.category}</Badge>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{post.author.name}</p>
                                    <p className="text-sm text-gray-500">{post.author.bio}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p>Published: {format(new Date(post.createdAt), 'MMM d, yyyy')}</p>
                                <p>Updated: {format(new Date(post.updatedAt), 'MMM d, yyyy')}</p>
                            </div>
                        </div>

                        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-b py-4 mb-8">
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" onClick={handleLike}>
                                    <ThumbsUp className={`mr-2 h-5 w-5 ${isLiked ? 'fill-blue-500 text-blue-500' : ''}`} />
                                    {isLiked ? post.likes + 1 : post.likes}
                                </Button>
                                <Button variant="ghost">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    {post.comments}
                                </Button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" onClick={() => handleShare('facebook')}>
                                    <Facebook className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" onClick={() => handleShare('twitter')}>
                                    <Twitter className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" onClick={() => handleShare('linkedin')}>
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" onClick={handleBookmark}>
                                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                </Button>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
                            <div className="flex items-start space-x-4 mb-4">
                                <Avatar>
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
                                    <AvatarFallback>CU</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Textarea
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="mb-2"
                                    />
                                    <Button onClick={handleComment}>
                                        <Send className="mr-2 h-4 w-4" />
                                        Post Comment
                                    </Button>
                                </div>
                            </div>

                            {comments.map((comment) => (
                                <Card key={comment.id} className="mb-4">
                                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                        <Avatar>
                                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base">{comment.author.name}</CardTitle>
                                            <p className="text-sm text-gray-500">{format(new Date(comment.createdAt), 'MMM d, yyyy')}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{comment.content}</p>
                                        <div className="mt-2">
                                            <Button variant="ghost" size="sm">
                                                <ThumbsUp className="mr-2 h-4 w-4" />
                                                {comment.likes}
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                Reply
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </article>

                <Separator className="my-8" />

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <Card key={relatedPost.id}>
                                <Image
                                    src={relatedPost.image}
                                    alt={relatedPost.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-40 object-cover"
                                />
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2">
                                        <Link href={`/blog/${relatedPost.id}`} className="hover:underline">
                                            {relatedPost.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-500">By {relatedPost.author}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}