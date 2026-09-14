import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  FolderOpen,
  Linkedin,
  Mail,
  Palette,
  Search,
  Table2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import heroPortrait from "@/assets/hero-portrait.jpg";
import sampleInbox from "@/assets/sample-inbox.jpg";
import sampleSocial from "@/assets/sample-social.jpg";
import sampleSpreadsheet from "@/assets/sample-spreadsheet.jpg";
import sampleResearch from "@/assets/sample-research.jpg";
import sampleDocument from "@/assets/sample-document.jpg";
import sampleDashboard from "@/assets/sample-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melfie James Antonio — Virtual Assistant & Admin Support" },
      {
        name: "description",
        content:
          "Reliable virtual assistant support: email management, data entry, web research, Canva content, and document organization. BS Computer Science graduate open to VA and admin support work.",
      },
      { property: "og:title", content: "Melfie James Antonio — Virtual Assistant & Admin Support" },
      {
        property: "og:description",
        content:
          "Reliable virtual assistant support: email management, data entry, web research, Canva content, and document organization.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services: { icon: LucideIcon; tint: string; title: string; body: string }[] = [
  {
    icon: Mail,
    tint: "bg-brand/15",
    title: "Email Management",
    body: "Inbox triage, drafting replies, and keeping your email calm and on top of things.",
  },
  {
    icon: Table2,
    tint: "bg-accent/15",
    title: "Data Entry & Spreadsheets",
    body: "Accurate entry, cleaning, and organizing data into clear, usable sheets.",
  },
  {
    icon: Palette,
    tint: "bg-yellow/40",
    title: "Canva & Graphic Design",
    body: "Simple social graphics, flyers, and visuals that look polished and on-brand.",
  },
  {
    icon: Search,
    tint: "bg-mint/50",
    title: "Web Research",
    body: "Finding, verifying, and summarizing information into neat, cited notes.",
  },
  {
    icon: FolderOpen,
    tint: "bg-lilac/50",
    title: "File & Document Organization",
    body: "Consistent naming, folders, and templates so everything is easy to find.",
  },
  {
    icon: CalendarDays,
    tint: "bg-brand/15",
    title: "Calendar & Task Management",
    body: "Scheduling, reminders, and light task tracking to keep priorities clear.",
  },
];

const samples = [
  {
    src: sampleInbox,
    alt: "Sample mockup of an organized email inbox with labeled folders",
    tint: "bg-lilac/40",
    title: "Organized Email Inbox",
    body: "A labeled, sorted inbox system with quick-reply templates.",
  },
  {
    src: sampleSocial,
    alt: "Sample Canva social media promo graphic with bold typography",
    tint: "bg-brand/15",
    title: "Social Media Graphic",
    body: "A Canva-made promo post with a consistent look and feel.",
  },
  {
    src: sampleSpreadsheet,
    alt: "Sample cleaned spreadsheet with sorted columns and highlighted totals",
    tint: "bg-mint/50",
    title: "Cleaned Spreadsheet",
    body: "A messy data sheet tidied, de-duplicated, and formatted.",
  },
  {
    src: sampleResearch,
    alt: "Sample one-page web research report with headings and citations",
    tint: "bg-accent/15",
    title: "Web Research Report",
    body: "A structured summary with sources and clear takeaways.",
  },
  {
    src: sampleDocument,
    alt: "Sample professionally formatted document cover and body",
    tint: "bg-yellow/40",
    title: "Formatted Document",
    body: "A consistent template with headings, spacing, and styling.",
  },
  {
    src: sampleDashboard,
    alt: "Sample task management dashboard with checklists and progress",
    tint: "bg-lilac/40",
    title: "Task Dashboard",
    body: "A light task tracker showing priorities and status at a glance.",
  },
];

const traits = ["Reliable", "Detail-oriented", "Quick learner", "Tech-savvy"];

