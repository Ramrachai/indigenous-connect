import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { username, password } = await request.json()
    console.log("--login--", username, password)

    // In a real application, you would check these credentials against a database
    if (username === 'admin' && password === 'password') {
        return NextResponse.json({ success: true, token: 'fake-jwt-token' })
    } else {
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }
}

export async function GET(request: Request) {
    console.log("--get route hit--")
    return NextResponse.json({ message: "Working" })
}