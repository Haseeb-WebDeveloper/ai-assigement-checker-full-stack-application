"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  "AI-Powered Assignment Grading",
  "Instant Plagiarism Detection",
  "Detailed Feedback Reports",
];

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Theme Toggle */}
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Central Content */}
        <div className="flex flex-col items-center justify-center pt-16 text-center md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
              Transform Assignment Grading with{" "}
              <span className="text-primary">AI</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Streamline your academic workflow with our intelligent grading
              platform. Fast, accurate, and consistent evaluation for every
              submission.
            </p>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 rounded-full bg-primary/5 px-4 py-1"
              >
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" className="gap-2">
              <Link href="/auth" className="flex items-center gap-2 ">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative mt-16 w-full max-w-5xl"
          >
            <div className="relative rounded-t-2xl border border-primary/10 bg-card/50 p-2 backdrop-blur-sm">
              {/* Browser-like top bar */}
              <div className="mb-2 flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/20" />
                <div className="h-3 w-3 rounded-full bg-primary/20" />
                <div className="h-3 w-3 rounded-full bg-primary/20" />
              </div>
              
              {/* Dashboard Preview */}
              <div className="aspect-[16/9] overflow-hidden rounded-lg border border-primary/10 bg-card">
                <div className="grid h-full grid-cols-12 gap-4 p-6">
                  {/* Sidebar */}
                  <div className="col-span-3 space-y-4">
                    <div className="h-8 w-3/4 rounded bg-primary/10" />
                    <div className="h-4 w-full rounded bg-primary/5" />
                    <div className="h-4 w-full rounded bg-primary/5" />
                    <div className="h-4 w-full rounded bg-primary/5" />
                  </div>
                  
                  {/* Main Content */}
                  <div className="col-span-9 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 rounded-lg bg-primary/5" />
                      ))}
                    </div>
                    <div className="h-48 rounded-lg bg-primary/10" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative gradient */}
            <div className="absolute -bottom-8 -z-10 h-24 w-full blur-2xl">
              <div className="h-full w-full bg-gradient-to-r from-primary/30 via-primary/5 to-primary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 