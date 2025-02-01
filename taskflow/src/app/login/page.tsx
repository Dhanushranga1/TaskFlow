"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen w-screen h-screen flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full" />
      
      {/* TaskFlow Branding */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 mb-10"
      >
        <h1 className="text-7xl font-extrabold tracking-wide text-white neon-glow drop-shadow-lg bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse uppercase">
          TaskFlow
        </h1>
        <p className="text-2xl text-gray-300 mt-2 tracking-wide font-medium">
          "Tasks in Sync, Teams in Flow"
        </p>
      </motion.div>

      {/* Login Form Card
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-80 z-10 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input
              id="email"
              placeholder="youremail@example.com"
              type="email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-gray-700 text-white border-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-4 py-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
              required
              className="bg-gray-700 text-white border-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-4 py-2"
            />
          </LabelInputContainer>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            className="w-full text-white font-medium bg-gradient-to-br from-indigo-600 to-purple-800 hover:from-purple-700 hover:to-indigo-600 h-12 rounded-md shadow-lg transition-all"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-500 to-transparent" />

        <div className="flex flex-col space-y-4">
          <SocialLoginButton icon={IconBrandGithub} text="Continue with GitHub" />
          <SocialLoginButton icon={IconBrandGoogle} text="Continue with Google" />
        </div>
      </motion.div> */}
      <motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-transparent 
  hover:shadow-indigo-500/30 transform transition duration-500"
>
  <h2 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg neon-text">
    Welcome Back
  </h2>

  <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
    <LabelInputContainer>
      <Label htmlFor="email" className="text-gray-300 tracking-wider">
        Email Address
      </Label>
      <Input
        id="email"
        placeholder="youremail@example.com"
        type="email"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
        required
        className="w-full bg-gray-900 text-white border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/70 rounded-lg px-4 py-3 transition-all duration-300"
      />
    </LabelInputContainer>

    <LabelInputContainer>
      <Label htmlFor="password" className="text-gray-300 tracking-wider">
        Password
      </Label>
      <Input
        id="password"
        placeholder="••••••••"
        type="password"
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
        required
        className="w-full bg-gray-900 text-white border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/70 rounded-lg px-4 py-3 transition-all duration-300"
      />
    </LabelInputContainer>

    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

    <button
      className="relative w-full text-white font-medium bg-gradient-to-br from-indigo-600 to-purple-800 hover:from-purple-700 hover:to-indigo-600 h-12 rounded-xl shadow-lg 
      transition-all hover:shadow-purple-600/50 hover:-translate-y-1 transform duration-300"
      type="submit"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Log In →"}
    </button>
  </form>

  <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-500 to-transparent" />

  <div className="flex flex-col space-y-4">
    <SocialLoginButton icon={IconBrandGithub} text="Continue with GitHub" />
    <SocialLoginButton icon={IconBrandGoogle} text="Continue with Google" />
  </div>
</motion.div>



    </div>
  );
}

const SocialLoginButton = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => {
  return (
    <button
      className="flex items-center justify-center space-x-3 w-full text-white rounded-md h-10 font-medium shadow-input bg-gray-700 hover:bg-gray-600 transition-all border border-gray-600"
      type="button"
    >
      <Icon className="h-5 w-5 text-gray-300" />
      <span className="text-gray-300 text-sm">{text}</span>
    </button>
  );
};

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col space-y-2 w-full">{children}</div>;
};
