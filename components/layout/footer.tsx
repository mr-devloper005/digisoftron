'use client'

import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Facebook, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const exploreLinks = [
  { href: '/listings', label: 'Listings' },
  { href: '/trending', label: 'Trending' },
  { href: '/featured', label: 'Featured' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/careers', label: 'Careers' },
  { href: '/press', label: 'Press' },
  { href: '/blog', label: 'Blog' },
]

const supportLinks = [
  { href: '/help', label: 'Help Center' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
  { href: '/accessibility', label: 'Accessibility' },
]

const socialLinks = [
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[--footer-bg] text-[--footer-text]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-[--footer-text-hover]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[--footer-text-hover]">
                <span className="text-sm font-bold text-[--footer-bg]">D</span>
              </div>
              <span>digisoftron.com</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              digisoftron.com helps visitors discover verified listings for agencies, products, consultants, and local service businesses.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[--footer-text]/20 text-[--footer-text] transition-colors hover:border-[--footer-text-hover] hover:text-[--footer-text-hover]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[--footer-text-hover]">Explore</h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[--footer-text-hover]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[--footer-text-hover]">Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[--footer-text-hover]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[--footer-text-hover]">Support</h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[--footer-text-hover]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[--footer-text]/10 pt-8 sm:flex-row">
          <p className="text-sm">&copy; 2026 digisoftron.com. All rights reserved.</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="gap-2 text-[--footer-text] hover:bg-[--footer-text]/10 hover:text-[--footer-text-hover]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
