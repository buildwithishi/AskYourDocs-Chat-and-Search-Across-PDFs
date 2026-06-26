import { ShaderBackground } from '@/components/shared/ShaderBackground'
import { NavBar } from './sections/NavBar'
import { HeroSection } from './sections/HeroSection'
import { FeatureGridSection } from './sections/FeatureGridSection'
import { StatsSection } from './sections/StatsSection'
import { CTASection } from './sections/CTASection'
import { FooterSection } from './sections/FooterSection'

export function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-background text-on-surface selection:bg-primary/20 selection:text-primary">
      <ShaderBackground opacity={0.4} />
      <NavBar />
      <main className="relative z-10 pt-32">
        <HeroSection />
        <FeatureGridSection />
        <StatsSection />
        <CTASection />
      </main>
      <div className="relative z-10">
        <FooterSection />
      </div>
    </div>
  )
}
