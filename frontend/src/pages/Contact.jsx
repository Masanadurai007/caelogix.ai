import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import SectionReveal from "../components/SectionReveal.jsx";
import { api } from "../lib/api.js";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await api.submitContact(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <SectionReveal>
          <p className="eyebrow">Contact</p>
          <h1 className="section-heading mt-3">
            Let's talk about what you're building.
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-navy-500">
            Share a few details about your project and the service you're
            interested in. We typically respond within one business day.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-navy-600">
              <Mail size={18} className="text-teal" />
              info@caelogix.in
            </div>
            <div className="flex items-center gap-3 text-sm text-navy-600">
              <MapPin size={18} className="text-teal" />
              Chennai, Tamil Nadu, India
            </div>
            <div className="flex items-center gap-3 text-sm text-navy-600">
              <Phone size={18} className="text-teal" />
              <a href="tel:+918148336186" className="hover:text-teal">
                +91 81483 36186
              </a>
              <span className="text-navy-300">/</span>
              <a href="tel:+919361977522" className="hover:text-teal">
                +91 93619 77522
              </a>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://www.linkedin.com/company/caelogix-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-navy-400 hover:text-teal"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/caelogix.ai?stkn=bm9vcGJiNXN2aDR3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-navy-400 hover:text-teal"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594591494139"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-navy-400 hover:text-teal"
            >
              <Facebook size={18} />
            </a>
          </div>
        </SectionReveal>

        <SectionReveal
          delay={0.08}
          className="rounded-xl border border-navy-100 bg-white p-8 shadow-card"
        >
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal">
                <Mail size={24} />
              </div>
              <h2 className="mt-5 text-xl font-bold text-navy-800">
                Message sent.
              </h2>
              <p className="mt-2 max-w-sm text-sm text-navy-500">
                Thanks for reaching out — a member of our team will follow up at
                the email you provided within one business day.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-ghost-link mt-6"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-navy-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us a bit about your project..."
                  className="w-full rounded-md border border-navy-200 px-3 py-2.5 text-sm text-navy-700 focus:border-teal"
                />
              </div>

              {status === "error" && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-navy-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-navy-200 px-3 py-2.5 text-sm text-navy-700 focus:border-teal"
      />
    </div>
  );
}
