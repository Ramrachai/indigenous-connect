"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Clock, Mail, Phone } from "lucide-react"

export default function PendingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/')
    } else if (status === "authenticated" && session?.user?.status !== "pending") {
      router.push('/')
    }
  }, [status, session, router])

  if (status === "loading") {
    return <PendingPageSkeleton />
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={session.user.avatar} alt={session.user.fullname} />
              <AvatarFallback>{session.user.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold">{session.user.fullname}</CardTitle>
          <CardDescription className="text-indigo-600 font-semibold">Account Pending Approval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded" role="alert">
            <p className="font-bold">Account Status: Pending</p>
            <p>Your account is currently under review. We'll notify you via email once it's approved.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="text-gray-500" size={16} />
              <span>{session.user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="text-gray-500" size={16} />
              <span>{session.user.whatsapp}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="text-gray-500" size={16} />
              <span>Joined {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button onClick={() => signOut({callbackUrl: '/'})} variant="outline" className="w-full">
            Sign Out
          </Button>
          <p className="text-sm text-center text-gray-500">
            Need help? Contact support at support@example.com
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

function PendingPageSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}