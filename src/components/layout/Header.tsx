'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

const navigationItems = [
  { name: 'Posts', href: '/blog' },
  { name: 'Chat', href: '/chat' },
  { name: 'Events', href: '/event' },
  { name: 'Notice Board', href: '/notice-board' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Donation', href: '/donation' },
  {
    name: 'File Manager',
    items: [
      { name: 'Photos', href: '/files/images' },
      { name: 'Videos', href: '/files/videos' },
      { name: 'Audios', href: '/files/audios' },
      { name: 'Documents', href: '/files/documents' },
    ],
  },
]

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    router.push(data.url)
  }

  if (!session || session?.user.status =='pending') return null

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold md:text-2xl">Indigenous Connect</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex lg:gap-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.href ? (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    ) : (
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    )}
                    {item.items && (
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='w-8 h-8 rounded-full overflow-hidden border shadow hover:cursor-pointer hover:shadow-lg'>
                <Image className='object-cover w-full h-full' src={session.user?.avatar || "/placeholder.svg"} alt={session.user?.fullname || ''} height={40} width={40} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 gap-1">
                  <p className="text-sm font-medium leading-none">{session.user?.fullname}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground flex justify-between gap-1 flex-wrap">
                    <span>Role: {session.user?.role}</span>
                    <span>Status: {session.user?.status}</span>
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-3">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.href ? (
                        <Link href={item.href} className="block text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                          {item.name}
                        </Link>
                      ) : (
                          <div className="py-2">
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <div className="ml-4 mt-2 flex flex-col gap-2">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block py-1 text-sm"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                      )}
                    </div>
                  ))}
                  <Link href="/admin/dashboard" className="block py-2 text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}>Sign Out</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}