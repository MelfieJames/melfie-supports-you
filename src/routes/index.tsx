import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  CalendarDays,
  CheckCircle2,
  FolderOpen,
  Linkedin,
  Mail,
  Palette,
  X,
  Table2,
  type LucideIcon,
} from "lucide-react";

import pelPhoto from "@/assets/pel.jpg";
import sampleSpreadsheet from "@/assets/sample-spreadsheet.jpg";
import sampleDashboard from "@/assets/sample-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melfie James Antonio — Aspiring Virtual Assistant" },
      {
        name: "description",
        content:
          "BS Computer Science graduate seeking virtual assistance and administrative/digital support opportunities: email management, data entry, web research, Canva content, and document organization.",
      },
      { property: "og:title", content: "Melfie James Antonio — Aspiring Virtual Assistant" },
      {
        property: "og:description",
        content:
          "Motivated CS graduate entering virtual assistance — reliable support with email, data entry, research, Canva, and document organization.",
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
    icon: CalendarDays,
    tint: "bg-mint/50",
    title: "Calendar Management",
    body: "Keeping schedules, meetings, deadlines, and reminders well organized and easy to follow.",
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
    title: "Task Management",
    body: "Prioritizing work, tracking progress, and keeping daily tasks moving without confusion.",
  },
];

const publicAsset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

const samples = [
  {
    src: publicAsset("email.png"),
    alt: "Sample mockup of an organized email inbox with labeled folders",
    tint: "bg-lilac/40",
    title: "Organized Email Inbox",
    body: "A Gmail inbox organized with custom labels, priorities, follow-ups, filters, and quick-reply templates.",
  },
  {
    src: publicAsset("canva.png"),
    alt: "Sample Canva social media promo graphic with bold typography",
    tint: "bg-brand/15",
    title: "Canva Graphic Design",
    body: "A Canva-designed event graphic demonstrating clean layout, typography, and visual consistency.",
  },
  {
    src: publicAsset("excel.png"),
    alt: "Sample cleaned spreadsheet with sorted columns and highlighted totals",
    tint: "bg-mint/50",
    title: "Cleaned Spreadsheet",
    body: "A customer dataset cleaned, organized, formatted, sorted, and prepared for easier information management.",
  },
  {
    src: publicAsset("calendar.png"),
    alt: "Sample weekly calendar layout with meetings and reminders",
    tint: "bg-accent/15",
    title: "Calendar & Schedule Management",
    body: "A structured Google Calendar demonstrating meetings, deadlines, reminders, and organized weekly scheduling.",
  },
  {
    src: publicAsset("format.png"),
    alt: "Sample professionally formatted document cover and body",
    tint: "bg-yellow/40",
    title: "Formatted Document",
    body: "A professionally formatted business report with consistent headings, spacing, typography, and structured information.",
  },
  {
    src: publicAsset("dashboard.png"),
    alt: "Sample task management dashboard with checklists and progress",
    tint: "bg-lilac/40",
    title: "Task Management Dashboard",
    body: "A Trello workflow organizing tasks by priority, deadlines, and progress across To Do, In Progress, and Completed stages.",
  },
];

const traits = ["Reliable", "Detail-oriented", "Quick learner", "Tech-savvy"];

const tools = [
  "Canva",
  "Google Workspace",
  "Microsoft Office",
  "Excel / Sheets",
  "Task Managers",
  "Calendar Management",
];

const CONTACT_EMAIL = "melfiejamesinsongantonio1@gmail.com";

type SentMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

