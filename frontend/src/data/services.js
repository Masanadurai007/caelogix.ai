import {
  MessageSquare,
  Globe,
  Sparkles,
  Workflow,
  Compass,
} from 'lucide-react'

export const services = [
  {
    slug: 'chatbot-development',
    icon: MessageSquare,
    name: 'Chatbot Development',
    short: 'Conversational assistants that resolve real requests, not scripted small talk.',
    problem:
      'Support and sales teams are buried in repetitive questions, and most chatbots bolted onto a website hand out canned answers that frustrate visitors instead of helping them.',
    approach:
      'We design conversation flows around your actual product and policies, ground responses in your knowledge base, and hand off cleanly to a human whenever the conversation moves outside what the assistant should decide on its own.',
    stack: ['LangChain', 'LangGraph', 'PostgreSQL + pgvector', 'React', 'Flask'],
    useCases: [
      'Pre-sales qualification widgets that capture budget and timeline before a call is booked',
      'Support assistants that answer policy and product questions from a live knowledge base',
      'Internal helpdesk bots that triage IT and HR requests',
    ],
  },
  {
    slug: 'web-development',
    icon: Globe,
    name: 'Web Development',
    short: 'Marketing sites and web applications built for speed, clarity, and conversion.',
    problem:
      'Many company sites are slow, inconsistent across devices, or hard to update, which quietly costs credibility with every visitor who bounces before the page finishes loading.',
    approach:
      'We build on modern, maintainable stacks with component libraries your team can extend, performance budgets enforced from day one, and content structured so updates do not require an engineer.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'PostgreSQL'],
    useCases: [
      'Enterprise marketing sites with CMS-style content management',
      'Customer-facing dashboards and self-service portals',
      'Internal tools that replace spreadsheets and email threads',
    ],
  },
  {
    slug: 'generative-ai-integration',
    icon: Sparkles,
    name: 'Generative AI Integration',
    short: 'Add drafting, summarization, and search-by-meaning to the tools your team already uses.',
    problem:
      'Teams want the productivity of generative AI, but bolting an API call onto an existing product without guardrails leads to inconsistent output, runaway costs, and low trust.',
    approach:
      'We scope the highest-value use cases first, build retrieval pipelines over your own data, add evaluation and cost monitoring, and ship incrementally so you can measure impact before expanding.',
    stack: ['LangChain', 'pgvector', 'Python', 'REST APIs'],
    useCases: [
      'Document summarization and drafting assistants inside existing workflows',
      'Semantic search over internal knowledge bases and support tickets',
      'Automated report generation from structured and unstructured data',
    ],
  },
  {
    slug: 'agentic-ai-systems',
    icon: Workflow,
    name: 'Agentic AI Systems',
    short: 'Multi-step AI workflows that take action, with checkpoints where humans stay in control.',
    problem:
      'A single prompt-response loop cannot handle work that requires multiple steps, tool calls, and decisions — but giving an agent unchecked autonomy over real systems is a real risk.',
    approach:
      'We design agent workflows as explicit state graphs with defined tools, retries, and human-approval checkpoints for anything consequential, so the system is capable and auditable at the same time.',
    stack: ['LangGraph', 'LangChain', 'Python', 'PostgreSQL'],
    useCases: [
      'Lead qualification agents that research, score, and route prospects',
      'Data pipeline agents that reconcile records across systems with review steps',
      'Operations agents that draft actions for approval before execution',
    ],
  },
  {
    slug: 'ai-consulting',
    icon: Compass,
    name: 'AI Consulting',
    short: 'A clear-eyed assessment of where AI will actually move the needle for your team.',
    problem:
      'Leadership teams face pressure to "do something with AI" without a reliable way to separate genuine opportunities from expensive experiments that will not survive contact with production.',
    approach:
      'We audit your workflows and data, prioritize opportunities by feasibility and impact, and deliver a roadmap with build-vs-buy recommendations your team can execute against — with or without us.',
    stack: ['Technical audits', 'Architecture review', 'Feasibility scoring'],
    useCases: [
      'AI readiness assessments for engineering and data teams',
      'Build-vs-buy evaluations for AI vendor selection',
      'Roadmapping workshops that turn ideas into a prioritized backlog',
    ],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
