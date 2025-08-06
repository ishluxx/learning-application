import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MainPage from './main'
import Footer from './footer'
import Header from './header'

export default function Landing() {
  return (
    <>
    <div className="dark:bg-neutral-900">
        <Header/>
        <MainPage/>
        <Footer/>
    </div>
    </>
  )
}
