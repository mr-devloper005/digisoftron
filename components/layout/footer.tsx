'use client'

import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Facebook, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTenant } from '@/lib/tenant/context'

export function Footer() {
  const { brand, footer, socialLinks } = useTenant()

  const socialIcons = [
    socialLinks.twitter ? { href: socialLinks.twitter, icon: Twitter, label: 'Twitter' } : null,
    socialLinks.instagram ? { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' } : null,
    socialLinks.linkedin ? { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' } : null,
    socialLinks.facebook ? { href: socialLinks.facebook, icon: Facebook, label: 'Facebook' } : null,
  ].filter(Boolean) as Array<{ href: string; icon: typeof Twitter; label: string }>

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
                <span className="text-sm font-bold text-[--footer-bg]">{brand.logoLetter}</span>
              </div>
              <span>{brand.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {brand.footerDescription}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((social) => (
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
              {footer.exploreLinks.map((link) => (
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
              {footer.companyLinks.map((link) => (
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
              {footer.supportLinks.map((link) => (
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
          <p className="text-sm">{brand.copyrightText}</p>
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
