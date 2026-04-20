import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, X, Calendar, Plus, Pencil, Trash2, Upload, ImageIcon, Building2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useData, type Certificate } from "./DataContext";

type FormState = {
  title: string;
  issuer: string;
  date: string;
  desc: string;
  imageUrl: string;
};

const emptyForm: FormState = {
  title: "",
  issuer: "",
  date: "",
  desc: "",
  imageUrl: "",
};

export function Certificates() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, isAdmin } = useData();
  const [selected, setSelected] = useState<Certificate | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setShowForm(true);
  }

  function openEdit(c: Certificate, e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(c);
    setForm({ title: c.title, issuer: c.issuer, date: c.date, desc: c.desc, imageUrl: c.image });
    setImageFile(null);
    setShowForm(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageFile(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!form.title.trim()) return;
    const finalImage =
      imageFile || form.imageUrl || "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=800&q=80";
    if (editing) {
      updateCertificate({ ...editing, title: form.title, issuer: form.issuer, date: form.date, desc: form.desc, image: finalImage });
    } else {
      addCertificate({ title: form.title, issuer: form.issuer, date: form.date, desc: form.desc, image: finalImage });
    }
    setShowForm(false);
  }

  const cardBg = "rgba(6, 23, 40, 0.8)";

  return (
    <div className="min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between mb-10 sm:mb-12">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-3">
              Certification Record
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[32px] sm:text-[36px] md:text-[48px] tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Certificates
            </motion.h1>
            <p className="text-white/40 text-[15px] max-w-xl">
              Kumpulan sertifikat, pelatihan, dan pencapaian yang relevan dengan arah pengembangan saya di bidang manajemen dan finance.
            </p>
          </div>
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={openAdd}
              className="flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] text-black font-medium transition-all hover:scale-105 md:mt-8 shrink-0"
              style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}
            >
              <Plus size={15} /> Tambah Sertifikat
            </motion.button>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl overflow-hidden cursor-pointer group border transition-all"
              style={{
                background: cardBg,
                borderColor: "rgba(255,255,255,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              onClick={() => setSelected(cert)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <ImageWithFallback
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 rounded-full p-2"
                  style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}>
                  <Award size={15} className="text-black" />
                </div>
                {isAdmin && (
                  <div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => openEdit(cert, e)}
                      className="flex items-center gap-1.5 bg-amber-400 text-black px-3 py-2 rounded-lg text-[12px] font-medium hover:bg-amber-300 transition-colors"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm(cert.id); }}
                      className="flex items-center gap-1.5 bg-red-500/90 text-white px-3 py-2 rounded-lg text-[12px] font-medium hover:bg-red-400 transition-colors"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[15px] mb-1 text-white/90 group-hover:text-white transition-colors">{cert.title}</h3>
                <div className="flex items-center gap-1.5 text-white/40 text-[13px] mb-1">
                  <Building2 size={12} />
                  {cert.issuer}
                </div>
                <div className="flex items-center gap-1.5 text-white/25 text-[12px]">
                  <Calendar size={12} />
                  {cert.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl max-w-lg w-full overflow-hidden border"
              style={{ background: "rgba(6,23,40,0.98)", borderColor: "rgba(251,191,36,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ImageWithFallback
                  src={selected.image}
                  alt={selected.title}
                  className="w-full aspect-[16/10] object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={17} className="text-amber-400" />
                  <p className="text-amber-400 text-[12px] tracking-[2px] uppercase">{selected.issuer}</p>
                </div>
                <h2 className="text-[20px] mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                  {selected.title}
                </h2>
                <p className="text-white/30 text-[13px] mb-4 flex items-center gap-1.5">
                  <Calendar size={13} /> {selected.date}
                </p>
                <p className="text-white/50 text-[14px] leading-relaxed">{selected.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="rounded-2xl p-6 max-w-sm w-full border"
              style={{ background: "rgba(6,23,40,0.98)", borderColor: "rgba(255,255,255,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[18px] mb-2">Hapus sertifikat?</h3>
              <p className="text-white/40 text-[14px] mb-6">Tindakan ini tidak bisa dibatalkan.</p>
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={() => { deleteCertificate(deleteConfirm!); setDeleteConfirm(null); }}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-[14px] hover:bg-red-400 transition-colors"
                >
                  Hapus
                </button>
                  <button
                  onClick={() => setDeleteConfirm(null)}
                    className="w-full sm:w-auto px-5 border border-white/10 rounded-lg text-[14px] text-white/50 hover:border-white/25 transition-colors"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add / Edit form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border"
              style={{ background: "rgba(6,23,40,0.98)", borderColor: "rgba(251,191,36,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                    {editing ? "Edit Sertifikat" : "Tambah Sertifikat Baru"}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {(["title", "issuer", "date", "desc"] as const).map((field) => {
                    const labels: Record<string, string> = {
                      title: "Judul *",
                      issuer: "Penerbit / Organisasi",
                      date: "Tanggal (mis. Maret 2025)",
                      desc: "Deskripsi",
                    };
                    return (
                      <div key={field}>
                        <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">
                          {labels[field]}
                        </label>
                        {field === "desc" ? (
                          <textarea
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            rows={3}
                            className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none resize-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                            placeholder={field === "desc" ? "Tambahkan deskripsi sertifikat" : "Isi data sertifikat"}
                            onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          />
                        ) : (
                          <input
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                            placeholder="Isi data sertifikat"
                            onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                          />
                        )}
                      </div>
                    );
                  })}

                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Gambar</label>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImageFile(null); }}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none mb-2"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      placeholder="https://url-gambar.com/foto.jpg"
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-white/40 hover:text-amber-400 transition-colors w-fit">
                      <Upload size={13} />
                      Upload dari perangkat
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    {(imageFile || form.imageUrl) ? (
                      <div className="mt-3 rounded-xl overflow-hidden aspect-[4/3] border border-white/10">
                        <img
                          src={imageFile || form.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    ) : (
                      <div className="mt-3 rounded-xl aspect-[4/3] border border-dashed border-white/10 flex items-center justify-center">
                        <div className="text-center text-white/25">
                          <ImageIcon size={24} className="mx-auto mb-2" />
                          <p className="text-[12px]">Belum ada gambar</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 rounded-lg text-[14px] text-black font-medium transition-all hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #FBBF24, #F59E0B)" }}
                  >
                    {editing ? "Simpan Perubahan" : "Tambah Sertifikat"}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-full sm:w-auto px-5 border border-white/10 rounded-lg text-[14px] text-white/50 hover:border-white/25 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
