"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Bell, Lightbulb, Image as ImageIcon, Video, Headphones, FileText, Users, ArrowRight, LogIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import banner1 from "@/assets/banner1.jpg"

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Posts",
      description: "Join a dynamic platform where you can share insights and foster meaningful discussions with fellow members."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Real-Time Chat",
      description: "Establish connections with other members through instant messaging, facilitating prompt and effective communication."
    },
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: "Team Formation",
      description: "Assemble your team and embark on collaborative projects—private groups provide an excellent foundation for collective achievement."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Innovation Hub",
      description: "Encourage creativity by sharing and exploring groundbreaking ideas that contribute to the growth of our community."
    },
  ];



  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-20 mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">Welcome to Indigenous Connect</h1>
          <p className="text-xl mb-8 text-muted-foreground">Uniting the Indigenous Community of Bangladesh</p>
          <Button size="lg" asChild className="rounded-full mr-3">
            <Link href="/login">Login <LogIn className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" asChild className="rounded-full">
            <Link href="/register">Join Our Community <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </section>


        <section id="about" className="mb-20">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h2 className="text-3xl font-semibold mb-4">About Indigenous Connect</h2>
                  <p className="text-muted-foreground mb-4">
                    Indigenous Connect is a platform dedicated to uniting the indigenous community of Bangladesh. Our mission is to provide a space for sharing, learning, and preserving our rich cultural heritage while addressing the unique challenges and opportunities faced by our community.
                  </p>
                  <Button asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={banner1}
                    layout="fill"
                    objectFit="cover"
                    alt="Indigenous people of Bangladesh"
                    className="rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="features" className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${activeFeature === index ? 'border-stone-400 shadow-lg' : 'hover:border-stone-400'}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      {feature.icon}
                      <span className="ml-2">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="hidden md:block">
              <Card className="h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="text-center p-8 flex flex-col justify-center items-center">
                  <div className="text-6xl mb-4">{features[activeFeature].icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{features[activeFeature].title}</h3>
                  <p className="text-muted-foreground">{features[activeFeature].description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-xl font-semibold mb-10 text-center">Media Sharing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MediaCard icon={<ImageIcon className="h-8 w-8 text-emerald-500" />} title="Image Sharing" description="Share your photos with the community" />
            <MediaCard icon={<Video className="h-8 w-8 text-emerald-500" />} title="Video Sharing" description="Upload and watch community videos" />
            <MediaCard icon={<Headphones className="h-8 w-8 text-emerald-500" />} title="Audio Sharing" description="Share music and audio recordings" />
            <MediaCard icon={<FileText className="h-8 w-8 text-emerald-500" />} title="Document Sharing" description="Upload and download important documents" />
          </div>
        </section>


        <section id="contact" className="text-center py-20">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground mb-8">Have questions or suggestions? We'd love to hear from you!</p>
          <Button size="lg" asChild className="rounded-full">
            <a href="mailto:ramrachaim@gmail.com">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </section>
      </main>
    </div>
  )
}

function MediaCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto bg-emerald-100 rounded-full p-3 mb-4">
          {icon}
        </div>
        <CardTitle className='text-base'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}