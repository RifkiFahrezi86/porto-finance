import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Plus, Pencil, Trash2, Upload, ImageIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useData, type Project } from "./DataContext";

const ALL_CATEGORIES = [
  "Financial Analysis",
  "Capital Market",
  "Strategic Management",
  "Leadership",
  "Marketing",
  "Event Management",
];

type FormState = {
  title: string;
  category: string;
  desc: string;
  tagsRaw: string;
  imageUrl: string;
};

const emptyForm: FormState = {
  title: "",
  category: "Financial Analysis",
  desc: "",
  tagsRaw: "",
  imageUrl: "",
};

export function Projects() {
  const { projects, addProject, updateProject, deleteProject, isAdmin } = useData();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setShowForm(true);
  }

  function openEdit(p: Project, e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(p);
    setForm({
      title: p.title,
      category: p.category,
      desc: p.desc,
      tagsRaw: p.tags.join(", "),
      imageUrl: p.images[0] || "",
    });
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
      imageFile || form.imageUrl || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
    const tags = form.tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
    if (editing) {
      updateProject({ ...editing, title: form.title, category: form.category, desc: form.desc, tags, images: [finalImage] });
    } else {
      addProject({ title: form.title, category: form.category, desc: form.desc, tags, images: [finalImage] });
    }
    setShowForm(false);
  }

  const cardBg = "rgba(6, 23, 40, 0.8)";
  const cardBorder = "rgba(255,255,255,0.06)";

  return (
    <div className="min-h-screen py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between mb-10 sm:mb-12">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-[13px] tracking-[3px] uppercase mb-3">
              Project Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[32px] sm:text-[36px] md:text-[48px] tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Projects
            </motion.h1>
            <p className="text-white/40 text-[15px] max-w-xl">
              Dokumentasi proyek akademik, studi kasus, dan latihan analisis yang saya kerjakan selama menempuh studi Manajemen.
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
              <Plus size={15} /> Tambah Proyek
            </motion.button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="-mx-4 mb-10 overflow-x-auto pb-2 sm:mx-0">
          <div className="flex w-max gap-2 px-4 sm:px-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] border transition-all ${
                  filter === c
                    ? "bg-amber-400 text-black border-amber-400"
                    : "border-white/10 text-white/50 hover:border-amber-400/30 hover:text-white/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-xl overflow-hidden group border transition-all cursor-pointer"
                style={{
                  background: cardBg,
                  borderColor: cardBorder,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
                onClick={() => { setSelected(project); setImgIndex(0); }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <ImageWithFallback
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isAdmin && (
                    <div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => openEdit(project, e)}
                        className="flex items-center gap-1.5 bg-amber-400 text-black px-3 py-2 rounded-lg text-[12px] font-medium hover:bg-amber-300 transition-colors"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirm(project.id); }}
                        className="flex items-center gap-1.5 bg-red-500/90 text-white px-3 py-2 rounded-lg text-[12px] font-medium hover:bg-red-400 transition-colors"
                      >
                        <Trash2 size={13} /> Hapus
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-amber-400/80 text-[11px] tracking-[2px] uppercase mb-2">{project.category}</p>
                  <h3 className="text-[16px] mb-2 text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-[13px] leading-relaxed line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-white/30 bg-white/5 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
              className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
              style={{ background: "rgba(6,23,40,0.98)", borderColor: "rgba(251,191,36,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={selected.images[imgIndex]}
                  alt={selected.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors"
                >
                  <X size={18} />
                </button>
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIndex((i) => (i - 1 + selected.images.length) % selected.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setImgIndex((i) => (i + 1) % selected.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-2"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <p className="text-amber-400 text-[12px] tracking-[2px] uppercase mb-2">{selected.category}</p>
                <h2 className="text-[22px] mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{selected.title}</h2>
                <p className="text-white/50 text-[14px] leading-relaxed mb-4">{selected.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-[12px] text-amber-400/70 bg-amber-400/10 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
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
              <h3 className="text-[18px] mb-2">Hapus proyek?</h3>
              <p className="text-white/40 text-[14px] mb-6">Tindakan ini tidak bisa dibatalkan.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { deleteProject(deleteConfirm!); setDeleteConfirm(null); }}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-[14px] hover:bg-red-400 transition-colors"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 border border-white/10 rounded-lg text-[14px] text-white/50 hover:border-white/25 transition-colors"
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
                    {editing ? "Edit Proyek" : "Tambah Proyek Baru"}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Judul *</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      placeholder="Judul proyek"
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Kategori</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none"
                      style={{ background: "rgba(6,23,40,0.98)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {ALL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Deskripsi</label>
                    <textarea
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none resize-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      placeholder="Jelaskan proyek ini..."
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Tag (pisahkan dengan koma)</label>
                    <input
                      value={form.tagsRaw}
                      onChange={(e) => setForm({ ...form, tagsRaw: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      placeholder="Valuasi, Pasar Modal, Equity Research"
                      onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label className="text-[12px] text-white/50 mb-1.5 block uppercase tracking-wider">Gambar</label>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImageFile(null); }}
                      className="w-full rounded-lg px-4 py-2.5 text-[14px] text-white focus:outline-none transition-colors mb-2"
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
                    {(imageFile || form.imageUrl) && (
                      <div className="mt-3 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                        <img
                          src={imageFile || form.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                    )}
                    {!imageFile && !form.imageUrl && (
                      <div className="mt-3 rounded-xl aspect-[16/9] border border-dashed border-white/10 flex items-center justify-center">
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
                    {editing ? "Simpan Perubahan" : "Tambah Proyek"}
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
