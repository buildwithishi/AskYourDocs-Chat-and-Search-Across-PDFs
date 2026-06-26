import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="flex flex-col items-center px-margin-mobile py-32 text-center">
      <h2 className="mb-8 font-display-xl text-display-xl-mobile text-primary md:text-headline-lg">
        Ready to evolve your workspace?
      </h2>
      <p className="mb-12 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
        Join over 200 companies turning their static archives into active intelligence engines.
      </p>
      <Button asChild size="lg" className="btn-glow px-12 py-5 hover:scale-105">
        <Link to="/register">Get Started for Free</Link>
      </Button>
    </section>
  )
}