const tools = [
  "Canva",
  "Google Workspace",
  "Microsoft Office",
  "Excel / Sheets",
  "Task Managers",
  "Web Research",
];

function Index() {
  const [formState, setFormState] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder behavior: no backend connected yet.
    setFormState("sent");
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      {/* NAV */}
      <header className="mx-auto max-w-6xl px-5 pt-6">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between rounded-2xl border-2 border-ink bg-white/70 px-5 py-3"
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-semibold text-cream">
              M
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              melfie<span className="text-brand">.</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#services" className="transition-colors hover:text-brand">Services</a>
            <a href="#work" className="transition-colors hover:text-brand">Sample Work</a>
            <a href="#about" className="transition-colors hover:text-brand">About</a>
            <a href="#tools" className="transition-colors hover:text-brand">Tools</a>
          </div>
          <a
            href="#contact"
            className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-brand"
          >
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-8 pt-14">
          <div className="absolute -top-4 right-6 hidden size-28 animate-floaty-a rounded-full bg-yellow/80 md:block" />
          <div className="absolute -left-6 top-40 hidden size-20 animate-floaty-b rounded-full bg-lilac/70 md:block" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="animate-pop">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
                <span className="size-2.5 rounded-full bg-mint" /> BS Computer Science · Open to work
              </span>
              <h1 className="mt-6 font-display text-[3.4rem] font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-[6rem]">
                Melfie James
                <br />
                <span className="text-brand">Antonio</span>
              </h1>
              <p className="mt-4 font-display text-xl font-medium text-ink/70 sm:text-2xl">
                Virtual Assistant <span className="text-accent">|</span> Administrative &amp; Digital Support
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
                I provide reliable, organized support with email management, data entry, web research, Canva
                content, and document organization — the day-to-day digital tasks that keep busy teams running
                smoothly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="rounded-2xl bg-brand px-7 py-4 text-base font-bold text-cream shadow-hard transition-transform hover:-translate-y-0.5"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border-2 border-ink bg-white px-7 py-4 text-base font-bold transition-colors hover:bg-yellow"
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div className="relative animate-pop [animation-delay:100ms]">
              <img
                src={heroPortrait}
                alt="Melfie James Antonio in a bright casual workspace"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rotate-2 rounded-[2rem] border-2 border-ink bg-mint/60 object-cover"
              />
              <div className="absolute -bottom-5 -left-5 animate-floaty-a rounded-2xl border-2 border-ink bg-white px-4 py-3 text-sm font-bold shadow-hard-sm">
                Response time
                <br />
                <span className="text-accent">~24h</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="services-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What I <span className="text-accent">handle</span>
            </h2>
            <p className="max-w-xs text-sm font-medium text-ink/60">
              Clear, dependable support across the digital admin tasks clients rely on most.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl border-2 border-ink bg-white p-6 shadow-hard">
                <div className={`grid size-12 place-items-center rounded-2xl ${service.tint}`} aria-hidden="true">
                  <service.icon className="size-6 text-ink" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{service.body}</p>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink p-6 text-cream shadow-hard-brand sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/10" aria-hidden="true">
                  <Wrench className="size-6 text-cream" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Basic Technical Support</h3>
                  <p className="text-sm text-cream/70">
                    Troubleshooting small tech hiccups and helping with everyday digital tools.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wide">
                A helpful plus
              </span>
            </div>
          </div>
        </section>

        {/* SAMPLE WORK */}
        <section id="work" aria-labelledby="work-heading" className="scroll-mt-8 border-y-2 border-ink bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="rounded-full border-2 border-ink bg-yellow/50 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  Sample projects
                </span>
                <h2 id="work-heading" className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  A peek at the <span className="text-brand">work</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm font-medium text-ink/60">
                These are illustrative samples I made to show my process — not real client work.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {samples.map((sample) => (
                <article
                  key={sample.title}
                  className="overflow-hidden rounded-3xl border-2 border-ink bg-cream transition-transform hover:-translate-y-1"
                >
                  <img
                    src={sample.src}
                    alt={sample.alt}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className={`aspect-[4/3] w-full border-b-2 border-ink object-cover ${sample.tint}`}
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold">{sample.title}</h3>
                    <p className="mt-1 text-sm text-ink/70">{sample.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT + TOOLS */}
        <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 id="about-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                About <span className="text-accent">me</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                I'm a <span className="font-semibold text-ink">BS Computer Science graduate</span> with hands-on
                experience in technology, troubleshooting, web development, research, and digital tools.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                I'm a reliable, persistent learner — comfortable with new tools and workflows, and happy to adapt
                to how your team prefers to work. I care about the small details that make a process feel
                effortless.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Qualities">
                {traits.map((trait) => (
                  <li key={trait} className="rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-semibold">
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            <div id="tools" className="scroll-mt-8 rounded-3xl bg-ink p-8 text-cream shadow-hard-yellow">
              <h3 className="font-display text-2xl font-semibold">Tools I work with</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <li key={tool} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-cream/60">
                Programming &amp; technical skills — from web development to troubleshooting — support my admin
                and digital work.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl scroll-mt-8 px-5 pb-16">
          <div className="rounded-[2.5rem] bg-brand p-8 text-cream shadow-hard-lg sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 id="contact-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Let's work <span className="text-yellow">together</span>
                </h2>
                <p className="mt-4 max-w-sm text-cream/85">
                  Tell me a little about what you need help with. I usually reply within a day.
                </p>
                <div className="mt-6 space-y-3 text-sm font-semibold">
                  <p className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/15" aria-hidden="true">
                      <Mail className="size-4" strokeWidth={2} />
                    </span>
                    your.email@example.com <span className="text-xs font-medium text-cream/60">(add yours)</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/15" aria-hidden="true">
                      <Linkedin className="size-4" strokeWidth={2} />
                    </span>
                    LinkedIn · Portfolio <span className="text-xs font-medium text-cream/60">(add links)</span>
                  </p>
                </div>
                {/* Placeholder: replace href with your resume file link. */}
                <a
                  href="#contact"
                  aria-disabled="true"
                  title="Resume file coming soon — replace this link with your resume."
                  className="mt-7 inline-block rounded-2xl bg-cream px-6 py-3.5 font-bold text-ink shadow-hard-sm transition-transform hover:-translate-y-0.5"
                >
                  Download Resume
                </a>
              </div>
              {formState === "sent" ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-ink bg-white/95 p-8 text-center text-ink">
                  <CheckCircle2 className="size-10 text-accent" strokeWidth={2} aria-hidden="true" />
                  <p className="mt-4 font-display text-xl font-semibold">Thanks for reaching out!</p>
                  <p className="mt-2 text-sm text-ink/70">
                    This form is a placeholder for now — once your email is connected, messages will go straight to
                    your inbox.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="sr-only" htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                    />
                    <label className="sr-only" htmlFor="contact-email">Email address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email address"
                      className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                    />
                  </div>
                  <label className="sr-only" htmlFor="contact-topic">What do you need help with?</label>
                  <input
                    id="contact-topic"
                    type="text"
                    placeholder="What do you need help with?"
                    className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                  />
                  <label className="sr-only" htmlFor="contact-message">A few details about your project</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="A few details about your project…"
                    className="w-full resize-none rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-ink px-6 py-4 text-base font-bold text-cream shadow-hard-yellow-sm transition-transform hover:-translate-y-0.5"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-10">
        <div className="flex flex-col items-center justify-between gap-3 border-t-2 border-ink/10 pt-6 text-sm font-medium text-ink/60 sm:flex-row">
          <span className="font-display font-semibold text-ink">
            melfie<span className="text-brand">.</span>
          </span>
          <span>© 2026 Melfie James Antonio · Sample portfolio</span>
          <span>Built with care</span>
        </div>
      </footer>
    </div>
  );
}
