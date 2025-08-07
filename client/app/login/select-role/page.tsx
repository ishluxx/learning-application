import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, UserCog } from "lucide-react";
import Link from "next/link";

export default function SelectRole() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Select Your Role
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          <RoleCard 
            icon={<GraduationCap className="h-8 w-8" />}
            title="Student"
            description="Access your courses and learning materials"
            href="/login/learner"
          />
          <RoleCard 
            icon={<Users className="h-8 w-8" />}
            title="Teacher"
            description="Manage your classes and course content"
            href="/login/teacher"
          />
          <RoleCard 
            icon={<UserCog className="h-8 w-8" />}
            title="Facilitator"
            description="Oversee and support learning activities"
            href="/login/facilitator"
          />
        </div>
      </div>
    </div>
  );
}

type RoleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
};

function RoleCard({ icon, title, description, href }: RoleCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow pages/landing/landing.tsx">
      <Link href={href}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            {icon}
          </div>
          <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          <Button className="w-full">
            Login as {title}
          </Button>
        </div>
      </Link>
    </Card>
  );
}