"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { ArrowLeftIcon, Eye, EyeOff, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { API_URL } from '@/config/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import banner2 from "@/assets/banner2.jpg"
import Link from 'next/link'

const registerSchema = z.object({
  fullname: z.string().min(2, 'Fullname must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  whatsapp: z.string()
    .regex(/^\d+$/, 'WhatsApp number must only contain digits')
    .min(6, 'WhatsApp number must be at least 6 digits long')
    .max(15, 'WhatsApp number can be at most 15 digits long')
    .optional(),
  ethnicity: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  avatar: z.any()
    .optional()
    .refine(
      (file) => {
        if (typeof window === 'undefined') return true; // Server-side
        return file instanceof FileList;
      },
      "Invalid file"
    )
    .transform(file => {
      if (typeof window === 'undefined') return undefined; // Server-side
      return file?.[0] ?? undefined;
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value)
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (err) {
          throw new Error('Registration failed');
        }
        throw new Error(errorData.message || 'Registration failed')
      }

      toast.success("Registration successful! Please log in now.")
      reset()
      setAvatarPreview(null)
      router.push('/login')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex justify-center flex-col gap-2 items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <Link href={"/"} className='flex gap-3 text-sm text-gray-400 hover:text-gray-700 hover:underline'><ArrowLeftIcon /> Back to home</Link>

      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">Join Indigenous Connect</h2>
          <p className="text-muted-foreground mb-6 text-center">Connect with your community and share your heritage.</p>
          <Image
            src={banner2}
            alt="Indigenous Connect"
            width={250}
            height={400}
            className="rounded-lg shadow-md mx-auto"
          />
          <p className='text-sm mt-6 sm:mt-10 text-center'>Already have an account ? <Link href={'/login'} className='hover:underline hover:text-sky-600'>Login here</Link> </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="register-fullname">Full name</Label>
              <Input id="register-fullname" {...register('fullname')} />
              {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" {...register('email')} type="email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-phone">WhatsApp number</Label>
              <Input id="register-phone" {...register('whatsapp')} type="tel" />
              {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-ethnicity">Ethnicity</Label>
              <Input id="register-ethnicity" {...register('ethnicity')} />
              {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                {...register('password')}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                {...register('confirmPassword')}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-avatar">Upload your avatar</Label>
            <Input
              id="register-avatar"
              type="file"
              accept="image/*"
              {...register('avatar')}
              onChange={(e) => {
                register('avatar').onChange(e);
                handleAvatarChange(e);
              }}
            />
            {avatarPreview && (
              <div className="mt-2 flex justify-center">
                <img src={avatarPreview} alt="Avatar Preview" className="h-20 w-20 object-cover rounded-full border-2 border-primary" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}