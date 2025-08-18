
import LandingHeader from "@/components/ui/landingheader";
// import Footer from './footer';
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MainPage from './main'
import Footer from './footer'
import Header from './header'


import { 
  BookOpen, 
  Users, 
  Award,
  Monitor,
  CheckCircle,
  Rocket,
  Building,
  Mail,
  ArrowRight
} from "lucide-react";
import AIChatIcon from "@/components/ai/page";

function LandingPage() {
  return (

    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      <LandingHeader />
       <AIChatIcon />
      
      {/* Hero Section */}
      <section id="home" className="dark:bg-black dark:text-gray-200 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl font-bold mb-6">Start Your Learning Journey Today</h1>
              <p className="text-xl mb-8">Access world-class education from anywhere. Learn at your own pace with our comprehensive online courses.</p>
              
<div className="flex gap-4">
  <Button size="lg" asChild>
    <Link href="/login/select-role">
      Get Started
    </Link>
  </Button>
  <Button size="lg" variant="outline" asChild>
    <Link href="/login/select-role">
      Learn More
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </Button>
</div>
            </div>
            <div className="lg:w-1/2">
  <img 
    src="/landing.png" 
    alt="Learning illustration" 
    className="w-full h-auto rounded-lg shadow-1xl  dark:opacity-80"
  />
</div>
          </div>
        </div>
      </section>
          
     

      {/* Features Section */}
      <section id="features" className="py-16 dark:bg-black dark:text-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover what makes our platform the perfect choice for your learning journey
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Monitor className="w-full h-full" />}
              title="Interactive Learning"
              description="Engage with dynamic content, quizzes, and real-time feedback for an immersive learning experience"
            />
            <FeatureCard 
              icon={<Users className="w-full h-full" />}
              title="Expert Instructors"
              description="Learn from industry professionals and experienced educators who are passionate about teaching"
            />
            <FeatureCard 
              icon={<Award className="w-full h-full" />}
              title="Certified Courses"
              description="Earn recognized certificates upon completion to showcase your achievements"
            />
            <FeatureCard 
              icon={<BookOpen className="w-full h-full" />}
              title="Rich Content Library"
              description="Access a vast collection of courses, tutorials, and resources across various subjects"
            />
            <FeatureCard 
              icon={<Rocket className="w-full h-full" />}
              title="Self-Paced Learning"
              description="Learn at your own speed with flexible schedules and lifetime access to course materials"
            />
            <FeatureCard 
              icon={<CheckCircle className="w-full h-full" />}
              title="Progress Tracking"
              description="Monitor your learning progress with detailed analytics and performance insights"
            />
          </div>
        </div>
      </section>

  

      {/* How It Works Section */}
<section id="how-it-works" className="py-16 dark:bg-black dark:text-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
    <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
      Get started with these simple steps
    </p>
    <div className="grid md:grid-cols-4 gap-8">
      <StepCard 
        icon={<Users />}
        step={1}
        title="Create Account"
        description="Sign up as student, teacher, or facilitator"
      />
      <StepCard 
        icon={<Rocket />}
        step={2}
        title="Login"
        description="Access your personalized dashboard"
      />
      <StepCard 
        icon={<BookOpen />}
        step={3}
        title="Choose Course"
        description="Browse our extensive catalog"
      />
      <StepCard 
        icon={<Award />}
        step={4}
        title="Start Learning"
        description="Begin your learning journey"
      />
    </div>
  </div>
</section>

      {/* Partners Section */}
      
<section id="partners" className="py-16 dark:bg-black dark:text-gray-100">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-4">Our Partners</h2>
    <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
      We collaborate with leading organizations to deliver quality education
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {['part1', 'part2', 'part3'].map((part) => (
        <div key={part} className="p-8 flex items-center justify-center">
          <img 
            src={`/${part}.png`} 
            alt={`Partner ${part}`} 
            className="max-h-20 w-auto opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-16 dark:bg-black dark:text-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg  focus:ring-primary focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg focus:ring-primary focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border rounded-lg focus:ring-primary focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-primary focus:outline-none"
              ></textarea>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );

    // <>
    // <div className="dark:bg-neutral-900">
    //     <Header/>
    //     <MainPage/>
    //     <Footer/>
    // </div>
    // </>
  

}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow dark:bg-[#1a1a1a] dark:text-gray-100">
      <div className="w-12 h-12 mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-450">{description}</p>
    </div>
  );
}

type StepCardProps = {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
};

function StepCard({ icon, step, title, description }: StepCardProps) {
  return (
    <div className="text-center p-6 ">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 dark:bg-primary/20">
        {icon}
      </div>
      <div className="text-2xl font-bold text-primary mb-2">Step {step}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default LandingPage;