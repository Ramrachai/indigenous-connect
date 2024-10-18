"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PendingPage() {

    const {data : session} = useSession()
    const router = useRouter()
    console.log("--session data ---", session)

    useEffect( ()=> {
        if(!session) {
            router.push('/')
        }
    }, [session, router])
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Account Pending</CardTitle>
          <CardDescription>Your account is currently pending approval.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please wait for an administrator to approve your account. You'll be notified via email once your account is active.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => signOut({callbackUrl: '/'})} variant="outline" className="w-full">
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}