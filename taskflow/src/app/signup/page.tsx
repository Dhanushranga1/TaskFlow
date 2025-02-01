"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    router.push("/login"); // Redirect to login after successful signup
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Animation covering the entire page */}
      <BackgroundGradientAnimation />

      {/* Centered content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* TaskFlow Branding */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <Image
            src="/logo.svg" // Replace with actual logo
            width={100}
            height={100}
            alt="TaskFlow Logo"
            className="mb-4 mx-auto"
          />
          <h1 className="text-6xl font-extrabold tracking-wide text-white neon-glow">
            TaskFlow
          </h1>
          <p className="text-xl text-gray-300 mt-2 tracking-wide">
            "Tasks in Sync, Teams in Flow"
          </p>
        </motion.div>

        {/* Signup Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md p-8 bg-white dark:bg-black rounded-lg shadow-xl backdrop-blur-md bg-opacity-20 dark:bg-opacity-40 z-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Create Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <LabelInputContainer>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="neon-glow"
              />
            </LabelInputContainer>

            {/* Email Field */}
            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="youremail@example.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="neon-glow"
              />
            </LabelInputContainer>

            {/* Password Field */}
            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="neon-glow"
              />
            </LabelInputContainer>

            {/* Signup Button */}
            <button
              className="relative group/btn w-full text-white font-medium bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 h-12 rounded-md shadow-lg transition-all"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up →"}
              <BottomGradient />
            </button>

            {/* Divider */}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-4">
              <SocialLoginButton icon={IconBrandGithub} text="GitHub" />
              <SocialLoginButton icon={IconBrandGoogle} text="Google" />
              <SocialLoginButton icon={IconBrandOnlyfans} text="OnlyFans" />
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* Social Login Button */
const SocialLoginButton = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <button
      className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="button"
    >
      <Icon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        {text}
      </span>
      <BottomGradient />
    </button>
  );
};

/* Bottom Gradient Effect */
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

/* Label and Input Container */
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
