import { LoginForm } from "@/components/auth/login-form";

export default function TeacherLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <LoginForm 
        title="Teacher Login"
        description="Welcome back! Please login to your teacher account"
        userType="student"
      />
    </div>
  );
}