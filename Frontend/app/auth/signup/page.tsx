import { AuthCard } from "@/app/_components/AuthCard";

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <AuthCard
                title="Create your account"
                description="Enter your details below to create your account"
                submitLabel="Signup"
                googleLabel="Continue with Google"
                link='/auth/login'
                linkText="Go Login"
                fetchUrl="/api/auth/signup"
            />
        </div>

    );
}
