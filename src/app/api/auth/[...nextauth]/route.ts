import NextAuth, { NextAuthOptions, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { API_URL } from "@/config/api"

declare module "next-auth" {
    interface IUser {
        id: string;
        fullname: string;
        email: string;
        avatar: string;
        whatsapp: string;
        token: string;
        role: string;
        status: "active" | "inactive" | "pending" | "suspended";
    }

    interface Session {
        user: DefaultUser & IUser;
    }

    interface User extends DefaultUser, IUser { }

    interface JWT extends IUser { }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null

                const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                console.log("--login user --", user)

                if (res.ok && user) {
                    return {
                        id: user.id,
                        fullname: user.fullname, 
                        email: user.email,
                        avatar: user.avatar,
                        whatsapp: user.whatsapp,
                        token: user.token,
                        role: user.role,
                        status: user.status 
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.fullname = user.fullname
                token.email = user.email
                token.avatar = user.avatar
                token.whatsapp = user.whatsapp
                token.token = user.token
                token.role = user.role
                token.status = user.status
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                fullname: token.fullname,
                email: token.email,
                avatar: token.avatar,
                whatsapp: token.whatsapp,
                token: token.token,
                role: token.role,
                status: token.status
            } as any

            console.log(session)
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }