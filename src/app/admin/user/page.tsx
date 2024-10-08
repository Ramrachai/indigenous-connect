"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowUpDown, Trash2 } from "lucide-react"
import { API_URL } from '@/config/api'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

type User = {
    _id: string
    fullname: string
    email: string
    role: "user" | "moderator" | "admin"
    status: "active" | "inactive" | "pending" | "suspended"
    whatsapp?: string
    ethnicity?: string
    avatar?: string
}

type SortConfig = {
    key: keyof User
    direction: "asc" | "desc"
}

const statusColors = {
    pending: "bg-orange-100",
    active: "bg-green-100",
    inactive: "bg-gray-100",
    suspended: "bg-red-100",
}

export default function UserDataTable() {
    const [users, setUsers] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [search, setSearch] = useState("")
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "fullname", direction: "asc" })
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users?page=${currentPage}&limit=10&search=${search}`)
            const data = await response.json()
            setUsers(data.users)
            setTotalPages(data.totalPages)
            setTotalUsers(data.totalUsers)
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Sorry, Unable to get users information")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [currentPage, search])

    const handleSort = (key: keyof User) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }))
    }

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1
        return 0
    })

    const handleStatusChange = async (userId: string, newStatus: string) => {
        if (!session?.user?.token) {
            toast.error("You are not authenticated")
            return
        }

        try {
            const response = await fetch(`${API_URL}/users/${userId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                },
                body: JSON.stringify({ status: newStatus }),
            })
            const data = await response.json()

            if (response.ok) {
                fetchUsers()
                toast.success(data.message)
            } else {
                toast.error(data.message || "Failed to update user status")
            }
        } catch (error) {
            console.error("Error updating user status:", error)
            toast.error("Failed to update user status")
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!session?.user?.token) {
            toast.error("You are not authenticated")
            return
        }

        try {
            const response = await fetch(`${API_URL}/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                },
                body: JSON.stringify({ role: newRole }),
            })
            if (response.ok) {
                fetchUsers()
                toast.success("User role updated successfully")
            }
        } catch (error) {
            console.error("Error updating user role:", error)
            toast.error("Failed to update user role")
        }
    }

    const handleDeleteUser = async () => {
        if (!session?.user?.token || !deleteUserId) {
            toast.error("You are not authenticated or no user selected for deletion")
            return
        }
        try {
            const response = await fetch(`${API_URL}/users/${deleteUserId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${session.user.token}`
                },
            })
            if (response.ok) {
                fetchUsers()
                toast.success("User deleted successfully")
            }
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error("Failed to delete user")
        } finally {
            setIsDeleteDialogOpen(false)
            setDeleteUserId(null)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-4">
                <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="text-sm text-muted-foreground">
                    Showing {users.length} of {totalUsers} users
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead onClick={() => handleSort("fullname")} className="cursor-pointer">
                                Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead onClick={() => handleSort("role")} className="cursor-pointer">
                                Role <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                                Status <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead onClick={() => handleSort("ethnicity")} className="cursor-pointer">
                                Ethnicity <ArrowUpDown className="ml-2 h-4 w-4" />
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <div className='h-10 w-10 border rounded-full shadow overflow-hidden'>
                                        <Image
                                            src={user.avatar || "/placeholder.svg"}
                                            alt={user.fullname}
                                            width={60}
                                            height={60}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{user.fullname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onValueChange={(value) => handleRoleChange(user._id, value)}
                                        disabled={session?.user?.role !== "admin"}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="moderator">Moderator</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={user.status}
                                        onValueChange={(value) => handleStatusChange(user._id, value)}
                                        disabled={!["admin", "moderator"].includes(session?.user?.role || "")}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">
                                                <Badge className={`${statusColors.active} hover:text-gray-50 text-gray-700`}>Active</Badge>
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                <Badge className={`${statusColors.inactive} hover:text-gray-50 text-gray-700`}>Inactive</Badge>
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                <Badge className={`${statusColors.pending} hover:text-gray-50 text-gray-700`}>Pending</Badge>
                                            </SelectItem>
                                            <SelectItem value="suspended">
                                                <Badge className={`${statusColors.suspended} hover:text-gray-50 text-gray-700`}>Suspended</Badge>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{user?.whatsapp || "N/A"}</TableCell>
                                <TableCell>{user?.ethnicity?.toUpperCase() || "N/A"}</TableCell>
                                <TableCell>
                                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setDeleteUserId(user._id)}
                                                disabled={session?.user?.role !== "admin"}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete the user
                                                    account and remove their data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="destructive" onClick={handleDeleteUser}>
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}