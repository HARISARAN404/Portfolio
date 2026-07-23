import Nav from "@/components/nav";
import InstitutionLogo from "@/components/institution-logo";
import { getDictionary, profile, type Locale } from "@/lib/dictionaries";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </h2>
  );
}

const linkClass =
  "text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "LeetCode", href: profile.leetcode },
  ];

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <Nav locale={locale} labels={t.nav} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6">
        {/* Intro */}
        <section className="pb-16 pt-8 sm:pt-12">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.hero.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.hero.role} · {t.hero.location}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-foreground/90">
            {t.hero.intro}
          </p>
          <p className="mt-6 flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-foreground" />
            {t.hero.available}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={linkClass}
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-20 border-t border-border py-14">
          <Eyebrow>{t.skills.title}</Eyebrow>
          <dl className="space-y-5">
            {t.skills.groups.map((group) => (
              <div
                key={group.name}
                className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-muted-foreground">{group.name}</dt>
                <dd className="text-sm text-foreground/90">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Work / Projects */}
        <section id="work" className="scroll-mt-20 border-t border-border py-14">
          <Eyebrow>{t.projects.title}</Eyebrow>
          <p className="mb-10 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {t.projects.subtitle}
          </p>
          <div className="space-y-10">
            {t.projects.items.map((project) => (
              <article key={project.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-foreground">
                    {project.title}
                  </h3>
                  <span className="shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {t.projects.selfInitiated}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground/70">
                  {project.stack.join("  ·  ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section
          id="education"
          className="scroll-mt-20 border-t border-border py-14"
        >
          <Eyebrow>{t.education.title}</Eyebrow>
          <div className="space-y-8">
            {t.education.items.map((item) => (
              <div key={item.degree} className="flex gap-4">
                <InstitutionLogo
                  src={item.logo}
                  abbr={item.abbr}
                  name={item.school}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium text-foreground">
                      {item.degree}
                    </h3>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground/80">
                    {item.school}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Participation */}
        <section
          id="participation"
          className="scroll-mt-20 border-t border-border py-14"
        >
          <Eyebrow>{t.participation.title}</Eyebrow>
          <div className="space-y-8">
            {t.participation.items.map((item) => (
              <div key={item.event}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-foreground">{item.role}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">{item.event}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.place}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-border py-14"
        >
          <Eyebrow>{t.contact.title}</Eyebrow>
          <p className="max-w-prose text-lg leading-relaxed text-foreground/90">
            {t.contact.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className={linkClass}>
              {t.contact.emailCta}
            </a>
            <span className="text-muted-foreground">
              {t.contact.phoneLabel}:{" "}
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className={linkClass}
              >
                {profile.phone}
              </a>
            </span>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-2xl px-6 py-10">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              <p className="text-foreground">{t.hero.name}</p>
              <p className="mt-1">
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  {profile.email}
                </a>
              </p>
              <p className="mt-0.5">
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {profile.phone}
                </a>
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t.footer.elsewhere}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {[
                  { label: "LinkedIn", href: profile.linkedin },
                  { label: "GitHub", href: profile.github },
                  { label: "LeetCode", href: profile.leetcode },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t.hero.name} · {t.footer.builtWith}
          </p>
        </div>
      </footer>
    </div>
  );
}
