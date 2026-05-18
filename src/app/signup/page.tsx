import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your free 14-day trial. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name" htmlFor="first">
            <Input id="first" placeholder="Sarah" />
          </FormField>
          <FormField label="Last name" htmlFor="last">
            <Input id="last" placeholder="Chen" />
          </FormField>
        </div>
        <FormField label="School email" htmlFor="email" required>
          <Input id="email" type="email" placeholder="you@school.edu" />
        </FormField>
        <FormField label="Password" htmlFor="password" required hint="At least 8 characters.">
          <Input id="password" type="password" />
        </FormField>
        <Button type="submit" fullWidth size="lg">
          Create account
        </Button>
        <p className="text-center text-xs text-text-subtle">
          By signing up you agree to the{" "}
          <Link href="#" className="underline">Terms</Link> and{" "}
          <Link href="#" className="underline">Privacy Policy</Link>.
        </p>
      </form>
    </AuthLayout>
  );
}
