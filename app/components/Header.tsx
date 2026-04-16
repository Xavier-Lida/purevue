import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-bold text-slate-800">
          Nettoyage & Services
        </a>
        <nav className="flex items-center gap-4">
          <a
            href="#contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Contact
          </a>
          <a
            href="#reserver"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            Réserver
          </a>
          <a
            href="#"
            aria-label="Accueil Pure Vue"
            className="ml-2 block h-10 w-16"
          >
            <Image
              src="/Pure-Vue.png"
              alt="Logo Pure Vue"
              width={1355}
              height={818}
              className="h-full object-contain object-center"
              priority
            />
          </a>
        </nav>
      </div>
    </header>
  );
}
