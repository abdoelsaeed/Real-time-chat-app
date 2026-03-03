"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
type AuthForm = {
    name?: string;
    email: string;
    password: string;
};
type AuthCardProps = {
    title?: string
    description?: string
    submitLabel?: string
    googleLabel?: string
    link?: string
    linkText?: string
    fetchUrl?:string
}

export function AuthCard({
    title = "Login to your account",
    description = "Enter your email below to login to your account",
    submitLabel = "Login",
    googleLabel = "Login with Google",
    link='/auth/login',
    linkText="Login",
    fetchUrl = "/api/auth/login"
}: AuthCardProps) {
    
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthForm>();

    async function onSubmit(data:AuthForm){
        
        const res = await fetch(fetchUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        })
        if(!res.ok){
            const error = await res.json();
             
            alert(error?.message || "Login failed");
            return;
        }
        const result: { success: string } = await res.json();
        console.log(result);

        if (result.success){
            router.push("/")
        }
    }

    return (
        <Card className="w-full max-w-sm border-border/60 shadow-md">
            <CardHeader className="space-y-1">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-4" id="auth-form" onSubmit={handleSubmit((onSubmit))}>
                    {(submitLabel ==="Signup"&&
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="john"
                                required
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required placeholder="******"            {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                        })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link href="#" className="underline-offset-4 hover:underline">
                            Forgot your password?
                        </Link>
                        <Link href={link} className="underline-offset-4 hover:underline">
                            {linkText}
                        </Link>
                    </div>
                </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" disabled={isSubmitting} form="auth-form">
                    {submitLabel}
                </Button>
                <Button variant="outline" className="w-full " disabled={isSubmitting}>
                    {googleLabel}
                    <svg
                        aria-hidden="true"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M21.35 11.1H12v2.98h5.34c-.23 1.5-1.73 4.4-5.34 4.4-3.21 0-5.83-2.66-5.83-5.95s2.62-5.95 5.83-5.95c1.83 0 3.05.78 3.75 1.45l2.56-2.47C16.67 3.98 14.54 3 12 3 6.92 3 2.8 7.14 2.8 12.22S6.92 21.44 12 21.44c6.92 0 9.2-4.86 9.2-7.37 0-.5-.05-.86-.12-1.24l.27-1.73Z"
                            fill="#4285F4"
                        />
                        <path
                            d="M6.12 14.27 5.2 14.98l-3.2 2.5A9.2 9.2 0 0 0 12 21.44c2.54 0 4.67-.83 6.22-2.26l-2.88-2.22c-.78.54-1.8.92-3.34.92-3.6 0-5.1-2.9-5.34-4.4l-.54.79Z"
                            fill="#34A853"
                        />
                        <path
                            d="M2 6.96A9.18 9.18 0 0 0 2 17.48l4.12-3.2a5.96 5.96 0 0 1 0-3.8L2 6.96Z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 6.57c1.95 0 3.27.84 4.03 1.55l2.94-2.87C16.66 3.1 14.54 2.22 12 2.22A9.2 9.2 0 0 0 2 6.96l4.12 3.2c.25-1.5 1.74-3.6 5.88-3.6Z"
                            fill="#EA4335"
                        />
                    </svg>
                </Button>
            </CardFooter>
        </Card>
    )
}
