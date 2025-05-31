"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Github } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl);
    }
  };

  const handleGitHubSignIn = async () => {
    await signIn("github", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 rounded-2xl w-full max-w-sm border border-border">
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-muted-foreground text-sm mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-sm mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Sign in with Email
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <Button
          onClick={handleGitHubSignIn}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Github className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </Button>
        <p className="text-muted-foreground text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}