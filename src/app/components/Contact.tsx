import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Send, Github, Edit3, Save, X, Sparkles } from "lucide-react";
import { useData } from "./DataContext";

function toExternalUrl(value: string, type: "linkedin" | "instagram" | "github") {
  if (!value.trim()) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (type === "linkedin") return `https://${value}`;
  if (type === "instagram") return `https://instagram.com/${value.replace("@", "")}`;
  return `https://github.com/${value.replace("@", "")}`;
}

function EditContactModal({
  form,
  setForm,
  onSave,
  onClose,
}: {
  form: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  setForm: (value: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    instagram: string;
    github: string;
  }) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const inputCls = "w-full rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none transition-colors";
  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
  const label = (text: string) => <label className="text-[12px] text-white/40 mb-1 block tracking-wide">{text}</label>;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} onClick={(event) => event.target === event.currentTarget && onClose()}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl rounded-3xl border border-white/10 overflow-hidden" style={{ background: "#071829" }}>
          <div className="flex items-center justify-between p-6 border-b border-white/8">
            <div>
              <h2 className="text-[20px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                Edit Kontak dan Sosial
              </h2>
              <p className="text-white/35 text-[12px] mt-1">
                LinkedIn, Instagram, email, dan nomor WhatsApp akan langsung berubah di halaman kontak dan home.
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 grid sm:grid-cols-2 gap-4">
            <div>
              {label("Email")}
              <input className={inputCls} style={inputStyle} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="email@kampus.ac.id" />
            </div>
            <div>
              {label("WhatsApp / Phone")}
              <input className={inputCls} style={inputStyle} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+62 812..." />
            </div>
            <div className="sm:col-span-2">
              {label("Lokasi")}
              <input className={inputCls} style={inputStyle} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Kota, Indonesia" />
            </div>
            <div>
              {label("LinkedIn")}
              <input className={inputCls} style={inputStyle} value={form.linkedin} onChange={(event) => setForm({ ...form, linkedin: event.target.value })} placeholder="linkedin.com/in/namaanda" />
            </div>
            <div>
              {label("Instagram")}
              <input className={inputCls} style={inputStyle} value={form.instagram} onChange={(event) => setForm({ ...form, instagram: event.target.value })} placeholder="@namaanda" />
            </div>
            <div className="sm:col-span-2">
              {label("GitHub")}
              <input className={inputCls} style={inputStyle} value={form.github} onChange={(event) => setForm({ ...form, github: event.target.value })} placeholder="username atau URL" />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-white/8">
            <button onClick={onClose} className="px-5 py-2 rounded-lg text-[13px] text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              Batal
            </button>
            <button onClick={onSave} className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-[13px] text-black font-semibold transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              <Save size={14} /> Simpan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Contact() {
  const { personalInfo, updatePersonalInfo, isAdmin } = useData();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [contactDraft, setContactDraft] = useState({
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    linkedin: personalInfo.linkedin,
    instagram: personalInfo.instagram,
    github: personalInfo.github,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${form.name} via Portfolio`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`);
    if (personalInfo.email && personalInfo.email !== "email@mahasiswa.ac.id") {
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    }
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  function openEdit() {
    setContactDraft({
      email: personalInfo.email,
      phone: personalInfo.phone,
      location: personalInfo.location,
      linkedin: personalInfo.linkedin,
      instagram: personalInfo.instagram,
      github: personalInfo.github,
    });
    setEditOpen(true);
  }

  const contactItems = [
    ...(personalInfo.email ? [{ icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` }] : []),
    ...(personalInfo.phone ? [{ icon: Phone, label: "WhatsApp / Phone", value: personalInfo.phone, href: `https://wa.me/${personalInfo.phone.replace(/\D/g, "")}` }] : []),
    ...(personalInfo.location ? [{ icon: MapPin, label: "Lokasi", value: personalInfo.location, href: "" }] : []),
  ];

  const socials = [
    ...(personalInfo.linkedin ? [{ icon: Linkedin, label: "LinkedIn", href: toExternalUrl(personalInfo.linkedin, "linkedin") }] : []),
    ...(personalInfo.instagram ? [{ icon: Instagram, label: "Instagram", href: toExternalUrl(personalInfo.instagram, "instagram") }] : []),
    ...(personalInfo.github ? [{ icon: Github, label: "GitHub", href: toExternalUrl(personalInfo.github, "github") }] : []),
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        {editOpen && (
          <EditContactModal
            form={contactDraft}
            setForm={setContactDraft}
            onSave={() => {
              updatePersonalInfo({ ...personalInfo, ...contactDraft });
              setEditOpen(false);
            }}
            onClose={() => setEditOpen(false)}
          />
        )}

        {isAdmin && (
          <div className="rounded-2xl border border-amber-400/20 px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(6,23,40,0.85))" }}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.14)", border: "1px solid rgba(251,191,36,0.22)" }}>
                <Sparkles size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-1">Mode Edit Aktif</p>
                <p className="text-white/55 text-[13px] leading-relaxed">
                  LinkedIn, Instagram, email, WhatsApp, dan lokasi bisa diubah langsung dari tombol edit kontak di halaman ini.
                </p>
              </div>
            </div>
            <button onClick={openEdit} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] text-black font-semibold transition-all hover:scale-[1.02] shrink-0" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              <Edit3 size={15} /> Edit Kontak dan Sosial
            </button>
          </div>
        )}

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-3">
          Get In Touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[36px] md:text-[44px] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
          Hubungi Saya
        </motion.h1>
        <p className="text-white/40 text-[15px] max-w-2xl mb-12">
          Halaman ini dirancang untuk menampilkan kanal komunikasi yang rapi dan profesional, mulai dari email, WhatsApp, hingga LinkedIn dan Instagram yang relevan untuk kebutuhan networking atau kolaborasi.
        </p>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12">
          <motion.form initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="rounded-[28px] border border-white/6 p-7 space-y-5" style={{ background: "rgba(6,23,40,0.74)", boxShadow: "0 18px 60px rgba(0,0,0,0.25)" }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-1">Direct Message</p>
                <p className="text-white/40 text-[13px]">Kirim pesan cepat melalui form ini.</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.18)" }}>
                <Send size={18} className="text-amber-400" />
              </div>
            </div>
            <div>
              <label className="text-[13px] text-white/50 mb-2 block">Nama</label>
              <input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 focus:outline-none transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} placeholder="Nama lengkap" required />
            </div>
            <div>
              <label className="text-[13px] text-white/50 mb-2 block">Email</label>
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 focus:outline-none transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} placeholder="email@example.com" required />
            </div>
            <div>
              <label className="text-[13px] text-white/50 mb-2 block">Pesan</label>
              <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={6} className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 focus:outline-none transition-colors resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} placeholder="Tulis pesan Anda..." required />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] text-black font-medium transition-all hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              {sent ? "Terkirim" : "Kirim Pesan"} <Send size={16} />
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="rounded-[28px] p-7 border border-amber-400/15" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(6,23,40,0.82))", boxShadow: "0 18px 60px rgba(0,0,0,0.22)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[22px] mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{personalInfo.name}</p>
                  <p className="text-amber-400/85 text-[13px] mb-1">{personalInfo.major}</p>
                  <p className="text-white/40 text-[13px]">{personalInfo.university} / {personalInfo.year}</p>
                </div>
                {isAdmin && (
                  <button onClick={openEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] text-black font-semibold" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                    <Edit3 size={13} /> Edit
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-2xl p-5 border border-white/6 hover:border-amber-400/20 transition-all" style={{ background: "rgba(6,23,40,0.80)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.18)" }}>
                    <item.icon size={18} className="text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/35 text-[12px] mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-white hover:text-amber-400 transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[14px] text-white truncate">{item.value}</p>
                    )}
                  </div>
                  {isAdmin && item.label !== "Lokasi" && (
                    <button onClick={openEdit} className="text-amber-400/65 hover:text-amber-400 transition-colors shrink-0">
                      <Edit3 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {socials.length > 0 && (
              <div>
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-3">Social Presence</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {socials.map((item) => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl px-4 py-4 text-[13px] text-white/58 border border-white/6 hover:border-amber-400/20 hover:text-amber-400 transition-colors" style={{ background: "rgba(6,23,40,0.80)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.18)" }}>
                        <item.icon size={16} className="text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/35 text-[11px] uppercase tracking-[1px] mb-1">{item.label}</p>
                        <p className="text-[13px] text-white/80">Buka Profil</p>
                      </div>
                      {isAdmin && <Edit3 size={14} className="text-amber-400/65 shrink-0" />}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="text-white/25 text-[12px] pt-1">
              Kontak dan social link dapat diperbarui langsung dari tombol edit yang tampil saat mode edit aktif.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

