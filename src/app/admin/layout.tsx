import { Sidebar } from '@/components/admin/Sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 overflow-auto p-8">
                {children}
            </div>
        </div>
    )
}