import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  File as FileIcon,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderPlus,
  FolderOpen,
  Image as ImageIcon,
  Linkedin,
  LockKeyhole,
  Mail,
  Palette,
  Pencil,
  Trash2,
  Upload,
  X,
  Table2,
  type LucideIcon,
} from "lucide-react";

import pelPhoto from "@/assets/pel.jpg";
import {
  loadSampleProjects,
  saveSampleProjects,
  type SampleProjectItem,
} from "@/lib/sample-project-storage";

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

const initialProjectItems: SampleProjectItem[] = [
  { id: "general-va-samples-root", name: "General VA Sample Projects", type: "folder", parentId: null },
];

const PROJECT_PASSWORD_SHA256 = "1e6064cb74be754e8943d3bc95dc65927a61cf471c27ad7e16700adc3e596805";

type MutationRequest =
  | { action: "unlock" }
  | { action: "add-folder"; parentId: string | null }
  | { action: "add-files"; parentId: string | null }
  | { action: "rename"; itemId: string }
  | { action: "delete"; itemId: string };

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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error(`Could not read ${file.name}.`));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
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
  const [projectItems, setProjectItems] = useState<SampleProjectItem[]>([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projectStorageReady, setProjectStorageReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isOwnerView, setIsOwnerView] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<SampleProjectItem | null>(null);
  const [mutationRequest, setMutationRequest] = useState<MutationRequest | null>(null);
  const [folderName, setFolderName] = useState("");
  const [password, setPassword] = useState("");
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    loadSampleProjects()
      .then(async (storedItems) => {
        const hasRootFolder = storedItems?.some((item) => item.id === initialProjectItems[0]?.id) ?? false;
        const items =
          storedItems && hasRootFolder
            ? storedItems.map((item) =>
                item.id === initialProjectItems[0]?.id
                ? { ...item, name: "General VA Sample Projects" }
                  : item,
              )
            : initialProjectItems;
        const needsSave =
          !hasRootFolder ||
          storedItems?.find((item) => item.id === initialProjectItems[0]?.id)?.name !==
            "General VA Sample Projects";
        if (needsSave) {
          await saveSampleProjects(items);
        }
        if (isActive) {
          setProjectItems(items);
          setProjectStorageReady(true);
          setProjectsLoaded(true);
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setProjectStorageReady(false);
          setStorageError(error instanceof Error ? error.message : "Could not load sample projects.");
          setProjectsLoaded(true);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedPreview && !mutationRequest) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPreview(null);
        setMutationRequest(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedPreview, mutationRequest]);

  const openMutation = (request: MutationRequest) => {
    setMutationRequest(request);
    setFolderName(
      request.action === "rename"
        ? projectItems.find((item) => item.id === request.itemId)?.name ?? ""
        : "",
    );
    setPassword("");
    setMutationError(null);
  };

  const saveProjectItems = async (items: SampleProjectItem[]) => {
    try {
      await saveSampleProjects(items);
      setProjectItems(items);
      setStorageError(null);
    } catch (error) {
      setStorageError(error instanceof Error ? error.message : "Could not save sample projects.");
      throw error;
    }
  };

  const handleProjectMutation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mutationRequest) return;

    if (mutationRequest.action === "unlock") {
      try {
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        const passwordHash = Array.from(new Uint8Array(digest), (byte) =>
          byte.toString(16).padStart(2, "0"),
        ).join("");
        if (passwordHash !== PROJECT_PASSWORD_SHA256) {
          setMutationError("That password is not correct. Please try again.");
          return;
        }
        setIsOwnerView(true);
        setMutationRequest(null);
        setPassword("");
      } catch (error) {
        setMutationError(error instanceof Error ? error.message : "Could not verify the password.");
      }
      return;
    }

    if (!isOwnerView) {
      setMutationRequest(null);
      return;
    }

    setIsSaving(true);
    setMutationError(null);
    try {
      if (mutationRequest.action === "add-folder") {
        const name = folderName.trim();
        if (!name) {
          setMutationError("Enter a name for the new folder.");
          return;
        }
        await saveProjectItems([
          ...projectItems,
          {
            id: crypto.randomUUID(),
            name,
            type: "folder",
            parentId: mutationRequest.parentId,
          },
        ]);
      } else if (mutationRequest.action === "add-files") {
        const formData = new FormData(event.currentTarget);
        const files = formData.getAll("projectFiles").filter((value): value is File => value instanceof File);
        if (files.length === 0) {
          setMutationError("Choose one or more files to add.");
          return;
        }
        const addedItems = await Promise.all(
          files.map(async (file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            type: "file" as const,
            parentId: mutationRequest.parentId,
            mimeType: file.type || "application/octet-stream",
            url: await readFileAsDataUrl(file),
            size: file.size,
          })),
        );
        await saveProjectItems([...projectItems, ...addedItems]);
      } else if (mutationRequest.action === "rename") {
        const name = folderName.trim();
        if (!name) {
          setMutationError("Enter a name.");
          return;
        }
        await saveProjectItems(
          projectItems.map((item) =>
            item.id === mutationRequest.itemId ? { ...item, name } : item,
          ),
        );
      } else {
        if (mutationRequest.itemId === initialProjectItems[0]?.id) {
          setMutationError("The General VA Sample Projects folder cannot be deleted.");
          return;
        }
        const removedIds = new Set([mutationRequest.itemId]);
        let foundChild = true;
        while (foundChild) {
          foundChild = false;
          for (const item of projectItems) {
            if (item.parentId && removedIds.has(item.parentId) && !removedIds.has(item.id)) {
              removedIds.add(item.id);
              foundChild = true;
            }
          }
        }
        await saveProjectItems(projectItems.filter((item) => !removedIds.has(item.id)));
        if (removedIds.has(currentFolderId ?? "")) {
          setCurrentFolderId(null);
        }
      }
      setMutationRequest(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not update sample projects.";
      setMutationError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const rootProjectFolder = projectItems.find((item) => item.id === initialProjectItems[0]?.id);
  const currentFolder = projectItems.find(
    (item) => item.id === currentFolderId && item.type === "folder",
  );
  const visibleItems = projectItems.filter((item) => item.parentId === (currentFolder?.id ?? null));
  const breadcrumbs: SampleProjectItem[] = [];
  let breadcrumbFolder = currentFolder;
  while (breadcrumbFolder) {
    breadcrumbs.unshift(breadcrumbFolder);
    breadcrumbFolder = projectItems.find(
      (item) => item.id === breadcrumbFolder?.parentId && item.type === "folder",
    );
  }

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
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border-2 border-ink bg-white px-7 py-4 text-base font-bold transition-colors hover:bg-mint"
                >
                  View Resume
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
                  <span className="text-brand">VA Sample Projects</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex rounded-xl border-2 border-ink bg-cream p-1" aria-label="Project view">
                  <button
                    type="button"
                    aria-pressed={!isOwnerView}
                    onClick={() => {
                      setIsOwnerView(false);
                      setCurrentFolderId(null);
                      setSelectedPreview(null);
                      setMutationRequest(null);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isOwnerView ? "text-ink/60 hover:bg-white" : "bg-white shadow-sm"}`}
                  >
                    Client View
                  </button>
                  <button
                    type="button"
                    aria-pressed={isOwnerView}
                    disabled={isOwnerView}
                    onClick={() => openMutation({ action: "unlock" })}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isOwnerView ? "bg-ink text-cream" : "text-ink/60 hover:bg-white"}`}
                  >
                    <LockKeyhole className="size-3.5" aria-hidden="true" />
                    Owner View
                  </button>
                </div>
                {isOwnerView ? (
                  <>
                    <button
                      type="button"
                      disabled={!projectsLoaded || !projectStorageReady || !rootProjectFolder}
                      onClick={() =>
                        openMutation({
                          action: "add-folder",
                          parentId: currentFolder?.id ?? null,
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold transition-colors hover:bg-yellow disabled:opacity-50"
                    >
                      <FolderPlus className="size-4" aria-hidden="true" />
                      New folder
                    </button>
                    {currentFolder ? (
                      <button
                        type="button"
                        disabled={!projectsLoaded || !projectStorageReady}
                        onClick={() => openMutation({ action: "add-files", parentId: currentFolder.id })}
                        className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-brand disabled:opacity-50"
                      >
                        <Upload className="size-4" aria-hidden="true" />
                        Add files
                      </button>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>

            <div className="mt-7 rounded-3xl border-2 border-ink bg-cream p-4 shadow-hard sm:p-6">
              <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink/10 pb-4 text-sm font-semibold">
                {currentFolder ? (
                  <button
                    type="button"
                    onClick={() => setCurrentFolderId(null)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    All projects
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2 px-2 py-1">
                    <FolderOpen className="size-4" aria-hidden="true" />
                    All projects
                  </span>
                )}
                {breadcrumbs.map((folder) => (
                  <span key={folder.id} className="inline-flex items-center gap-2">
                    <ChevronRight className="size-4 text-ink/40" aria-hidden="true" />
                    <button
                      type="button"
                      onClick={() => setCurrentFolderId(folder.id)}
                      className="rounded-lg px-2 py-1 hover:bg-white"
                      aria-current={folder.id === currentFolder?.id ? "page" : undefined}
                    >
                      {folder.name}
                    </button>
                  </span>
                ))}
                <span className="ml-auto text-xs font-medium text-ink/55">
                  {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {storageError ? (
                <p role="alert" className="mt-4 rounded-xl border-2 border-red-700 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                  Project storage error: {storageError}
                </p>
              ) : null}

              {!projectsLoaded ? (
                <p className="py-12 text-center text-sm font-medium text-ink/60">Opening your sample projects…</p>
              ) : visibleItems.length === 0 ? (
                <div className="py-12 text-center">
                  <FolderOpen className="mx-auto size-10 text-ink/35" aria-hidden="true" />
                  <p className="mt-3 font-semibold">This folder is empty</p>
                  <p className="mt-1 text-sm text-ink/60">Add a folder or choose files to get started.</p>
                </div>
              ) : (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleItems.map((item) => {
                    const childCount = projectItems.filter((child) => child.parentId === item.id).length;
                    const isImage = item.type === "file" && item.mimeType?.startsWith("image/");
                    const isSpreadsheet =
                      item.type === "file" &&
                      (item.mimeType?.includes("spreadsheet") ||
                        /\.(xls|xlsx|csv|ods)$/i.test(item.name));

                    return (
                      <article
                        key={item.id}
                        className="group relative min-w-0 overflow-hidden rounded-2xl border-2 border-ink bg-white transition-transform hover:-translate-y-0.5"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (item.type === "folder") {
                              setCurrentFolderId(item.id);
                            } else if (isImage) {
                              setSelectedPreview(item);
                            } else if (item.url) {
                              const downloadLink = document.createElement("a");
                              downloadLink.href = item.url;
                              downloadLink.download = item.name;
                              downloadLink.click();
                            }
                          }}
                          className="flex min-h-28 w-full items-center gap-4 p-4 text-left disabled:cursor-default"
                          aria-label={item.type === "folder" ? `Open folder ${item.name}` : isImage ? `Preview ${item.name}` : `Download ${item.name}`}
                        >
                          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-yellow/35">
                            {isImage && item.url ? (
                              <img src={item.url} alt="" className="size-full object-cover" />
                            ) : item.type === "folder" ? (
                              <Folder className="size-7 text-ink" aria-hidden="true" />
                            ) : isSpreadsheet ? (
                              <FileSpreadsheet className="size-7 text-ink" aria-hidden="true" />
                            ) : (
                              <FileIcon className="size-7 text-ink" aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display font-semibold">{item.name}</span>
                            <span className="mt-1 block text-xs text-ink/55">
                              {item.type === "folder"
                                ? `${childCount} ${childCount === 1 ? "item" : "items"}`
                                : `${item.mimeType || "File"}${item.size ? ` · ${(item.size / 1024).toFixed(0)} KB` : ""}`}
                            </span>
                          </span>
                          {item.type === "folder" ? (
                            <ChevronRight className="size-4 shrink-0 text-ink/45" aria-hidden="true" />
                          ) : isImage ? (
                            <ImageIcon className="size-4 shrink-0 text-ink/45" aria-hidden="true" />
                          ) : (
                            <Download className="size-4 shrink-0 text-ink/45" aria-hidden="true" />
                          )}
                        </button>
                        {isOwnerView && item.type === "folder" ? (
                          <div className="border-t border-ink/10 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => openMutation({ action: "add-files", parentId: item.id })}
                              aria-label={`Add files to ${item.name}`}
                              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-ink/70 transition-colors hover:bg-yellow hover:text-ink"
                            >
                              <Upload className="size-3.5" aria-hidden="true" />
                              Add files to this folder
                            </button>
                          </div>
                        ) : null}
                        {isOwnerView && item.id !== initialProjectItems[0]?.id ? (
                          <div className="absolute right-2 top-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
                            <button
                              type="button"
                              onClick={() => openMutation({ action: "rename", itemId: item.id })}
                              aria-label={`Rename ${item.name}`}
                              className="grid size-8 place-items-center rounded-lg bg-white/90 text-ink/60 transition-colors hover:bg-yellow hover:text-ink"
                            >
                              <Pencil className="size-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openMutation({ action: "delete", itemId: item.id })}
                              aria-label={`Delete ${item.name}`}
                              className="grid size-8 place-items-center rounded-lg bg-white/90 text-ink/60 transition-colors hover:bg-red-100 hover:text-red-800"
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink/55">
              <LockKeyhole className="size-3.5" aria-hidden="true" />
              {isOwnerView
                ? "Owner view is active. Switch to Client View to hide editing controls."
                : "Client view is read-only. Only the owner can add, edit, or delete project items."}
            </p>
          </div>
        </section>

        {selectedPreview ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPreview.name} preview`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-8"
            onClick={() => setSelectedPreview(null)}
          >
            <div className="relative flex max-h-full max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
              <img
                src={selectedPreview.url}
                alt={selectedPreview.name}
                className="max-h-[90vh] max-w-[94vw] object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                aria-label="Close image preview"
                className="absolute right-2 top-2 grid size-11 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-hard-sm transition-transform hover:-translate-y-0.5"
              >
                <X className="size-6" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        {mutationRequest ? (
          <div
            role="presentation"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4"
            onClick={() => setMutationRequest(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-mutation-title"
              className="w-full max-w-md rounded-3xl border-2 border-ink bg-cream p-6 shadow-hard-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="project-mutation-title" className="font-display text-2xl font-bold">
                {mutationRequest.action === "unlock"
                  ? "Switch to Owner View"
                  : mutationRequest.action === "delete"
                    ? "Delete project item?"
                    : mutationRequest.action === "rename"
                      ? "Rename project item"
                      : mutationRequest.action === "add-folder"
                        ? "Create a folder"
                        : "Add files"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {mutationRequest.action === "unlock"
                  ? "Enter the owner password to unlock folder and file management."
                  : mutationRequest.action === "delete"
                    ? `Deleting “${projectItems.find((item) => item.id === mutationRequest.itemId)?.name ?? "this item"}” also removes everything inside it.`
                    : "This change will be saved in this browser."}
              </p>
              <form className="mt-5 space-y-4" onSubmit={handleProjectMutation}>
                {mutationRequest.action === "add-folder" || mutationRequest.action === "rename" ? (
                  <label className="block text-sm font-semibold">
                    {mutationRequest.action === "rename" ? "New name" : "Folder name"}
                    <input
                      autoFocus
                      required
                      maxLength={80}
                      value={folderName}
                      onChange={(event) => setFolderName(event.target.value)}
                      className="mt-1.5 w-full rounded-xl border-2 border-ink bg-white px-4 py-3 font-medium outline-none focus:ring-4 focus:ring-yellow/50"
                      placeholder="e.g. Client onboarding"
                    />
                  </label>
                ) : null}
                {mutationRequest.action === "add-files" ? (
                  <label className="block text-sm font-semibold">
                    Choose images, spreadsheets, or other files
                    <input
                      autoFocus
                      type="file"
                      name="projectFiles"
                      multiple
                      className="mt-1.5 block w-full rounded-xl border-2 border-ink bg-white p-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-yellow file:px-3 file:py-2 file:font-semibold"
                    />
                    <span className="mt-1 block text-xs font-normal text-ink/60">
                      PNG, JPG, Excel, CSV, PDF, and other file types are supported.
                    </span>
                  </label>
                ) : null}
                {mutationRequest.action === "unlock" ? (
                  <label className="block text-sm font-semibold">
                    Owner password
                    <input
                      autoFocus
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-1.5 w-full rounded-xl border-2 border-ink bg-white px-4 py-3 font-medium outline-none focus:ring-4 focus:ring-yellow/50"
                      placeholder="Enter owner password"
                    />
                  </label>
                ) : null}
                {mutationError ? (
                  <p role="alert" className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-800">
                    {mutationError}
                  </p>
                ) : null}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setMutationRequest(null)}
                    className="rounded-xl border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold hover:bg-yellow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-cream hover:bg-brand disabled:opacity-50"
                  >
                    {isSaving
                      ? "Saving…"
                      : mutationRequest.action === "unlock"
                        ? "Unlock Owner View"
                        : mutationRequest.action === "delete"
                          ? "Delete"
                          : mutationRequest.action === "rename"
                            ? "Save name"
                          : mutationRequest.action === "add-folder"
                            ? "Create folder"
                            : "Add files"}
                  </button>
                </div>
              </form>
            </section>
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
                  <p className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/15" aria-hidden="true">
                      <FileText className="size-4" strokeWidth={2} />
                    </span>
                    <a
                      href={`${import.meta.env.BASE_URL}resume.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-yellow"
                    >
                      View Resume
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

