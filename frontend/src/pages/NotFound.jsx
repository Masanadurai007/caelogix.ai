import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal">404</p>
      <h1 className="mt-3 text-3xl font-bold text-navy-800">Page not found</h1>
      <p className="mt-3 max-w-sm text-navy-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  )
}
