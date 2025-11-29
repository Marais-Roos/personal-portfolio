import Link from 'next/link'
import Button from "@/components/Button"; // Re-using your existing button

export default function NotFound() {
  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center text-center p-6 gap-6">
      <h1 className="text-9xl font-black text-dominant opacity-10">404</h1>
      <h2 className="text-4xl font-bold text-dominant">Page not found</h2>
      <p className="text-xl max-w-md">
        Oops! It seems you've wandered off the map. This page doesn't exist (or I haven't built it yet).
      </p>
      <div className="mt-4">
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  )
}