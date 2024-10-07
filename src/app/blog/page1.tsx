'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, User, Tag, TrendingUp, Search, Zap, Share, Share2 } from 'lucide-react'

// Sample data
const samplePosts = [
    {
        id: '1',
        title: 'Preserving Indigenous Languages in the Digital Age',
        content: 'As technology advances, indigenous communities are finding innovative ways to preserve and promote their languages. This article explores digital tools and platforms that are helping to keep indigenous languages alive and accessible to younger generations.',
        author: 'Mina Chakma',
        createdAt: '2024-03-10T10:00:00Z',
        category: 'Culture',
        readTime: 5,
        image: 'https://picsum.photos/id/22/600/400',
        featured: true,
        shared: 10
    },
    {
        id: '2',
        title: 'Traditional Healing Practices of the Marma Community',
        content: 'The Marma people have a rich history of traditional medicine. This post delves into some of the unique healing practices that have been passed down through generations, and how they\'re being integrated with modern healthcare.',
        author: 'Aung Shing Marma',
        createdAt: '2024-03-08T14:30:00Z',
        category: 'Health',
        readTime: 7,
        image: 'https://picsum.photos/id/23/600/400',
        shared: 13
    },
    {
        id: '3',
        title: 'Sustainable Agriculture Techniques from Indigenous Farmers',
        content: 'Indigenous farming practices often hold the key to sustainable agriculture. This article highlights how traditional farming techniques are being adapted to address modern environmental challenges.',
        author: 'Rimi Tripura',
        createdAt: '2024-03-05T09:15:00Z',
        category: 'Environment',
        readTime: 6,
        image: 'https://picsum.photos/id/24/600/400',
        shared: 15
    },
    {
        id: '4',
        title: 'The Art of Traditional Weaving in Chittagong Hill Tracts',
        content: 'Weaving is more than just a craft in the Chittagong Hill Tracts; it\'s a form of cultural expression. This post explores the intricate patterns, techniques, and stories behind the beautiful textiles produced by indigenous weavers.',
        author: 'Priya Chakma',
        createdAt: '2024-03-02T11:45:00Z',
        category: 'Art',
        readTime: 4,
        image: 'https://picsum.photos/id/25/600/400',
        featured: true,
        shared: 60
    },
    {
        id: '5',
        title: 'Indigenous Rights and Land Conservation Efforts',
        content: 'Land rights remain a crucial issue for indigenous communities. This article discusses recent developments in land conservation efforts and how they intersect with indigenous rights in Bangladesh.',
        author: 'Kamal Tripura',
        createdAt: '2024-02-28T16:20:00Z',
        category: 'Politics',
        readTime: 8,
        image: 'https://picsum.photos/id/26/600/400',
        shared: 110
    }
]

const categories = ['All', 'Culture', 'Health', 'Environment', 'Art', 'Politics']

export default function BlogPage() {
    const [posts, setPosts] = useState(samplePosts)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const postsPerPage = 4
    const totalPages = Math.ceil(posts.length / postsPerPage)

    useEffect(() => {
        const filteredPosts = samplePosts.filter(post =>
            (activeCategory === 'All' || post.category === activeCategory) &&
            (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setPosts(filteredPosts)
        setCurrentPage(1)
    }, [searchQuery, activeCategory])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
    }

    const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

    const featuredPosts = posts.filter(post => post.featured)

    return (
        <div className="container mx-auto py-12 px-4">

            <div className="mb-8 flex gap-3 justify-center items-center">
                <Input
                    type="search"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="max-w-md"
                />
                <Button variant={"default"}> <Search size={16} />  </Button>
            </div>

            <Tabs defaultValue="All" className="mb-8">
                <TabsList>
                    {categories.map(category => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {featuredPosts.length > 0 && (
                <div className="mb-12 ">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <TrendingUp className="mr-2" /> Featured Posts
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredPosts.map(post => (
                            <Card key={post.id} className="overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                <CardHeader>
                                    <CardTitle>
                                        <Link href={`/blog/${post.id}`} className="text-stone-700 hover:underline text-base">
                                            {post.title.substring(0, 40)}...
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>{post.content.substring(0, 100)}...</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <User className="mr-1" size={16} />
                                        <span className="mr-4 text-xs">{post.author}</span>
                                        <Calendar className="mr-1" size={16} />
                                        <span className="mr-4">{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
                                        <Clock className="mr-1" size={16} />
                                        <span>{post.readTime} min read</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Zap className='mr-2' />  Latest Posts
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

                {paginatedPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="w-full h-52 object-cover "
                        />
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/blog/${post.id}`} className="text-stone-700 hover:underline text-base">
                                    {post.title.substring(0, 40)}...
                                </Link>
                            </CardTitle>
                            <CardDescription>
                                <Badge variant="secondary" className="mr-2">
                                    <Tag className="mr-1" size={12} />
                                    {post.category}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                    <Clock className="inline mr-1" size={12} />
                                    {post.readTime} min read
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                            <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
                            <div className="flex items-center text-sm text-gray-500">
                                <User className="mr-1" size={16} />
                                <span className="mr-4">{post.author}</span>
                                <Calendar className="mr-1" size={16} />
                                <span>{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
                                <span className='text-stone-600 ml-4 flex gap-2'><Share2 size={16} />{post.shared}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? 'default' : 'outline'}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    )
}