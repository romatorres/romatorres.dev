"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-white font-secondary text-sm">
      <div className="container mx-auto px-4 md:px-12 py-12 lg:py-16">
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} RomaTorres.dev - Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
