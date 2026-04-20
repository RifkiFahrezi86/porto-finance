import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  BookOpenCheck,
  LineChart,
  Landmark,
  Edit3,
  X,
  Plus,
  Trash2,
  GraduationCap,
  Save,
  Upload,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Github,
  ImagePlus,
  Sparkles,
} from "lucide-react";
import { useData, type PersonalInfo } from "./DataContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import profileImgDefault from "../../imports/WhatsApp_Image_2026-04-18_at_17.25.30.jpeg";

const SKILL_ICONS = [LineChart, Landmark, Users, BookOpenCheck, TrendingUp, BarChart3, GraduationCap];

function toExternalUrl(value: string, type: "linkedin" | "instagram" | "github") {
  if (!value.trim()) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (type === "linkedin") return `https://${value}`;
  if (type === "instagram") return `https://instagram.com/${value.replace("@", "")}`;
  return `https://github.com/${value.replace("@", "")}`;
}

function readFileAsDataUrl(file: File, onLoad: (result: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onLoad(reader.result as string);
  reader.readAsDataURL(file);
}

function EditProfileModal({
  draft,
  setDraft,
  onSave,
  onClose,
}: {
  draft: PersonalInfo;
  setDraft: (d: PersonalInfo) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const inputCls = "w-full rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:border-amber-400/50 focus:outline-none transition-colors";
  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
  const sectionStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" };
  const label = (text: string) => <label className="text-[12px] text-white/40 mb-1 block tracking-wide">{text}</label>;

  const updateStat = (index: number, key: "num" | "label", value: string) => {
    const stats = [...draft.stats];
    stats[index] = { ...stats[index], [key]: value };
    setDraft({ ...draft, stats });
  };

  const updateSkill = (index: number, key: "label" | "desc", value: string) => {
    const skills = [...draft.skills];
    skills[index] = { ...skills[index], [key]: value };
    setDraft({ ...draft, skills });
  };

  const updateEdu = (index: number, key: keyof PersonalInfo["education"][0], value: string) => {
    const education = [...draft.education];
    education[index] = { ...education[index], [key]: value };
    setDraft({ ...draft, education });
  };

  const photoSrc = draft.photo.trim() || profileImgDefault;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={(event) => event.target === event.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl rounded-3xl border border-white/10 overflow-hidden"
          style={{ background: "#071829" }}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/8">
            <div>
              <h2 className="text-[20px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                Edit Informasi Profil
              </h2>
              <p className="text-white/35 text-[12px] mt-1">
                Foto, jurusan, universitas, LinkedIn, Instagram, dan data profil lain akan langsung berubah di halaman portfolio.
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[78vh]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
              <div className="rounded-2xl p-5 space-y-4" style={sectionStyle}>
                <div>
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-2">Foto Profil</p>
                  <p className="text-white/35 text-[12px] leading-relaxed">
                    Card jurusan dan universitas di hero akan ikut berubah dari data ini.
                  </p>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 aspect-[4/5]">
                  <ImageWithFallback src={photoSrc} alt={draft.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  {label("URL Foto Profil")}
                  <input
                    className={inputCls}
                    style={inputStyle}
                    value={draft.photo}
                    onChange={(event) => setDraft({ ...draft, photo: event.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <label className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-[13px] text-amber-400 border border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-400/10 transition-colors cursor-pointer">
                  <Upload size={14} /> Upload Foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      readFileAsDataUrl(file, (result) => setDraft({ ...draft, photo: result }));
                    }}
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl p-5" style={sectionStyle}>
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-4">Identitas Diri</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      {label("Nama Lengkap")}
                      <input className={inputCls} style={inputStyle} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Nama Anda" />
                    </div>
                    <div>
                      {label("Tagline")}
                      <input className={inputCls} style={inputStyle} value={draft.tagline} onChange={(event) => setDraft({ ...draft, tagline: event.target.value })} placeholder="Management Student - Finance & Capital Market" />
                    </div>
                  </div>
                  <div className="mt-3">
                    {label("Bio Singkat")}
                    <textarea className={inputCls} style={inputStyle} rows={4} value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} />
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={sectionStyle}>
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-4">Kontak dan Sosial</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      {label("Email")}
                      <input className={inputCls} style={inputStyle} value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="email@kampus.ac.id" />
                    </div>
                    <div>
                      {label("WhatsApp / Phone")}
                      <input className={inputCls} style={inputStyle} value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="+62 812..." />
                    </div>
                    <div>
                      {label("LinkedIn")}
                      <input className={inputCls} style={inputStyle} value={draft.linkedin} onChange={(event) => setDraft({ ...draft, linkedin: event.target.value })} placeholder="linkedin.com/in/namaanda" />
                    </div>
                    <div>
                      {label("Instagram")}
                      <input className={inputCls} style={inputStyle} value={draft.instagram} onChange={(event) => setDraft({ ...draft, instagram: event.target.value })} placeholder="@namaanda" />
                    </div>
                    <div>
                      {label("GitHub")}
                      <input className={inputCls} style={inputStyle} value={draft.github} onChange={(event) => setDraft({ ...draft, github: event.target.value })} placeholder="username atau URL" />
                    </div>
                    <div>
                      {label("Lokasi")}
                      <input className={inputCls} style={inputStyle} value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} placeholder="Kota, Indonesia" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={sectionStyle}>
              <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-4">Akademik</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  {label("Universitas")}
                  <input className={inputCls} style={inputStyle} value={draft.university} onChange={(event) => setDraft({ ...draft, university: event.target.value })} />
                </div>
                <div>
                  {label("Jurusan")}
                  <input className={inputCls} style={inputStyle} value={draft.major} onChange={(event) => setDraft({ ...draft, major: event.target.value })} />
                </div>
                <div>
                  {label("Angkatan / Tahun")}
                  <input className={inputCls} style={inputStyle} value={draft.year} onChange={(event) => setDraft({ ...draft, year: event.target.value })} />
                </div>
                <div>
                  {label("Lokasi Ringkas")}
                  <input className={inputCls} style={inputStyle} value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={sectionStyle}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Riwayat Pendidikan</p>
                <button
                  onClick={() => setDraft({ ...draft, education: [...draft.education, { school: "", degree: "", period: "", desc: "" }] })}
                  className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors"
                >
                  <Plus size={13} /> Tambah
                </button>
              </div>
              <div className="space-y-3">
                {draft.education.map((item, index) => (
                  <div key={`${item.school}-${index}`} className="rounded-xl p-4 border border-white/8 space-y-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex justify-end">
                      <button onClick={() => setDraft({ ...draft, education: draft.education.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div>
                        {label("Nama Kampus / Sekolah")}
                        <input className={inputCls} style={inputStyle} value={item.school} onChange={(event) => updateEdu(index, "school", event.target.value)} />
                      </div>
                      <div>
                        {label("Program / Gelar")}
                        <input className={inputCls} style={inputStyle} value={item.degree} onChange={(event) => updateEdu(index, "degree", event.target.value)} />
                      </div>
                    </div>
                    <div>
                      {label("Periode")}
                      <input className={inputCls} style={inputStyle} value={item.period} onChange={(event) => updateEdu(index, "period", event.target.value)} />
                    </div>
                    <div>
                      {label("Deskripsi")}
                      <input className={inputCls} style={inputStyle} value={item.desc} onChange={(event) => updateEdu(index, "desc", event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-5" style={sectionStyle}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Statistik Profil</p>
                  <button onClick={() => setDraft({ ...draft, stats: [...draft.stats, { num: "", label: "" }] })} className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors">
                    <Plus size={13} /> Tambah
                  </button>
                </div>
                <div className="space-y-2">
                  {draft.stats.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                      <input className={inputCls} style={{ ...inputStyle, width: "90px" }} value={item.num} onChange={(event) => updateStat(index, "num", event.target.value)} placeholder="10+" />
                      <input className={`${inputCls} flex-1`} style={inputStyle} value={item.label} onChange={(event) => updateStat(index, "label", event.target.value)} placeholder="Proyek Akademik" />
                      <button onClick={() => setDraft({ ...draft, stats: draft.stats.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={sectionStyle}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Bidang Keahlian</p>
                  <button onClick={() => setDraft({ ...draft, skills: [...draft.skills, { label: "", desc: "" }] })} className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors">
                    <Plus size={13} /> Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {draft.skills.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="rounded-xl p-3 border border-white/8 space-y-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex justify-end">
                        <button onClick={() => setDraft({ ...draft, skills: draft.skills.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div>
                        {label("Nama Keahlian")}
                        <input className={inputCls} style={inputStyle} value={item.label} onChange={(event) => updateSkill(index, "label", event.target.value)} />
                      </div>
                      <div>
                        {label("Deskripsi")}
                        <input className={inputCls} style={inputStyle} value={item.desc} onChange={(event) => updateSkill(index, "desc", event.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export function Home() {
  const { personalInfo, updatePersonalInfo, isAdmin } = useData();
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState<PersonalInfo>(personalInfo);

  const profileSrc = personalInfo.photo.trim() || profileImgDefault;
  const socialLinks = [
    personalInfo.linkedin ? { icon: Linkedin, label: "LinkedIn", href: toExternalUrl(personalInfo.linkedin, "linkedin") } : null,
    personalInfo.instagram ? { icon: Instagram, label: "Instagram", href: toExternalUrl(personalInfo.instagram, "instagram") } : null,
    personalInfo.github ? { icon: Github, label: "GitHub", href: toExternalUrl(personalInfo.github, "github") } : null,
  ].filter(Boolean) as { icon: typeof Linkedin; label: string; href: string }[];

  const quickDetails = [
    { label: "Jurusan", value: personalInfo.major },
    { label: "Universitas", value: personalInfo.university },
    { label: "Angkatan", value: personalInfo.year },
  ];

  function openEdit() {
    setDraft({ ...personalInfo });
    setEditOpen(true);
  }

  return (
    <div>
      {editOpen && (
        <EditProfileModal
          draft={draft}
          setDraft={setDraft}
          onSave={() => {
            updatePersonalInfo(draft);
            setEditOpen(false);
          }}
          onClose={() => setEditOpen(false)}
        />
      )}

      {isAdmin && (
        <section className="pt-8 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl border border-amber-400/20 px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(6,23,40,0.85))" }}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.14)", border: "1px solid rgba(251,191,36,0.22)" }}>
                <Sparkles size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-1">Mode Edit Aktif</p>
                <p className="text-white/55 text-[13px] leading-relaxed">
                  Foto profil, card jurusan-universitas, LinkedIn, Instagram, dan data akademik bisa diubah langsung dari tombol edit di halaman ini.
                </p>
              </div>
            </div>
            <button onClick={openEdit} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] text-black font-semibold transition-all hover:scale-[1.02] shrink-0" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              <Edit3 size={14} /> Edit Profil Lengkap
            </button>
          </div>
        </section>
      )}

      <section className="min-h-[calc(100vh-64px)] flex items-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-[12px] tracking-[2px] uppercase">
                {personalInfo.major} - {personalInfo.university}
              </span>
            </div>

            <h1 className="text-[42px] md:text-[62px] leading-[1.03] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
              {personalInfo.name}
            </h1>
            <p className="text-white/65 text-[15px] md:text-[16px] tracking-wide mb-3">{personalInfo.tagline}</p>
            <p className="text-white/42 text-[15px] leading-relaxed max-w-2xl mb-6">{personalInfo.bio}</p>

            <div className="flex flex-wrap gap-3 mb-7">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/60 border border-white/10 hover:border-amber-400/30 hover:text-white transition-colors" style={{ background: "rgba(6, 23, 40, 0.55)" }}>
                  <Mail size={14} className="text-amber-400" /> {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <a href={`https://wa.me/${personalInfo.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/60 border border-white/10 hover:border-amber-400/30 hover:text-white transition-colors" style={{ background: "rgba(6, 23, 40, 0.55)" }}>
                  <Phone size={14} className="text-amber-400" /> {personalInfo.phone}
                </a>
              )}
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-white/60 border border-white/10 hover:border-amber-400/30 hover:text-white transition-colors" style={{ background: "rgba(6, 23, 40, 0.55)" }}>
                  <item.icon size={14} className="text-amber-400" /> {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] text-black font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                Lihat Proyek <ArrowRight size={16} />
              </Link>
              <Link to="/certificates" className="inline-flex items-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-xl text-[14px] hover:border-amber-400/30 hover:text-white transition-all">
                Lihat Sertifikat <ArrowRight size={16} />
              </Link>
              {isAdmin && (
                <button onClick={openEdit} className="inline-flex items-center gap-2 border border-amber-400/25 text-amber-400 px-6 py-3 rounded-xl text-[14px] hover:bg-amber-400/10 transition-all">
                  <Edit3 size={16} /> Edit Profil
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
              {quickDetails.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/8 px-4 py-4" style={{ background: "rgba(6, 23, 40, 0.58)" }}>
                  <p className="text-white/30 text-[11px] uppercase tracking-[2px] mb-1.5">{item.label}</p>
                  <p className="text-white/88 text-[13px] leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[430px]">
              <div className="absolute -inset-3 rounded-[32px] blur-2xl opacity-40 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.35), transparent 60%)" }} />
              <div className="relative rounded-[32px] overflow-hidden border border-amber-400/20" style={{ background: "rgba(6, 23, 40, 0.68)", boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
                <div className="absolute inset-x-0 top-0 h-28 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(2,12,27,0.2), transparent)" }} />
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback src={profileSrc} alt={personalInfo.name} className="w-full h-full object-cover" />
                </div>

                {isAdmin && (
                  <button onClick={openEdit} className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] text-black font-semibold shadow-lg" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                    <ImagePlus size={14} /> Ganti Foto
                  </button>
                )}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="absolute left-5 right-5 bottom-5 rounded-2xl px-5 py-4 border border-amber-400/18 backdrop-blur-xl" style={{ background: "rgba(4, 18, 34, 0.88)" }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-amber-400 text-[15px] font-semibold mb-1">{personalInfo.major}</p>
                      <p className="text-white/55 text-[12px] leading-relaxed">{personalInfo.university}</p>
                    </div>
                    {isAdmin && (
                      <button onClick={openEdit} className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors shrink-0">
                        <Edit3 size={12} /> Edit
                      </button>
                    )}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }} className="absolute top-5 left-5 rounded-2xl px-4 py-3 border border-white/10" style={{ background: "rgba(6, 23, 40, 0.92)" }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-400" />
                    <div>
                      <p className="text-white/75 text-[12px]">Capital Market Track</p>
                      <p className="text-white/30 text-[11px]">Finance oriented portfolio</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {personalInfo.stats.map((stat, index) => (
              <motion.div key={`${stat.label}-${index}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl p-6 border border-white/5 hover:border-amber-400/20 transition-all" style={{ background: "rgba(6, 23, 40, 0.65)" }}>
                <p className="text-[34px] text-amber-400 mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  {stat.num}
                </p>
                <p className="text-white/40 text-[13px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-3">
            Academic Profile
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[32px] md:text-[38px] tracking-tight mb-10" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Fondasi Akademik dan Arah Pengembangan
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Jurusan", value: personalInfo.major, desc: "Bidang studi utama yang membentuk fokus analisis dan kerangka berpikir bisnis." },
              { title: "Universitas", value: personalInfo.university, desc: "Lingkungan akademik tempat perjalanan belajar, riset, dan organisasi berkembang." },
              { title: "Tahun Studi", value: personalInfo.year, desc: "Rentang perjalanan yang menjadi konteks untuk proyek, sertifikat, dan pengalaman organisasi." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 border border-white/6" style={{ background: "rgba(6, 23, 40, 0.62)" }}>
                <p className="text-white/30 text-[11px] uppercase tracking-[2px] mb-2">{item.title}</p>
                <p className="text-white text-[18px] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{item.value}</p>
                <p className="text-white/42 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {personalInfo.education.length > 0 && (
            <div className="space-y-4">
              {personalInfo.education.map((edu, index) => (
                <motion.div key={`${edu.school}-${index}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-6 items-start rounded-2xl p-6 border border-white/5 hover:border-amber-400/20 transition-all" style={{ background: "rgba(6, 23, 40, 0.62)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    <GraduationCap size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[17px] text-white/90 mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{edu.school}</p>
                    <p className="text-amber-400/80 text-[13px] mb-1">{edu.degree}</p>
                    <p className="text-white/30 text-[12px] mb-2">{edu.period}</p>
                    {edu.desc && <p className="text-white/45 text-[13px] leading-relaxed">{edu.desc}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-3">
            Focus Areas
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[32px] md:text-[38px] tracking-tight mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            Bidang Yang Sedang Saya Kembangkan
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInfo.skills.map((skill, index) => {
              const Icon = SKILL_ICONS[index % SKILL_ICONS.length];
              return (
                <motion.div key={`${skill.label}-${index}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl p-6 border border-white/5 hover:border-amber-400/25 transition-all group" style={{ background: "rgba(6, 23, 40, 0.62)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
                    <Icon size={22} className="text-amber-400" />
                  </div>
                  <h3 className="text-[16px] mb-2 text-white/90">{skill.label}</h3>
                  <p className="text-white/40 text-[13px] leading-relaxed">{skill.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[28px] p-10 md:p-14 relative overflow-hidden border border-amber-400/15" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(6,23,40,0.84) 100%)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(251,191,36,0.12) 0%, transparent 60%)" }} />
            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div>
                <p className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-4">Portfolio Direction</p>
                <h2 className="text-[32px] md:text-[42px] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  Jelajahi Jejak Belajar Yang Terdokumentasi
                </h2>
                <p className="text-white/52 text-[15px] leading-relaxed max-w-2xl mb-8">
                  Dari proyek analisis keuangan, sertifikat pelatihan, hingga pengalaman organisasi, seluruh bagian portfolio ini dirancang untuk menunjukkan proses belajar yang terarah dan relevan dengan bidang finance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/organization" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] text-black font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                    Lihat Organisasi <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-xl text-[14px] hover:border-amber-400/30 hover:text-white transition-all">
                    Hubungi Saya <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="grid gap-4">
                {[
                  { icon: TrendingUp, title: "Proyek Analisis", desc: "Studi kasus yang menekankan rasio keuangan, valuasi, dan logika keputusan bisnis." },
                  { icon: BarChart3, title: "Catatan Sertifikasi", desc: "Rekam pembelajaran formal maupun pelatihan tambahan yang mendukung arah profesi." },
                  { icon: Users, title: "Eksposur Organisasi", desc: "Pengalaman lapangan yang melatih koordinasi, kepemimpinan, dan literasi pasar modal." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/8 p-4" style={{ background: "rgba(6, 23, 40, 0.58)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                        <item.icon size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-white text-[15px] mb-1">{item.title}</p>
                        <p className="text-white/40 text-[13px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
