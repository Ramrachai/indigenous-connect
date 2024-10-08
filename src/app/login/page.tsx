"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'
import { ArrowLeftIcon, Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import banner2 from "@/assets/banner2.jpg"


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Logged in successfully')
        router.push("/admin/dashboard")
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <Link href={"/"} className='flex gap-3 text-sm text-gray-400 hover:text-gray-700 hover:underline mt-6'><ArrowLeftIcon /> Back to home</Link>
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">Welcome Back</h2>
          <p className="text-muted-foreground mb-6 text-center">Log in to connect with your Indigenous community</p>
          <Image
            src={banner2}
            alt="Indigenous Connect"
            width={300}
            height={300}
            className="rounded-lg shadow-md mx-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register('email')} type="email" placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>
            <div className="flex justify-between text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline hover:text-blue-500">
                Forgot your password?
              </Link>
              <Link href="/register" className="text-primary hover:underline hover:text-blue-500">
                Create an account
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}