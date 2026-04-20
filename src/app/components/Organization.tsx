import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Calendar,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Upload,
  ImagePlus,
  Sparkles,
} from "lucide-react";
import { useData, type OrgEntry } from "./DataContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ACTIVITY_ICONS = [BookOpen, TrendingUp, MapPin, Target, Users, Calendar];

function readFileAsDataUrl(file: File, onLoad: (result: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onLoad(reader.result as string);
  reader.readAsDataURL(file);
}

function OrgModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Omit<OrgEntry, "id"> | OrgEntry;
  onSave: (org: Omit<OrgEntry, "id"> | OrgEntry) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<typeof initial>({ ...initial });
  const inputCls = "w-full rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none transition-colors";
  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
  const sectionStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" };
  const label = (text: string) => <label className="text-[12px] text-white/40 mb-1 block">{text}</label>;

  const updateTimeline = (index: number, key: keyof OrgEntry["timeline"][0], value: string) => {
    const timeline = [...draft.timeline];
    timeline[index] = { ...timeline[index], [key]: value };
    setDraft({ ...draft, timeline });
  };

  const updateActivity = (index: number, key: "title" | "desc", value: string) => {
    const activities = [...draft.activities];
    activities[index] = { ...activities[index], [key]: value };
    setDraft({ ...draft, activities });
  };

  const updateStat = (index: number, key: "num" | "label", value: string) => {
    const stats = [...draft.stats];
    stats[index] = { ...stats[index], [key]: value };
    setDraft({ ...draft, stats });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-6 sm:py-10 px-3 sm:px-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={(event) => event.target === event.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl rounded-3xl border border-white/10 overflow-hidden"
          style={{ background: "#071829" }}
        >
          <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-white/8">
            <div>
              <h2 className="text-[18px] sm:text-[20px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                {"id" in initial ? "Edit Organisasi" : "Tambah Organisasi"}
              </h2>
              <p className="text-white/35 text-[12px] mt-1">
                Cover organisasi, peran, timeline, statistik, dan kegiatan akan langsung muncul di halaman organisasi.
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[78vh]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
              <div className="rounded-2xl p-5 space-y-4" style={sectionStyle}>
                <div>
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-2">Cover Organisasi</p>
                  <p className="text-white/35 text-[12px] leading-relaxed">
                    Tambahkan foto kegiatan, logo, atau visual yang merepresentasikan organisasi.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-amber-400/20 aspect-[4/3]">
                  <ImageWithFallback src={draft.image} alt={draft.name || "Organization cover"} className="w-full h-full object-cover" />
                </div>
                <div>
                  {label("URL Cover")}
                  <input className={inputCls} style={inputStyle} value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} placeholder="https://..." />
                </div>
                <label className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-[13px] text-amber-400 border border-amber-400/20 hover:border-amber-400/40 hover:bg-amber-400/10 transition-colors cursor-pointer">
                  <Upload size={14} /> Upload Cover
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      readFileAsDataUrl(file, (result) => setDraft({ ...draft, image: result }));
                    }}
                  />
                </label>
              </div>

              <div className="rounded-2xl p-5" style={sectionStyle}>
                <p className="text-amber-400 text-[11px] tracking-[3px] uppercase mb-4">Informasi Dasar</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    {label("Nama Lengkap Organisasi")}
                    <input className={inputCls} style={inputStyle} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Kelompok Studi Pasar Modal" />
                  </div>
                  <div>
                    {label("Akronim")}
                    <input className={inputCls} style={inputStyle} value={draft.acronym} onChange={(event) => setDraft({ ...draft, acronym: event.target.value })} placeholder="KSPM" />
                  </div>
                  <div>
                    {label("Jabatan / Peran")}
                    <input className={inputCls} style={inputStyle} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} placeholder="Koordinator Edukasi" />
                  </div>
                  <div>
                    {label("Periode")}
                    <input className={inputCls} style={inputStyle} value={draft.period} onChange={(event) => setDraft({ ...draft, period: event.target.value })} placeholder="2024 - Sekarang" />
                  </div>
                </div>
                <div className="mt-3">
                  {label("Deskripsi Organisasi")}
                  <textarea className={inputCls} style={inputStyle} rows={4} value={draft.desc} onChange={(event) => setDraft({ ...draft, desc: event.target.value })} />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-5" style={sectionStyle}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Statistik</p>
                  <button onClick={() => setDraft({ ...draft, stats: [...draft.stats, { num: "", label: "" }] })} className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors">
                    <Plus size={13} /> Tambah
                  </button>
                </div>
                <div className="space-y-2">
                  {draft.stats.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                      <input className={inputCls} style={{ ...inputStyle, width: "82px" }} value={item.num} onChange={(event) => updateStat(index, "num", event.target.value)} placeholder="50+" />
                      <input className={`${inputCls} flex-1`} style={inputStyle} value={item.label} onChange={(event) => updateStat(index, "label", event.target.value)} placeholder="Anggota Aktif" />
                      <button onClick={() => setDraft({ ...draft, stats: draft.stats.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5" style={sectionStyle}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Timeline Perjalanan</p>
                  <button onClick={() => setDraft({ ...draft, timeline: [...draft.timeline, { year: "", role: "", desc: "" }] })} className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors">
                    <Plus size={13} /> Tambah
                  </button>
                </div>
                <div className="space-y-3">
                  {draft.timeline.map((item, index) => (
                    <div key={`${item.year}-${index}`} className="rounded-xl p-3 border border-white/8 space-y-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex justify-end">
                        <button onClick={() => setDraft({ ...draft, timeline: draft.timeline.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <div>
                          {label("Tahun")}
                          <input className={inputCls} style={inputStyle} value={item.year} onChange={(event) => updateTimeline(index, "year", event.target.value)} placeholder="2024" />
                        </div>
                        <div>
                          {label("Jabatan")}
                          <input className={inputCls} style={inputStyle} value={item.role} onChange={(event) => updateTimeline(index, "role", event.target.value)} placeholder="Anggota Baru" />
                        </div>
                      </div>
                      <div>
                        {label("Deskripsi")}
                        <input className={inputCls} style={inputStyle} value={item.desc} onChange={(event) => updateTimeline(index, "desc", event.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5" style={sectionStyle}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-amber-400 text-[11px] tracking-[3px] uppercase">Kegiatan Utama</p>
                <button onClick={() => setDraft({ ...draft, activities: [...draft.activities, { title: "", desc: "" }] })} className="inline-flex items-center gap-1 text-amber-400 text-[12px] hover:text-amber-300 transition-colors">
                  <Plus size={13} /> Tambah
                </button>
              </div>
              <div className="space-y-3">
                {draft.activities.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-xl p-3 border border-white/8 space-y-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex justify-end">
                      <button onClick={() => setDraft({ ...draft, activities: draft.activities.filter((_, current) => current !== index) })} className="text-red-400/60 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div>
                      {label("Nama Kegiatan")}
                      <input className={inputCls} style={inputStyle} value={item.title} onChange={(event) => updateActivity(index, "title", event.target.value)} />
                    </div>
                    <div>
                      {label("Deskripsi")}
                      <textarea className={inputCls} style={inputStyle} rows={2} value={item.desc} onChange={(event) => updateActivity(index, "desc", event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-4 sm:p-6 border-t border-white/8">
            <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg text-[13px] text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-colors">
              Batal
            </button>
            <button onClick={() => onSave(draft)} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-2 rounded-lg text-[13px] text-black font-semibold transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              <Save size={14} /> Simpan
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function OrgCard({
  org,
  isAdmin,
  onEdit,
  onDelete,
}: {
  org: OrgEntry;
  isAdmin: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] sm:rounded-[28px] border border-white/8 overflow-hidden" style={{ background: "rgba(6, 23, 40, 0.72)", boxShadow: "0 18px 60px rgba(0,0,0,0.28)" }}>
      <div className="relative aspect-[5/4] sm:aspect-[16/6] overflow-hidden border-b border-white/6">
        <ImageWithFallback src={org.image} alt={org.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,12,27,0.18), rgba(2,12,27,0.84))" }} />
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-amber-400/22 text-amber-400 text-[11px] sm:text-[12px] tracking-[2px] uppercase" style={{ background: "rgba(2,12,27,0.65)" }}>
          <TrendingUp size={14} /> {org.acronym}
        </div>
        <div className="absolute right-4 top-4 sm:right-5 sm:top-5 hidden sm:flex items-center gap-2">
          {isAdmin && (
            <>
              <button onClick={onEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] text-black font-semibold shadow-lg" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                <ImagePlus size={14} /> Edit
              </button>
              <button onClick={onDelete} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] text-white font-semibold bg-red-500/90 hover:bg-red-500 transition-colors">
                <Trash2 size={14} /> Hapus
              </button>
            </>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[22px] sm:text-[24px] md:text-[30px] text-white mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                {org.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 text-amber-400/85 text-[13px]"><Users size={13} /> {org.role}</span>
                <span className="hidden sm:block text-white/20">/</span>
                <span className="inline-flex items-center gap-1 text-white/45 text-[13px]"><Calendar size={13} /> {org.period}</span>
              </div>
            </div>
            <button onClick={() => setExpanded((value) => !value)} className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2 rounded-full text-[12px] text-white/65 border border-white/12 hover:border-amber-400/25 hover:text-white transition-colors" style={{ background: "rgba(6,23,40,0.55)" }}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />} {expanded ? "Sembunyikan Detail" : "Lihat Detail"}
            </button>
          </div>
          {isAdmin && (
            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              <button onClick={onEdit} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[12px] text-black font-semibold shadow-lg" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                <ImagePlus size={14} /> Edit Organisasi
              </button>
              <button onClick={onDelete} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[12px] text-white font-semibold bg-red-500/90 hover:bg-red-500 transition-colors">
                <Trash2 size={14} /> Hapus Organisasi
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <p className="text-white/46 text-[14px] leading-relaxed max-w-3xl">{org.desc}</p>

        {org.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-md">
            {org.stats.map((item, index) => (
              <div key={`${item.label}-${index}`} className="text-center rounded-2xl py-4 border border-white/6" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-amber-400 text-[20px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{item.num}</p>
                <p className="text-white/30 text-[11px] mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (org.timeline.length > 0 || org.activities.length > 0) && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden border-t border-white/6">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
              {org.timeline.length > 0 && (
                <div>
                  <h3 className="text-[18px] mb-5 text-white/84" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                    Timeline Perjalanan
                  </h3>
                  <div className="space-y-0">
                    {org.timeline.map((item, index) => (
                      <div key={`${item.year}-${index}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-amber-400 text-[11px] shrink-0" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}>
                            {item.year.slice(-2)}
                          </div>
                          {index < org.timeline.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2 min-h-[24px]" />}
                        </div>
                        <div className="pb-5">
                          <p className="text-[14px] text-white/86 mb-0.5">{item.role}</p>
                          <p className="text-white/30 text-[12px] mb-1 flex items-center gap-1"><Calendar size={11} /> {item.year}</p>
                          <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {org.activities.length > 0 && (
                <div>
                  <h3 className="text-[18px] mb-5 text-white/84" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                    Kegiatan Utama
                  </h3>
                  <div className="grid gap-3">
                    {org.activities.map((activity, index) => {
                      const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];
                      return (
                        <div key={`${activity.title}-${index}`} className="rounded-2xl p-4 border border-white/5 hover:border-amber-400/20 transition-all" style={{ background: "rgba(6,23,40,0.84)" }}>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.18)" }}>
                              <Icon size={17} className="text-amber-400" />
                            </div>
                            <div>
                              <p className="text-[14px] text-white/86 mb-1">{activity.title}</p>
                              <p className="text-white/40 text-[13px] leading-relaxed">{activity.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const EMPTY_ORG: Omit<OrgEntry, "id"> = {
  name: "",
  acronym: "",
  role: "",
  period: "",
  desc: "",
  image: "",
  stats: [{ num: "", label: "" }],
  timeline: [{ year: "", role: "", desc: "" }],
  activities: [{ title: "", desc: "" }],
};

export function Organization() {
  const { orgs, addOrg, updateOrg, deleteOrg, isAdmin } = useData();
  const [modal, setModal] = useState<null | "add" | OrgEntry>(null);

  return (
    <div className="min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {modal && (
          <OrgModal
            initial={modal === "add" ? EMPTY_ORG : modal}
            onSave={(org) => {
              if (modal === "add") addOrg(org as Omit<OrgEntry, "id">);
              else updateOrg(org as OrgEntry);
              setModal(null);
            }}
            onClose={() => setModal(null)}
          />
        )}

        {isAdmin && (
          <div className="rounded-2xl border border-amber-400/20 px-4 sm:px-5 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.10), rgba(6,23,40,0.85))" }}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(251,191,36,0.14)", border: "1px solid rgba(251,191,36,0.22)" }}>
                <Sparkles size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-1">Mode Edit Aktif</p>
                <p className="text-white/55 text-[13px] leading-relaxed">
                  Anda bisa menambahkan cover organisasi, mengganti gambar, mengubah peran, statistik, timeline, dan detail kegiatan langsung dari halaman ini.
                </p>
              </div>
            </div>
            <button onClick={() => setModal("add")} className="inline-flex w-full md:w-auto items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13px] text-black font-semibold transition-all hover:scale-[1.02] shrink-0" style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
              <Plus size={15} /> Tambah Organisasi
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-2">
              Organization
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[32px] sm:text-[36px] md:text-[44px] tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
              Pengalaman Organisasi
            </motion.h1>
          </div>
          {!isAdmin && orgs.length > 0 && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/40 text-[12px]" style={{ background: "rgba(6,23,40,0.62)" }}>
              <TrendingUp size={13} className="text-amber-400" />
              Portfolio organisasi dan aktivitas kampus
            </div>
          )}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-[15px] max-w-2xl mb-10 sm:mb-14">
          Daftar organisasi yang pernah dan sedang saya ikuti selama masa studi, beserta peran, perjalanan, kegiatan, dan dokumentasi visual yang mendukung rekam jejak tersebut.
        </motion.p>

        {orgs.length === 0 ? (
          <div className="text-center py-20 text-white/30 text-[15px]">
            {isAdmin ? "Belum ada organisasi. Klik tombol Tambah Organisasi untuk memulai." : "Belum ada data organisasi."}
          </div>
        ) : (
          <div className="space-y-8">
            {orgs.map((org) => (
              <OrgCard
                key={org.id}
                org={org}
                isAdmin={isAdmin}
                onEdit={() => setModal(org)}
                onDelete={() => {
                  if (confirm(`Hapus \"${org.name}\"?`)) deleteOrg(org.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
