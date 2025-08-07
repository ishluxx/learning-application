
"use client"

import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { IconInnerShadowTop } from "@tabler/icons-react"

export function LandingHeader() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/Dashboard')
  const isCourses = pathname?.startsWith('/courses')
  const hideNavigation = isDashboard || isCourses

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center ml-10">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
        </div>
        
        {/* Navigation Menu - Hidden on Dashboard and Courses */}
        {!hideNavigation && (
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, 'how-it-works')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </a>
            <a 
              href="#partners" 
              onClick={(e) => scrollToSection(e, 'partners')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Partners
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </a>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!hideNavigation ? (
            <>
              <Link 
                href="/login/select-role" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Login
              </Link>
             
            </>
          ) : null}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default LandingHeader;