// 'use client'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {
    // const router = useRouter()
    redirect('/dashboard/profile')
}
