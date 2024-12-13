import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - AI Assignment Grading",
  description: "Authentication pages for AI Assignment Grading platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 