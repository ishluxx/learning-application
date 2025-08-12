import { SignUpForm } from "@/components/auth/signup-form";

export default function FacilitatorSignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <SignUpForm 
        title="Facilitator Sign Up"
        description="Create your facilitator account to support learning"
        userType="facilitator"
      />
    </div>
  );
}