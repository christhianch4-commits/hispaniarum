import { footerPages, profile } from "@/app/data/site";

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span className="block h-6 w-6 rounded-full border-2 border-black" />
            Paperfolio X
          </div>
          <p className="max-w-xs text-sm text-black/60">
            Lorem ipsum dolor amet consecte adipiscing elit. Lectus mattis
            nunc.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50">
            Pages
          </h4>
          <ul className="space-y-2 text-sm">
            {footerPages.map((p) => (
              <li key={p}>
                <a href="#" className="hover:underline">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50">
            Utility Pages
          </h4>
          <ul className="space-y-2 text-sm">
            {["Style Guide", "Start Here", "404 Not Found", "Password protected", "Licenses", "Changelog"].map(
              (p) => (
                <li key={p}>
                  <a href="#" className="hover:underline">
                    {p}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/50">
            Contact us
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="hover:underline">
                {profile.email}
              </a>
            </li>
            <li>{profile.phone}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-black/10 pt-6 text-xs text-black/40">
        © {new Date().getFullYear()} {profile.name}. Hecho con Next.js.
      </div>
    </footer>
  );
}
