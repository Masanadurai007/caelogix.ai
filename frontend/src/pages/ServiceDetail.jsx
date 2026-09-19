import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import SectionReveal from '../components/SectionReveal.jsx'
import { services, getServiceBySlug } from '../data/services.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to="/services" replace />

  const otherServices = services.filter((s) => s.slug !== slug)

  return (
    <>
      <section className="border-b border-navy-100 bg-white py-20">
        <div className="container-page max-w-3xl">
          <SectionReveal>
            <Link to="/services" className="btn-ghost-link mb-6">
              <ArrowLeft size={14} /> All services
            </Link>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal">
              <service.icon size={22} />
            </div>
            <h1 className="section-heading mt-5">{service.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-500">{service.short}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <SectionReveal>
              <h2 className="text-xl font-bold text-navy-800">The problem it solves</h2>
              <p className="mt-3 leading-relaxed text-navy-600">{service.problem}</p>
            </SectionReveal>
            <SectionReveal delay={0.05}>
              <h2 className="text-xl font-bold text-navy-800">How Caelogix approaches it</h2>
              <p className="mt-3 leading-relaxed text-navy-600">{service.approach}</p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="text-xl font-bold text-navy-800">Example use cases</h2>
              <ul className="mt-4 space-y-3">
                {service.useCases.map((uc) => (
                  <li key={uc} className="flex gap-3 rounded-lg border border-navy-100 bg-white p-4 text-sm text-navy-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {uc}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>

          <div className="space-y-6">
            <SectionReveal className="card">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
                Typical stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span key={tech} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-600">
                    {tech}
                  </span>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.05} className="rounded-xl bg-navy-800 p-6 text-white">
              <h3 className="text-base font-semibold">Have a project in mind?</h3>
              <p className="mt-2 text-sm text-navy-200">
                Tell us about it and we'll follow up within one business day.
              </p>
              <Link to="/contact" className="btn-primary mt-4 w-full">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-100 bg-surface-dim py-16">
        <div className="container-page">
          <SectionReveal>
            <h2 className="text-lg font-bold text-navy-800">Other services</h2>
          </SectionReveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s, i) => (
              <SectionReveal key={s.slug} delay={i * 0.04}>
                <Link to={`/services/${s.slug}`} className="card block h-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal">
                    <s.icon size={16} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-navy-800">{s.name}</p>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
