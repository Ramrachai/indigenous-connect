"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { HomeIcon, PenToolIcon, BarChartIcon, MessageSquare, ChevronLeftIcon, ChevronRightIcon, MessageCircleMore, Presentation, CalendarCheck, Brain, HandCoins, HandCoinsIcon, User2, Settings2, PhoneOutgoing, Image, Video, AudioWaveform, AudioLines, File } from 'lucide-react'

const menuItems = [
  { href: '/admin/dashboard', icon: HomeIcon, label: 'Overview' },
  { href: '/admin/post', icon: PenToolIcon, label: 'Posts' },
  { href: '/admin/chat', icon: MessageCircleMore, label: 'Chat' },
  { href: '/admin/event', icon: CalendarCheck, label: 'Events' },
  { href: '/admin/notice-board', icon: Presentation, label: 'Notice Board' },
  { href: '/admin/idea', icon: Brain, label: 'Ideas' },
  { href: '/admin/donation', icon: HandCoinsIcon, label: 'Donation' },
  { href: '/admin/comments', icon: MessageSquare, label: 'Comments' },
  { href: '/admin/report', icon: BarChartIcon, label: 'Report' },
  { href: '/admin/user', icon: User2, label: 'Users' },
  { href: '/admin/image', icon: Image, label: 'Images' },
  { href: '/admin/video', icon: Video, label: 'Videos' },
  { href: '/admin/audio', icon: AudioLines, label: 'Audios' },
  { href: '/admin/document', icon: File, label: 'Documents' },
  { href: '/admin/setting', icon: Settings2, label: 'Settings' },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div className={`flex flex-col h-full  transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-xl">Admin Panel</h2>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-stone-200 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
              hover:bg-stone-200 text-stone-700 hover:text-stone-900
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className={`h-4 w-4 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}