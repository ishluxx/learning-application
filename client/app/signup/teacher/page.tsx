import { SignUpForm } from "@/components/auth/signup-form";

export default function TeacherSignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <SignUpForm 
        title="Teacher Sign Up"
        description="Create your teacher account to start teaching"
        userType="teacher"
      />
    </div>
  );
}