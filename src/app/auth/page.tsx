"use client";

import { motion } from "framer-motion";
import { GraduationCap, School, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

const roles = [
  {
    title: "Student",
    description: "Submit assignments and get AI-powered feedback",
    icon: GraduationCap,
    href: "/auth/student/signup",
    color: "bg-primary",
  },
  {
    title: "Teacher",
    description: "Grade assignments and manage your classes",
    icon: School,
    href: "/auth/teacher/signup",
    color: "bg-blue-500",
  },
];

export default function AuthPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Theme Toggle */}
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <main className="container flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Welcome to{" "}
            <span className="text-primary">AI Assignment Grading</span>
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Choose your role to get started with our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid w-full max-w-2xl gap-6 sm:grid-cols-2"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={role.href} className="block h-full">
                <div className="relative h-full overflow-hidden rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className={`h-full w-full ${role.color} blur-3xl transition-all group-hover:opacity-70`}
                    />
                  </div>

                  <div className="relative">
                    <role.icon className="h-8 w-8 text-primary" />
                    <h2 className="mt-4 text-xl font-semibold">{role.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {role.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full justify-between"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
