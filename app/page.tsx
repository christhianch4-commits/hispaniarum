import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Avatar from "@/app/components/Avatar";
import NewsletterForm from "@/app/components/NewsletterForm";
import {
  articles,
  experience,
  portfolio,
  profile,
  services,
  stats,
  testimonial,
} from "@/app/data/site";

function Highlight({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-block rounded-lg px-2 text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section id="home" className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              I&apos;m <Highlight color="#FF6B7A">{profile.name}</Highlight>,
              <br />a {profile.role} from{" "}
              <Highlight color="#2F81F7">{profile.city}</Highlight>
            </h1>
            <p className="mt-6 max-w-md text-black/60">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
              >
                Get in touch
              </a>
              <a
                href="#portfolio"
                className="rounded-full border-2 border-black px-6 py-3 text-sm font-semibold"
              >
                View portfolio
              </a>
            </div>
          </div>
          <Avatar bg="#FFC224" shirt="#FF6B7A" className="mx-auto w-full max-w-sm" />
        </section>

        {/* Services */}
        <section className="py-20">
          <h2 className="max-w-lg text-3xl font-extrabold md:text-4xl">
            <Highlight color="#FF4A60">My broad set of services</Highlight>
          </h2>
          <p className="mt-4 max-w-lg text-black/60">
            Lacus, adipiscing lectus convallis purus aliquet cursus magnaol
            montes augue donec cras turpis ultrices nulla sed doler.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border-2 border-black p-6 shadow-[0_3px_0_0_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-black/60">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold">Get in touch</h3>
              <p className="mt-1 max-w-md text-white/60">
                Looking for another service? Get in touch with me, there is a
                high chance that I will be able to help!
              </p>
            </div>
            <a
              href="#contact"
              className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <Avatar bg="#6366F1" shirt="#FFC224" className="order-2 mx-auto w-full max-w-sm md:order-1" />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Who&apos;s behind all this{" "}
              <Highlight color="#2F81F7">great work?</Highlight>
            </h2>
            <p className="mt-4 max-w-md text-black/60">
              Eu pellentesque arcu ornare velit faucibus egestas gravida sed
              in purus enim molestie gravida imperdiet integer.
            </p>

            <div className="mt-8 space-y-6">
              {stats.map((s) => (
                <div key={s.title}>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-black/60">{s.description}</p>
                </div>
              ))}
            </div>

            <a
              href="#about"
              className="mt-8 inline-block rounded-full border-2 border-black px-6 py-3 text-sm font-semibold"
            >
              More about me
            </a>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-20">
          <h2 className="max-w-lg text-3xl font-extrabold md:text-4xl">
            Take a look at my{" "}
            <Highlight color="#FFC224">design portfolio</Highlight>
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {portfolio.map((p) => (
              <div
                key={p.title}
                className="overflow-hidden rounded-3xl border-2 border-black shadow-[0_3px_0_0_rgba(0,0,0,1)]"
              >
                <div
                  className="h-48"
                  style={{ backgroundColor: p.color }}
                  aria-hidden
                />
                <div className="p-6">
                  <Tag>{p.tag}</Tag>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-black/60">{p.description}</p>
                  <a href="#" className="mt-4 inline-block text-sm font-semibold underline">
                    View case study
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#portfolio"
            className="mt-8 inline-block rounded-full border-2 border-black px-6 py-3 text-sm font-semibold"
          >
            Browse all portfolio
          </a>
        </section>

        {/* Experience */}
        <section className="py-20">
          <h2 className="max-w-lg text-3xl font-extrabold md:text-4xl">
            Take a look at my{" "}
            <Highlight color="#6366F1">past experience</Highlight>
          </h2>
          <p className="mt-4 max-w-lg text-black/60">
            Eu pellentesque arcu ornare velit faucibus egestas gravida sed in
            purus enim molestie gravida imperdiet integer.
          </p>

          <div className="mt-10 divide-y-2 divide-black/10 border-y-2 border-black/10">
            {experience.map((e) => (
              <div
                key={e.role}
                className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8"
              >
                <span className="text-sm font-semibold text-black/50">
                  {e.period}
                </span>
                <div>
                  <h3 className="font-bold">{e.role}</h3>
                  <p className="mt-1 text-sm text-black/60">{e.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-8 inline-block rounded-full border-2 border-black px-6 py-3 text-sm font-semibold"
          >
            See full resume
          </a>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <h2 className="max-w-lg text-3xl font-extrabold md:text-4xl">
            What <Highlight color="#2F81F7">my clients say</Highlight> about
            my work
          </h2>

          <div className="mt-10 rounded-3xl border-2 border-black p-8 shadow-[0_3px_0_0_rgba(0,0,0,1)] md:p-12">
            <p className="max-w-2xl text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="block h-10 w-10 rounded-full bg-black/10" />
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-black/50">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Articles &amp; News
            </h2>
            <a href="#" className="text-sm font-semibold underline">
              Browse all articles
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {articles.map((a) => (
              <div
                key={a.title}
                className="rounded-3xl border-2 border-black p-6 shadow-[0_3px_0_0_rgba(0,0,0,1)]"
              >
                <Tag>{a.tag}</Tag>
                <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-black/60">{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section id="contact" className="py-20">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-12">
            <div>
              <h3 className="text-2xl font-bold">Subscribe to my newsletter</h3>
              <p className="mt-1 max-w-md text-white/60">
                Get the latest articles and updates straight to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
