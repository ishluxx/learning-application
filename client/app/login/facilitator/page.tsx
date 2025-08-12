import { LoginForm } from "@/components/auth/login-form";

export default function FacilitatorLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <LoginForm 
        title="Facilitator Login"
        description="Welcome back! Please login to your facilitator account"
        userType="student"
      />
    </div>
  );
}