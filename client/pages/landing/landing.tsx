
import LandingHeader from "@/components/ui/landingheader";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MainPage from './main'
import Footer from './footer'
import Header from './header'

function LandingPage() {
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
export default LandingPage;