const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body
  }

  if (!res.ok) {
    const message = data?.error || `Request failed with status ${res.status}`
    throw new Error(message)
  }
  return data
}

export const api = {
  submitContact: (payload) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),

  sendChatMessage: (payload) =>
    request('/chat', { method: 'POST', body: JSON.stringify(payload) }),

  getBlogPosts: () => request('/blog'),

  getBlogPost: (slug) => request(`/blog/${slug}`),
}
