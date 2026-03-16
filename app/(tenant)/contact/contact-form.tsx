'use client'

import { useState } from 'react'
import { contactDetails } from '@/lib/mock/site-content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm({ presetSubject = '' }: { presetSubject?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(presetSubject)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('Please complete all fields.')
      return
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }

    const existingRaw = localStorage.getItem('discover-contact-messages')
    const existing = existingRaw ? JSON.parse(existingRaw) : []
    localStorage.setItem('discover-contact-messages', JSON.stringify([payload, ...existing]))

    setStatus('Message sent. Our support team will respond shortly.')
    setName('')
    setEmail('')
    setSubject(presetSubject)
    setMessage('')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          Reach our team for listings, creator support, and partnerships.
        </p>

        <div className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{contactDetails.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{contactDetails.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">{contactDetails.address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response time</p>
            <p className="font-medium">{contactDetails.responseTime}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Send a message</h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={6}
          />
          <Button type="submit" className="w-full">Submit</Button>
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
        </form>
      </section>
    </div>
  )
}

