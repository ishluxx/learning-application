import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Footer from './footer'

export default function Landing() {
  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <h1 className='text-center mb-5 '>Landing Page</h1>
        <p>Welcome to the landing page of our application.</p>
        <Button>
            <Link href="/student">
                Go to Student Dashboard  
            </Link>
        </Button>
        <Button className='mt-4'>
            <Link href="/teacher">
                Go to Teacher Dashboard  
            </Link>
        </Button>
    </div>
        <Footer/>
    </>
  )
}
