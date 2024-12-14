"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VerifyOTPInput, verifyOTPSchema } from "@/types/auth-interface";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function VerifyOTPForm({ email, role }: { email: string; role: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  console.log("VerifyOTPForm - Email:", email);
  console.log("VerifyOTPForm - Role:", role);

  const form = useForm<{ code: string }>({
    resolver: zodResolver(verifyOTPSchema.omit({ email: true })),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: { code: string }) {
    try {
      setIsLoading(true);
      console.log("Submitting OTP:", { email, code: data.code, role });
      
      const response = await axios.post(`/api/${role}/auth/verify`, {
        email,
        code: data.code,
      });

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        const redirectUrl = `/auth/${role}/login`;
        console.log("Redirecting to:", redirectUrl);
        router.push(redirectUrl);
      }
      
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[500px] space-y-6">
      <div className="rounded-xl border bg-card p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter the 6-digit code sent to your email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit code"
                      {...field}
                      className="h-11 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="h-11 w-full" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
} 