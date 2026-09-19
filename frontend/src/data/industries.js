export const industries = [
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    summary:
      'Recover abandoned carts, answer order questions instantly, and surface product recommendations without adding headcount.',
    useCases: [
      'Order-status and returns assistant integrated with your fulfillment system',
      'Product recommendation chat that understands natural-language requests',
      'Post-purchase follow-up automation that flags at-risk orders early',
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary:
      'Reduce administrative load on front-desk and care-coordination teams while keeping a human in the loop for anything clinical.',
    useCases: [
      'Intake and scheduling assistants that pre-fill forms before appointments',
      'Internal knowledge assistants for policy and benefits questions',
      'Patient follow-up reminders with clear escalation to staff',
    ],
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    summary:
      'Ship AI features that respect the compliance and audit requirements your industry runs on.',
    useCases: [
      'Support assistants with strict scoping around regulated advice',
      'Document and statement summarization for internal review teams',
      'Fraud-review agents that draft findings for analyst sign-off',
    ],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    summary:
      'Modernize internal tools and connect AI to the systems your teams already rely on, without a rip-and-replace project.',
    useCases: [
      'Internal helpdesk and knowledge assistants across departments',
      'Workflow automation agents that integrate with existing systems',
      'Dashboards that turn scattered reporting into a single source of truth',
    ],
  },
]

export const getIndustryBySlug = (slug) => industries.find((i) => i.slug === slug)
