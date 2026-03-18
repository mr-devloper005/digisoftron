import { companyOverview, teamMembers } from '@/lib/mock/site-content'
import { getSiteConfig } from '@/lib/tenant/config'

export default function AboutPage() {
  const { brand } = getSiteConfig()
  return (
    <div className="py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About {brand.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{companyOverview.mission}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Founded</p>
            <p className="mt-1 text-2xl font-semibold">{companyOverview.founded}</p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Headquarters</p>
            <p className="mt-1 text-xl font-semibold">{companyOverview.headquarters}</p>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Monthly Readers</p>
            <p className="mt-1 text-2xl font-semibold">{companyOverview.monthlyReaders}</p>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Leadership</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
