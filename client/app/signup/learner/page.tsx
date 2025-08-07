import { SignUpForm } from "@/components/auth/signup-form";

export default function StudentSignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <SignUpForm 
        title="Student Sign Up"
        description="Create your student account to start learning"
        userType="student"
      />
    </div>
  );
}