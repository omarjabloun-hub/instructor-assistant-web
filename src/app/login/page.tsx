import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import { FormField } from "@/components/molecules/FormField";
import { Divider } from "@/components/atoms/Divider";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your instructor workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <FormField label="Email" htmlFor="email" required>
          <Input id="email" type="email" placeholder="you@school.edu" autoComplete="email" />
        </FormField>
        <FormField
          label="Password"
          htmlFor="password"
          required
          hint="Must be at least 8 characters."
        >
          <Input id="password" type="password" autoComplete="current-password" />
        </FormField>
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-text-muted">
            <Checkbox /> Remember me
          </label>
          <Link href="/forgot" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth size="lg">
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Divider />
        <span className="text-xs uppercase tracking-wider text-text-subtle">or</span>
        <Divider />
      </div>

      <div className="space-y-2">
        <Button variant="outline" fullWidth leftIcon={<Mail className="h-4 w-4" />}>
          Continue with Google
        </Button>
        <Button variant="outline" fullWidth leftIcon={<Github className="h-4 w-4" />}>
          Continue with GitHub
        </Button>
      </div>
    </AuthLayout>
  );
}
