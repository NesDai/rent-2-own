"use client"
import { Button } from "@/components/ui/button"
import { Header } from "./header"
import { ChevronDown, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="opacity-20"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 space-y-6 mb-8 max-w-4xl mt-16 md:mt-[120px] lg:mt-[160px] px-4">
        <div className="space-y-4">
          <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rent. Compete. Own.
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
            The fastest way to own NFTs — pay rent, stack ownership, win the asset.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 animate-glow-pulse">
            Start Competing
          </Button>
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 bg-transparent"
          >
            <Play className="w-5 h-5" />
            Learn How It Works
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}
