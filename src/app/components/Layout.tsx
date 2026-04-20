import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Menu, X, PenSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useData } from "./DataContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/organization", label: "Organization" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const { isAdmin, toggleAdmin, personalInfo } = useData();

  return (
    <div
      className="min-h-screen overflow-x-hidden text-white"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#020C1B",
      }}
    >
      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <nav
        className="fixed left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5 transition-all duration-300"
        style={{
          top: "0",
          background: "rgba(2, 12, 27, 0.92)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <NavLink
            to="/"
            className="min-w-0 shrink flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl border border-amber-400/25 bg-amber-400/10 flex items-center justify-center text-amber-400 text-[13px] tracking-[2px] font-semibold">
              {personalInfo.name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase() || "IAN"}
            </div>
            <div className="min-w-0 leading-none">
              <p
                className="max-w-[150px] truncate text-[14px] sm:max-w-[220px] sm:text-[16px] text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                {personalInfo.name || "Finance Portfolio"}
              </p>
              <p className="hidden sm:block text-[11px] text-white/35 tracking-[2px] uppercase mt-1 truncate max-w-[220px]">
                {personalInfo.major || "Management and Capital Market"}
              </p>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-[14px] tracking-wide transition-colors ${
                    isActive ? "text-amber-400" : "text-white/55 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="md:hidden text-white/60 p-2 rounded-lg border border-white/10 hover:text-white hover:border-white/20 transition-colors" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-t border-white/5 px-4 sm:px-6 pb-5"
              style={{ background: "rgba(2, 12, 27, 0.98)" }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 text-[15px] border-b border-white/5 last:border-0 transition-colors ${
                      isActive ? "text-amber-400" : "text-white/55"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-16 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p
              className="text-[20px] mb-2 text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              {personalInfo.name || "Finance Portfolio"}
            </p>
            <p className="text-white/30 text-[13px] max-w-md">
              Portfolio mahasiswa {personalInfo.major || "manajemen"} yang menampilkan proyek, sertifikat, pengalaman organisasi, dan kanal profesional.
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-start md:items-end gap-3">
            <button
              onClick={toggleAdmin}
              className={`inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all border ${
                isAdmin
                  ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
                  : "text-white/45 border-white/10 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {isAdmin ? <CheckCircle2 size={15} /> : <PenSquare size={15} />}
              {isAdmin ? "Mode edit aktif" : "Kelola konten"}
            </button>
            <p className="text-white/25 text-[12px] max-w-xs md:text-right">
              {isAdmin
                ? "Tombol edit akan muncul di profil, organisasi, proyek, sertifikat, dan kontak."
                : "Aktifkan mode edit untuk mengganti foto, social link, dan konten portfolio tanpa database."}
            </p>
            <p className="text-white/20 text-[12px]">
              © 2026 - Personal finance portfolio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
