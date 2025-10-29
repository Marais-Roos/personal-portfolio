import Navbar from "@/components/Navbar"; 

export default function Home() {
  return (
    <div
      // 1. Applies the background and ensures the element fills the screen height
      className="bg-background-primary min-h-screen"
    >
      <div
        // This is the CONTENT WRAPPER where we apply the main layout rules:
        // - flex-col, items-center: Layout and centering from your design.
        // - max-w-[1440px] mx-auto: Replicates the 1440px width and centers it.
        // - py-4 px-18: Vertical (16px) and Horizontal (72px) padding.
        // - gap-24: Vertical spacing (96px) between main sections.
        className="
          flex 
          flex-col 
          items-center 
          max-w-[1440px] 
          mx-auto 
          py-4 
          px-18 
          gap-24 
          w-full
        "
      >
        {/* The Navbar component */}
        <Navbar />
        
        {/* Semantic main content area for the Hero Section and other page content */}
        <main className="flex flex-col items-center justify-start flex-grow">
          <h1 className="text-4xl text-dominant mt-16">
            Welcome to the Portfolio!
          </h1>
          <p className="text-lg text-dominant mt-4">
            This is where we'll build the rest of your hero section.
          </p>
        </main>
      </div>
    </div>
  );
}