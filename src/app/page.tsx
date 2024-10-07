import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Bell, Lightbulb, Image as ImageIcon, Video, Headphones, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import Banner1 from "@/assets/banner1.jpg"
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen ">

      <main className="w-[80%] mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Indigenous Connect</h2>
          <p className="text-xl mb-6">Uniting the Indigenous Community of Bangladesh</p>
          <Button size="lg" asChild>
            <Link href={"/login"}>Join Our Community</Link>
          </Button>
        </section>

        <section id="features" className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Users className="h-4 w-4 text-cyan-500" />}
              title="Community Posts"
              description="Share and engage with posts from the community"
            />
            <FeatureCard
              icon={<MessageCircle className="h-4 w-4 text-cyan-500" />}
              title="Chat"
              description="Connect with other members through real-time chat"
            />
            <FeatureCard
              icon={<Bell className="h-4 w-4 text-cyan-500" />}
              title="Notice Board"
              description="Stay updated with important announcements"
            />
            <FeatureCard
              icon={<Lightbulb className="h-4 w-4 text-cyan-500" />}
              title="Ideas"
              description="Share and explore innovative ideas for the community"
            />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Media Sharing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<ImageIcon className="h-4 w-4 text-emerald-500" />}
              title="Image Sharing"
              description="Share your photos with the community"
            />
            <FeatureCard
              icon={<Video className="h-4 w-4 text-emerald-500" />}
              title="Video Sharing"
              description="Upload and watch community videos"
            />
            <FeatureCard
              icon={<Headphones className="h-4 w-4 text-emerald-500" />}
              title="Audio Sharing"
              description="Share music and audio recordings"
            />
            <FeatureCard
              icon={<FileText className="h-4 w-4 text-emerald-500" />}
              title="Document Sharing"
              description="Upload and download important documents"
            />
          </div>
        </section>

        <section id="about" className="mb-12">
          <Card className='border-0'>
            <CardHeader>
              <CardTitle className='text-center'>About Indigenous Connect</CardTitle>
            </CardHeader>
            <CardContent className='flex gap-8 items-center justify-center'>
              <p>Indigenous Connect is a platform dedicated to uniting the indigenous community of Bangladesh. Our mission is to provide a space for sharing, learning, and preserving our rich cultural heritage while addressing the unique challenges and opportunities faced by our community.</p>
              <Image src={Banner1} height={400} width={600} alt='indigenous people of Bangladesh' className='rounded-lg shadow-lg' />
            </CardContent>
          </Card>
        </section>

        <section id="contact" className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="mb-4">Have questions or suggestions? We'd love to hear from you!</p>
          <Button asChild>
            <a href="mailto:ramrachaim@gmail.com">Contact Us</a>
          </Button>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          <span className="ml-2 text-lg">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}