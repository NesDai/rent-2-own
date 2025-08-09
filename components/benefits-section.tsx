"use client"

import { motion } from "framer-motion"
import { Shield, Zap, DollarSign, Lock } from "lucide-react"

const benefits = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "No Risk for Sellers",
    description: "No need to wait for full payment",
    details:
      "List your NFTs with confidence. Earn rent immediately while maintaining ownership until someone wins the race.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Competitive Ownership",
    description: "Renters compete to claim the NFT",
    details:
      "Multiple renters can compete for the same asset, creating dynamic pricing and faster ownership transfers.",
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Flexible Rent",
    description: "Renters can offer more to win faster",
    details: "Pay more rent to accelerate your ownership progress and outpace competitors in the race to 100%.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Secure & Transparent",
    description: "Built on the SUI blockchain",
    details:
      "All transactions are secured by blockchain technology with full transparency and immutable ownership records.",
  },
]

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background"
    >
      {/* Static Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Race2Own?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary benefits for both NFT owners and aspiring collectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 font-medium">{benefit.description}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
