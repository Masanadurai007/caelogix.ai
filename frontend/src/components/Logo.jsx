export default function Logo({ className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Caelogix — Intelligent Solutions"
      className={`h-10 w-auto sm:h-12 ${className}`}
    />
  );
}
