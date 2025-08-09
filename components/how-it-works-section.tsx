"use client"

import { useState } from "react"
import { CheckCircle, Users, Trophy, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    id: 1,
    title: "List an NFT",
    description: "Seller sets price, rent rate, and minimum term",
    icon: <CheckCircle className="w-8 h-8" />,
    details:
      "NFT owners can list their assets with flexible terms, setting competitive rent rates to attract renters while maintaining ownership until the race is won.",
  },
  {
    id: 2,
    title: "Rent to Compete",
    description: "Renters pay to build toward ownership",
    icon: <Users className="w-8 h-8" />,
    details:
      "Multiple renters can compete for the same NFT by paying rent. Each payment builds toward full ownership, creating a competitive marketplace.",
  },
  {
    id: 3,
    title: "Race to 100%",
    description: "First to reach full value wins the NFT",
    icon: <Trophy className="w-8 h-8" />,
    details:
      "Renters race to accumulate 100% of the NFT's value through rent payments. The first to reach the threshold wins permanent ownership.",
  },
  {
    id: 4,
    title: "Win or Walk Away",
    description: "Keep renting or exit anytime",
    icon: <ArrowRight className="w-8 h-8" />,
    details:
      "Renters can exit at any time or continue competing. Winners get the NFT, while others can apply their progress to other listings.",
  },
]

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section
      id="how-it-works"
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/10"
    >
      {/* Static Background Effects - no animations */}
      <div className="absolute inset-0">
        {/* Static particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Static glowing orbs */}
        <div className="absolute top-1/6 left-1/6 w-48 h-48 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/6 right-1/6 w-64 h-64 bg-secondary/6 rounded-full blur-3xl" />

        {/* Static grid pattern */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="opacity-5"
        >
          <defs>
            <pattern id="howItWorksGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howItWorksGrid)" />
        </svg>
      </div>

      <div className="max-w-none mx-auto px-8 relative z-10">
        {/* Animated title section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How Race2Own Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A revolutionary rent-to-own protocol that makes NFT ownership accessible and competitive
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="relative"
          >
            {/* Progress Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-muted rounded-full">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${(activeStep / steps.length) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    activeStep === step.id ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                      activeStep === step.id
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-primary/20"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors ${
                        activeStep === step.id ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Step Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
          >
            <div className="text-center">
              <h4 className="text-2xl font-semibold text-foreground mb-4">{steps[activeStep - 1].title}</h4>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                {steps[activeStep - 1].details}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {step.id}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
