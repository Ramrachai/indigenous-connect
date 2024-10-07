import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare, Eye, Clock, Share2 } from 'lucide-react';
import { API_URL } from '@/config/api';
import Link from 'next/link';

interface OverviewData {
    blogCount: number;
    commentCount: number;
    projectCount: number;
    totalUsers: number;
    totalVisits: number;
    totalTimeVisits: number;
    totalShares: number;
    mostSharedPosts: Array<{
        _id: string;
        title: string;
        totalShares: number;
    }>;
    mostViewedPosts: Array<{
        _id: string;
        title: string;
        viewCount: number;
    }>;
}

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

interface TopPostsListProps {
    title: string;
    posts: Array<{
        _id: string;
        title: string;
        totalShares?: number;
        viewCount?: number;
    }>;
    metric: 'totalShares' | 'viewCount';
}

const TopPostsList: React.FC<TopPostsListProps> = ({ title, posts, metric }) => (
    <Card className="">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {posts.map((post, index) => (
                    <li key={post._id} className="flex justify-between items-center">
                        <Link href={`/blog/${post._id}`} className="hover:underline truncate">
                            <span>{index + 1}. {post.title}</span>
                        </Link>
                        <span className="font-semibold">{post[metric]}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const ComprehensiveDashboard: React.FC = async () => {
    const res = await fetch(`${API_URL}/analytics/overview`);
    const overviewData: OverviewData = await res.json();

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <StatCard title="Total Blogs" value={overviewData.blogCount} icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Projects" value={overviewData.projectCount} icon={<FileText className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Comments" value={overviewData.commentCount} icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Users" value={overviewData.totalUsers} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Visits" value={overviewData.totalVisits} icon={<Eye className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Time Visits (hours)" value={overviewData.totalTimeVisits} icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
                <StatCard title="Total Shares" value={overviewData.totalShares} icon={<Share2 className="h-4 w-4 text-muted-foreground" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopPostsList 
                    title="Most Shared Posts" 
                    posts={overviewData.mostSharedPosts} 
                    metric="totalShares" 
                />

                <TopPostsList 
                    title="Most Viewed Posts" 
                    posts={overviewData.mostViewedPosts} 
                    metric="viewCount" 
                />
            </div>
        </div>
    );
};

export default ComprehensiveDashboard;