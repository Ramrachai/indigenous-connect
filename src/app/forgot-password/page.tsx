'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { API_URL } from '@/config/api'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        console.log("email --", email)
        try {
            const res = await fetch(API_URL + '/auth/forgot-password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message)
                setSuccess(true)
            } else {
                toast.error(data.message)
                setSuccess(false)
            }
        } catch (err) {
            setError('Failed to send reset email. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!success ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {isLoading ? 'Sending...' : 'Send reset link'}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">Check your email</h3>
                            <p className="mt-1 text-sm text-gray-500">We've sent a password reset link to {email}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-3 flex items-center justify-center text-sm text-red-600">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            {error}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="text-center">
                    <Button
                        variant="link"
                        className="text-sm text-gray-600 hover:text-gray-900"
                        onClick={() => router.push('/login')}
                    >
                        Back to login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}