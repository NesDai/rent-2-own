"use client"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { BenefitsSection } from "@/components/benefits-section"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { ConnectButton } from "@mysten/dapp-kit"
import ListNFTForRent from "@/components/kiosk/kiosk-create-rental"
import CreateKiosk from "@/components/kiosk/kiosk-create"
import RentItem from "@/components/kiosk/kiosk-rent"
import KioskList from "@/components/kiosk/kiosk-list"

export default function Race2OwnLandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        <ConnectButton></ConnectButton>
        <ListNFTForRent></ListNFTForRent>
        <CreateKiosk></CreateKiosk>
        <RentItem></RentItem>
        <KioskList></KioskList>
        {/* Hero Section - No animation wrapper needed as it has its own */}
        <EnhancedHeroSection />
        {/* Animated Sections */}
        <AnimatedSection direction="up" delay={0.1}>
          <HowItWorksSection />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.2}>
          <BenefitsSection />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.1}>
          <CTASection />
        </AnimatedSection>
        {/* Footer - No animation wrapper */}
        <FooterSection />
      </div>
    </div>
  );
}
