"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Github } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to sign in after registration");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    }
  };

  const handleGitHubSignUp = async () => {
    await signIn("github", { callbackUrl: "/profile" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 rounded-2xl w-full max-w-sm border border-border">
        <form onSubmit={handleEmailSignUp} className="space-y-4">
        <div>
            <label className="block text-muted-foreground text-sm mb-1">Username</label>
            <Input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full"
            />
          </div>
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
          <div>
            <label className="block text-muted-foreground text-sm mb-1">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Sign up with Email
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
          onClick={handleGitHubSignUp}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Github className="w-5 h-5" />
          <span>Sign up with GitHub</span>
        </Button>
        <p className="text-muted-foreground text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}