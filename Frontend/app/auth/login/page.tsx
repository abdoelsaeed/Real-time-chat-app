import { AuthCard } from "@/app/_components/AuthCard";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <AuthCard
                title="Login to your account"
                description="Enter your email below to login to your account"
                submitLabel="Login"
                googleLabel="Login with Google"
                link='/auth/signup'
                linkText="Sign up"
                fetchUrl="/api/auth/login"
                />
        </div>

    );
}