function buildMailDraft(details: SentMessage) {
  const subject = details.topic
    ? `Portfolio inquiry: ${details.topic}`
    : "New message from melfie. portfolio";
  const body = [
    "New message from the portfolio contact form",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Topic: ${details.topic || "—"}`,
    "",
    "Message:",
    details.message,
  ].join("\n");

  return { subject, body };
}

function gmailComposeUrl(details: SentMessage) {
  const { subject, body } = buildMailDraft(details);
  return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function SentMessageCard({ details, onEdit }: { details: SentMessage; onEdit: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white/95 p-8 text-ink">
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="size-10 text-accent" strokeWidth={2} aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-semibold">Your message is ready</p>
        <p className="mt-2 text-sm text-ink/70">
          Gmail should open with these details already filled in. Press Send there to deliver it to my inbox.
        </p>
      </div>
      <dl className="mt-6 space-y-3 text-sm">
        <div>
          <dt className="font-bold">Name</dt>
          <dd className="text-ink/70">{details.name}</dd>
        </div>
        <div>
          <dt className="font-bold">Email</dt>
          <dd className="break-all text-ink/70">{details.email}</dd>
        </div>
        <div>
          <dt className="font-bold">Topic</dt>
          <dd className="text-ink/70">{details.topic || "—"}</dd>
        </div>
        <div>
          <dt className="font-bold">Message</dt>
          <dd className="whitespace-pre-wrap text-ink/70">{details.message}</dd>
        </div>
      </dl>
      <a
        href={gmailComposeUrl(details)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-ink px-6 py-3.5 text-sm font-bold text-cream"
      >
        Open email with details
      </a>
      <button
        type="button"
        onClick={onEdit}
        className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border-2 border-ink bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-yellow"
      >
        Don't send, edit message
      </button>
    </div>
  );
}

function Index() {
  const [formState, setFormState] = useState<"idle" | "sent">("idle");
  const [sentMessage, setSentMessage] = useState<SentMessage | null>(null);
  const [selectedSample, setSelectedSample] = useState<(typeof samples)[number] | null>(null);

  useEffect(() => {
    if (!selectedSample) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSample(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedSample]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (String(data.get("website") ?? "").trim()) {
      setFormState("sent");
      return;
    }

    const details: SentMessage = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const { subject, body } = buildMailDraft(details);
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const popup = window.open(gmailComposeUrl(details), "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = mailtoUrl;
    }

    setSentMessage(details);
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
                <span className="size-2.5 rounded-full bg-mint" /> Open to opportunities
              </span>
              <h1 className="mt-6 font-display text-[3.4rem] font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-[6rem]">
                Melfie James
                <br />
                <span className="text-brand">Antonio</span>
              </h1>
              <p className="mt-4 font-display text-xl font-medium text-ink/70 sm:text-2xl">
                Aspiring Virtual Assistant <span className="text-accent">|</span> Administrative &amp; Digital
                Support
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ink/50 sm:text-base">
                BS Computer Science Graduate
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                I'm seeking opportunities to provide reliable support with email management, data entry, calendar
                management, Canva content, document organization, and other day-to-day digital tasks. I bring a
                technical background, learn quickly, and am ready to pick up new tools, systems, and workflows.
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
                src={pelPhoto}
                alt="Melfie James Antonio"
                width={1024}
                height={1024}
                className="aspect-[4/5] w-full rotate-2 rounded-[2rem] border-2 border-ink bg-[#ff9d80] object-cover object-[center_80%]"
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
                Click any sample to view the full image and see a closer look at the work.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {samples.map((sample) => (
                <article
                  key={sample.title}
                  className="overflow-hidden rounded-3xl border-2 border-ink bg-cream transition-transform hover:-translate-y-1"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSample(sample)}
                    className="block w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
                    aria-label={`View ${sample.title} full size`}
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
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedSample ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedSample.title} preview`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-8"
            onClick={() => setSelectedSample(null)}
          >
            <div className="relative flex max-h-full max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
              <img
                src={selectedSample.src}
                alt={selectedSample.alt}
                className="max-h-[90vh] max-w-[94vw] object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedSample(null)}
                aria-label="Close image preview"
                className="absolute right-2 top-2 grid size-11 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-hard-sm transition-transform hover:-translate-y-0.5"
              >
                <X className="size-6" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        {/* ABOUT + TOOLS */}
        <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 id="about-heading" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                About <span className="text-accent">me</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                I'm a <span className="font-semibold text-ink">BS Computer Science graduate</span> looking to
                build my career as a Virtual Assistant. While I'm new to the VA field, I bring a strong foundation
                in digital tools, organization, communication, and problem-solving. I'm a reliable and persistent
                learner who is comfortable learning new tools and adapting to different workflows and client
                preferences. I'm eager to support businesses with day-to-day tasks such as email management, data
                entry, document organization, calendar management, Canva content, and other administrative tasks
                while continuously developing my skills as a Virtual Assistant.
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
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="break-all transition-colors hover:text-yellow"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/15" aria-hidden="true">
                      <Linkedin className="size-4" strokeWidth={2} />
                    </span>
                    <a
                      href="https://www.linkedin.com/in/melfie-james-antonio-5130aa422"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-yellow"
                    >
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
              {formState === "sent" && sentMessage ? (
                <SentMessageCard details={sentMessage} onEdit={() => setFormState("idle")} />
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="sr-only" htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      defaultValue={sentMessage?.name}
                      placeholder="Your name"
                      className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                    />
                    <label className="sr-only" htmlFor="contact-email">Email address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      defaultValue={sentMessage?.email}
                      placeholder="Email address"
                      className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                    />
                  </div>
                  <label className="sr-only" htmlFor="contact-topic">What do you need help with?</label>
                  <input
                    id="contact-topic"
                    name="topic"
                    type="text"
                    defaultValue={sentMessage?.topic}
                    placeholder="What do you need help with?"
                    className="w-full rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                  />
                  <label className="sr-only" htmlFor="contact-message">A few details about your project</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    defaultValue={sentMessage?.message}
                    placeholder="A few details about your project…"
                    className="w-full resize-none rounded-2xl border-2 border-ink bg-white/95 px-4 py-3.5 font-medium text-ink outline-none placeholder:text-ink/40 focus:ring-4 focus:ring-yellow/50"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 text-base font-bold text-cream shadow-hard-yellow-sm transition-transform hover:-translate-y-0.5"
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
          <span>© 2026 Melfie James Antonio</span>
          <span>Built with care</span>
        </div>
      </footer>
    </div>
  );
}
