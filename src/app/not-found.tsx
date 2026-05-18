import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-bg p-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-text">Page not found</h1>
        <p className="text-text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard">
          <Button>Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
