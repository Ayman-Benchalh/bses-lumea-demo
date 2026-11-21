import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-pearl-white text-espresso text-center space-y-4">
      <span className="font-editorial text-6xl sm:text-7xl font-bold text-rose-dusty">404</span>
      <h1 className="font-editorial text-2xl sm:text-3xl font-medium">Page Introuvable</h1>
      <p className="text-xs sm:text-sm text-espresso-muted max-w-md">
        Le soin ou la page que vous recherchez semble introuvable ou a été déplacée.
      </p>
      <Link
        href="/fr"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
}

