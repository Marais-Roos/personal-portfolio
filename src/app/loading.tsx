export default function Loading() {
  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Simple accessible spinner */}
      <div className="w-12 h-12 border-4 border-background-secondary border-t-accent rounded-full animate-spin"></div>
      <p className="text-dominant font-medium animate-pulse">Loading portfolio...</p>
    </div>
  )
}