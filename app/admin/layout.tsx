import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 border-b-2 border-black bg-white px-6 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/cursos" className="flex items-center gap-2 font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black text-xs">
                H
              </span>
              Admin
            </Link>
            <nav className="hidden gap-4 text-sm font-medium sm:flex">
              <Link href="/admin/cursos" className="hover:underline">
                Cursos
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-black/50 hover:underline">
              Ver sitio
            </Link>
            <span className="hidden text-black/40 sm:inline">
              {session.user.name}
            </span>
            <form action={logoutAction}>
              <button className="paper-btn border-2 border-black px-3 py-1.5 text-xs">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
