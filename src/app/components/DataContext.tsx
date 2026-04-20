import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  university: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  github: string;
  location: string;
  photo: string;
  skills: { label: string; desc: string }[];
  stats: { num: string; label: string }[];
  education: { school: string; degree: string; period: string; desc: string }[];
}

export interface OrgEntry {
  id: number;
  name: string;
  acronym: string;
  role: string;
  period: string;
  desc: string;
  image: string;
  stats: { num: string; label: string }[];
  timeline: { year: string; role: string; desc: string }[];
  activities: { title: string; desc: string }[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  images: string[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  image: string;
}

function createPlaceholderImage(eyebrow: string, title: string) {
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const safeEyebrow = escapeXml(eyebrow.slice(0, 30));
  const safeTitle = escapeXml(title.slice(0, 42));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#03111f" />
          <stop offset="100%" stop-color="#0a2740" />
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
      <circle cx="1000" cy="160" r="180" fill="#fbbf24" fill-opacity="0.08" />
      <circle cx="220" cy="680" r="220" fill="#38bdf8" fill-opacity="0.08" />
      <rect x="80" y="96" width="190" height="34" rx="17" fill="#fbbf24" fill-opacity="0.14" stroke="#fbbf24" stroke-opacity="0.2" />
      <text x="112" y="118" fill="#fbbf24" font-family="Arial, sans-serif" font-size="18" letter-spacing="2">${safeEyebrow}</text>
      <text x="80" y="250" fill="#ffffff" font-family="Georgia, serif" font-size="60" font-weight="600">${safeTitle}</text>
      <text x="80" y="308" fill="#94a3b8" font-family="Arial, sans-serif" font-size="24">Personal finance portfolio content</text>
      <rect x="80" y="540" width="280" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="80" y="584" width="420" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="80" y="628" width="360" height="16" rx="8" fill="#ffffff" fill-opacity="0.08" />
      <rect x="820" y="470" width="70" height="170" rx="18" fill="#ffffff" fill-opacity="0.08" />
      <rect x="914" y="400" width="70" height="240" rx="18" fill="#ffffff" fill-opacity="0.12" />
      <rect x="1008" y="326" width="70" height="314" rx="18" fill="url(#accent)" />
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function projectPlaceholder(project: Pick<Project, "title" | "category">) {
  return createPlaceholderImage(project.category, project.title);
}

function certificatePlaceholder(certificate: Pick<Certificate, "title" | "issuer">) {
  return createPlaceholderImage(certificate.issuer, certificate.title);
}

function orgPlaceholder(org: Pick<OrgEntry, "name" | "acronym">) {
  return createPlaceholderImage(org.acronym || "Organization", org.name);
}

function isLegacyRemoteImage(value?: string) {
  return !value || value.includes("images.unsplash.com");
}

function normalizeProject(project: Project): Project {
  const firstImage = project.images?.[0];
  return {
    ...project,
    images: [isLegacyRemoteImage(firstImage) ? projectPlaceholder(project) : firstImage],
  };
}

function normalizeCertificate(certificate: Certificate): Certificate {
  return {
    ...certificate,
    image: isLegacyRemoteImage(certificate.image) ? certificatePlaceholder(certificate) : certificate.image,
  };
}

function normalizeOrg(org: OrgEntry): OrgEntry {
  return {
    ...org,
    image: isLegacyRemoteImage(org.image) ? orgPlaceholder(org) : org.image,
  };
}

const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: "Nama Anda",
  tagline: "Management Student - Finance & Capital Market",
  bio: "Mahasiswa Manajemen yang sedang mendalami pasar modal, analisis keuangan, dan pengembangan diri melalui kegiatan organisasi KSPM. Ruang ini adalah rekam jejak perjalanan akademik dan aktivitas saya.",
  university: "Universitas Anda",
  major: "Manajemen",
  year: "2022 - Sekarang",
  email: "email@mahasiswa.ac.id",
  phone: "+62 812 xxxx xxxx",
  linkedin: "linkedin.com/in/namaanda",
  instagram: "@namaanda",
  github: "",
  location: "Indonesia",
  photo: "",
  skills: [
    { label: "Financial Analysis", desc: "Analisis laporan keuangan, valuasi, dan pembacaan data bisnis" },
    { label: "Capital Market", desc: "Minat mendalam pada literasi investasi dan dinamika pasar modal" },
    { label: "Organization", desc: "Pengalaman aktif dalam pengelolaan program dan kerja tim organisasi" },
    { label: "Continuous Learning", desc: "Konsisten mengembangkan wawasan melalui proyek dan sertifikasi" },
  ],
  stats: [
    { num: "10+", label: "Proyek Akademik" },
    { num: "5+", label: "Sertifikat" },
    { num: "1", label: "Organisasi Aktif" },
    { num: "3", label: "Fokus Bidang" },
  ],
  education: [
    {
      school: "Universitas Anda",
      degree: "S1 Manajemen",
      period: "2022 - Sekarang",
      desc: "Fokus pada konsentrasi Keuangan dan Pasar Modal. IPK terkini: 3.xx/4.00",
    },
  ],
};

const DEFAULT_ORGS: OrgEntry[] = [
  {
    id: 1,
    name: "Kelompok Studi Pasar Modal",
    acronym: "KSPM",
    role: "Koordinator Divisi Edukasi",
    period: "2024 - Sekarang",
    desc: "Organisasi kemahasiswaan yang bertujuan meningkatkan literasi pasar modal di kalangan mahasiswa melalui seminar, workshop, dan simulasi trading.",
    image: orgPlaceholder({ name: "Kelompok Studi Pasar Modal", acronym: "KSPM" }),
    stats: [
      { num: "50+", label: "Anggota Aktif" },
      { num: "12+", label: "Event/Tahun" },
      { num: "3+", label: "Divisi" },
    ],
    timeline: [
      { year: "2024", role: "Anggota Baru", desc: "Bergabung sebagai anggota dan mengikuti program Sekolah Pasar Modal." },
      { year: "2025", role: "Staff Divisi Edukasi", desc: "Menjadi staff aktif di divisi edukasi, membantu menyusun materi pembelajaran pasar modal." },
      { year: "2026", role: "Koordinator Divisi Edukasi", desc: "Dipercaya sebagai koordinator yang mengelola program edukasi dan event KSPM." },
    ],
    activities: [
      { title: "Sekolah Pasar Modal", desc: "Program edukasi rutin untuk anggota baru tentang dasar-dasar investasi dan analisis saham." },
      { title: "Stock Trading Competition", desc: "Kompetisi trading saham virtual antar anggota untuk mengasah kemampuan analisis." },
      { title: "Company Visit", desc: "Kunjungan ke perusahaan sekuritas dan Bursa Efek Indonesia untuk pembelajaran langsung." },
      { title: "Seminar & Workshop Investasi", desc: "Mengadakan seminar terbuka dengan pembicara dari industri keuangan dan pasar modal." },
    ],
  },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Analisis Fundamental Saham BBCA",
    category: "Financial Analysis",
    desc: "Melakukan analisis fundamental mendalam terhadap saham Bank Central Asia (BBCA), termasuk rasio keuangan, valuasi intrinsik, dan rekomendasi investasi.",
    tags: ["Valuasi", "Rasio Keuangan", "Equity Research"],
    images: [projectPlaceholder({ title: "Analisis Fundamental Saham BBCA", category: "Financial Analysis" })],
  },
  {
    id: 2,
    title: "Portfolio Investment Simulation",
    category: "Capital Market",
    desc: "Simulasi portofolio investasi dengan alokasi aset optimal menggunakan teori Markowitz. Meliputi analisis risiko dan return dari berbagai instrumen investasi.",
    tags: ["Portfolio Theory", "Risk Analysis", "Asset Allocation"],
    images: [projectPlaceholder({ title: "Portfolio Investment Simulation", category: "Capital Market" })],
  },
  {
    id: 3,
    title: "Business Strategy for SME",
    category: "Strategic Management",
    desc: "Pengembangan strategi bisnis untuk UMKM lokal menggunakan analisis SWOT, Porter's Five Forces, dan Business Model Canvas untuk meningkatkan daya saing.",
    tags: ["SWOT", "Porter's Five Forces", "BMC"],
    images: [projectPlaceholder({ title: "Business Strategy for SME", category: "Strategic Management" })],
  },
  {
    id: 4,
    title: "Team Building Workshop",
    category: "Leadership",
    desc: "Merancang dan memimpin workshop team building untuk organisasi kampus, mengembangkan keterampilan komunikasi dan kerja sama tim.",
    tags: ["Leadership", "Communication", "Workshop"],
    images: [projectPlaceholder({ title: "Team Building Workshop", category: "Leadership" })],
  },
  {
    id: 5,
    title: "Digital Marketing Campaign",
    category: "Marketing",
    desc: "Merancang kampanye digital marketing untuk event KSPM, termasuk strategi konten sosial media, analisis audience, dan pengukuran ROI.",
    tags: ["Social Media", "Content Strategy", "ROI Analysis"],
    images: [projectPlaceholder({ title: "Digital Marketing Campaign", category: "Marketing" })],
  },
  {
    id: 6,
    title: "Seminar Investasi untuk Pemula",
    category: "Event Management",
    desc: "Mengelola seminar investasi untuk mahasiswa dengan 200+ peserta. Meliputi perencanaan, koordinasi speaker, dan evaluasi event.",
    tags: ["Event Planning", "Coordination", "Public Speaking"],
    images: [projectPlaceholder({ title: "Seminar Investasi untuk Pemula", category: "Event Management" })],
  },
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "Capital Market School (SPM) Level 1",
    issuer: "Bursa Efek Indonesia (BEI)",
    date: "Maret 2025",
    desc: "Sertifikasi dasar pasar modal yang mencakup pengetahuan tentang instrumen investasi, mekanisme perdagangan, dan regulasi pasar modal Indonesia.",
    image: certificatePlaceholder({ title: "Capital Market School (SPM) Level 1", issuer: "Bursa Efek Indonesia (BEI)" }),
  },
  {
    id: 2,
    title: "Financial Modeling & Valuation",
    issuer: "KSPM University",
    date: "Juni 2025",
    desc: "Pelatihan intensif tentang financial modeling menggunakan Excel, termasuk DCF valuation, comparable analysis, dan precedent transactions.",
    image: certificatePlaceholder({ title: "Financial Modeling & Valuation", issuer: "KSPM University" }),
  },
  {
    id: 3,
    title: "Google Project Management Certificate",
    issuer: "Google via Coursera",
    date: "September 2025",
    desc: "Program sertifikasi profesional yang mencakup project initiation, planning, execution, dan closing menggunakan metodologi Agile dan Waterfall.",
    image: certificatePlaceholder({ title: "Google Project Management Certificate", issuer: "Google via Coursera" }),
  },
  {
    id: 4,
    title: "Leadership & Organizational Management",
    issuer: "BEM Fakultas Ekonomi",
    date: "November 2025",
    desc: "Workshop intensif tentang kepemimpinan organisasi, manajemen konflik, dan pengembangan tim yang efektif.",
    image: certificatePlaceholder({ title: "Leadership & Organizational Management", issuer: "BEM Fakultas Ekonomi" }),
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    issuer: "Google Digital Garage",
    date: "Januari 2026",
    desc: "Sertifikasi dasar digital marketing mencakup SEO, SEM, social media marketing, email marketing, dan analytics.",
    image: certificatePlaceholder({ title: "Digital Marketing Fundamentals", issuer: "Google Digital Garage" }),
  },
];

type PortfolioSnapshot = {
  personalInfo: PersonalInfo;
  orgs: OrgEntry[];
  projects: Project[];
  certificates: Certificate[];
};

function mergePersonalInfo(remote?: Partial<PersonalInfo>): PersonalInfo {
  return {
    ...DEFAULT_PERSONAL_INFO,
    ...remote,
    skills: Array.isArray(remote?.skills) ? remote.skills : DEFAULT_PERSONAL_INFO.skills,
    stats: Array.isArray(remote?.stats) ? remote.stats : DEFAULT_PERSONAL_INFO.stats,
    education: Array.isArray(remote?.education) ? remote.education : DEFAULT_PERSONAL_INFO.education,
  };
}

function mergePortfolioSnapshot(remote?: Partial<PortfolioSnapshot> | null): PortfolioSnapshot {
  return {
    personalInfo: mergePersonalInfo(remote?.personalInfo),
    orgs: Array.isArray(remote?.orgs) ? remote.orgs.map(normalizeOrg) : DEFAULT_ORGS.map(normalizeOrg),
    projects: Array.isArray(remote?.projects) ? remote.projects.map(normalizeProject) : DEFAULT_PROJECTS.map(normalizeProject),
    certificates: Array.isArray(remote?.certificates)
      ? remote.certificates.map(normalizeCertificate)
      : DEFAULT_CERTIFICATES.map(normalizeCertificate),
  };
}

function createPortfolioSnapshot(
  personalInfo: PersonalInfo,
  orgs: OrgEntry[],
  projects: Project[],
  certificates: Certificate[],
): PortfolioSnapshot {
  return { personalInfo, orgs, projects, certificates };
}

function clonePortfolioSnapshot(snapshot: PortfolioSnapshot): PortfolioSnapshot {
  return {
    personalInfo: {
      ...snapshot.personalInfo,
      skills: snapshot.personalInfo.skills.map((skill) => ({ ...skill })),
      stats: snapshot.personalInfo.stats.map((stat) => ({ ...stat })),
      education: snapshot.personalInfo.education.map((education) => ({ ...education })),
    },
    orgs: snapshot.orgs.map((org) => ({
      ...org,
      stats: org.stats.map((stat) => ({ ...stat })),
      timeline: org.timeline.map((item) => ({ ...item })),
      activities: org.activities.map((activity) => ({ ...activity })),
    })),
    projects: snapshot.projects.map((project) => ({
      ...project,
      tags: [...project.tags],
      images: [...project.images],
    })),
    certificates: snapshot.certificates.map((certificate) => ({ ...certificate })),
  };
}

function isImageDataUrl(value?: string) {
  return typeof value === "string" && value.startsWith("data:image/");
}

function sanitizeUploadName(value: string) {
  const cleaned = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return cleaned || "image";
}

async function fetchRemotePortfolio(): Promise<PortfolioSnapshot | null> {
  try {
    const response = await fetch("/api/portfolio", { cache: "no-store" });
    if (!response.ok) return null;
    const payload = await response.json();
    return mergePortfolioSnapshot(payload.data ?? payload);
  } catch {
    return null;
  }
}

async function saveRemotePortfolio(snapshot: PortfolioSnapshot) {
  const response = await fetch("/api/portfolio", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });

  if (!response.ok) {
    throw new Error("Failed to save portfolio snapshot");
  }
}

async function uploadImageDataUrl(dataUrl: string, folder: string, filename: string) {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dataUrl,
      folder,
      filename,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const payload = await response.json();
  return payload.url as string;
}

async function resolvePortfolioUploads(snapshot: PortfolioSnapshot): Promise<PortfolioSnapshot> {
  const nextSnapshot = clonePortfolioSnapshot(snapshot);
  let changed = false;

  if (isImageDataUrl(nextSnapshot.personalInfo.photo)) {
    nextSnapshot.personalInfo.photo = await uploadImageDataUrl(
      nextSnapshot.personalInfo.photo,
      "profiles",
      sanitizeUploadName(nextSnapshot.personalInfo.name || "profile-photo"),
    );
    changed = true;
  }

  for (const org of nextSnapshot.orgs) {
    if (isImageDataUrl(org.image)) {
      org.image = await uploadImageDataUrl(
        org.image,
        "organizations",
        sanitizeUploadName(org.name || `organization-${org.id}`),
      );
      changed = true;
    }
  }

  for (const project of nextSnapshot.projects) {
    for (let index = 0; index < project.images.length; index += 1) {
      if (!isImageDataUrl(project.images[index])) continue;
      project.images[index] = await uploadImageDataUrl(
        project.images[index],
        "projects",
        sanitizeUploadName(`${project.title || "project"}-${index + 1}`),
      );
      changed = true;
    }
  }

  for (const certificate of nextSnapshot.certificates) {
    if (!isImageDataUrl(certificate.image)) continue;
    certificate.image = await uploadImageDataUrl(
      certificate.image,
      "certificates",
      sanitizeUploadName(certificate.title || `certificate-${certificate.id}`),
    );
    changed = true;
  }

  return changed ? nextSnapshot : snapshot;
}

interface DataContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  orgs: OrgEntry[];
  addOrg: (o: Omit<OrgEntry, "id">) => void;
  updateOrg: (o: OrgEntry) => void;
  deleteOrg: (id: number) => void;
  projects: Project[];
  certificates: Certificate[];
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: number) => void;
  addCertificate: (c: Omit<Certificate, "id">) => void;
  updateCertificate: (c: Certificate) => void;
  deleteCertificate: (id: number) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const s = localStorage.getItem("pf_personal");
      return s ? { ...DEFAULT_PERSONAL_INFO, ...JSON.parse(s) } : DEFAULT_PERSONAL_INFO;
    } catch {
      return DEFAULT_PERSONAL_INFO;
    }
  });

  const [orgs, setOrgs] = useState<OrgEntry[]>(() => {
    try {
      const s = localStorage.getItem("pf_orgs");
      return s ? JSON.parse(s).map(normalizeOrg) : DEFAULT_ORGS.map(normalizeOrg);
    } catch {
      return DEFAULT_ORGS.map(normalizeOrg);
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const s = localStorage.getItem("pf_projects");
      return s ? JSON.parse(s).map(normalizeProject) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const s = localStorage.getItem("pf_certificates");
      return s ? JSON.parse(s).map(normalizeCertificate) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem("pf_admin_mode") === "true";
    } catch {
      return false;
    }
  });
  const [storageMode, setStorageMode] = useState<"local" | "remote">("local");
  const [remoteHydrated, setRemoteHydrated] = useState(false);
  const lastRemoteSignatureRef = useRef("");
  const syncJobRef = useRef(0);

  useEffect(() => {
    let isActive = true;

    (async () => {
      const remoteSnapshot = await fetchRemotePortfolio();
      if (!isActive) return;

      if (remoteSnapshot) {
        setPersonalInfo(remoteSnapshot.personalInfo);
        setOrgs(remoteSnapshot.orgs);
        setProjects(remoteSnapshot.projects);
        setCertificates(remoteSnapshot.certificates);
        lastRemoteSignatureRef.current = JSON.stringify(remoteSnapshot);
        setStorageMode("remote");
      }

      setRemoteHydrated(true);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("pf_personal", JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem("pf_orgs", JSON.stringify(orgs));
  }, [orgs]);

  useEffect(() => {
    localStorage.setItem("pf_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("pf_certificates", JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem("pf_admin_mode", String(isAdmin));
  }, [isAdmin]);

  const portfolioSignature = JSON.stringify(createPortfolioSnapshot(personalInfo, orgs, projects, certificates));

  useEffect(() => {
    if (!remoteHydrated || storageMode !== "remote" || portfolioSignature === lastRemoteSignatureRef.current) {
      return;
    }

    const syncJob = ++syncJobRef.current;
    const snapshot = createPortfolioSnapshot(personalInfo, orgs, projects, certificates);
    const timeoutId = window.setTimeout(() => {
      (async () => {
        try {
          const preparedSnapshot = await resolvePortfolioUploads(snapshot);
          if (syncJob !== syncJobRef.current) return;

          await saveRemotePortfolio(preparedSnapshot);
          if (syncJob !== syncJobRef.current) return;

          const preparedSignature = JSON.stringify(preparedSnapshot);
          lastRemoteSignatureRef.current = preparedSignature;

          if (preparedSignature !== portfolioSignature) {
            setPersonalInfo(preparedSnapshot.personalInfo);
            setOrgs(preparedSnapshot.orgs);
            setProjects(preparedSnapshot.projects);
            setCertificates(preparedSnapshot.certificates);
          }
        } catch (error) {
          console.error("Remote portfolio sync failed", error);
        }
      })();
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [personalInfo, orgs, projects, certificates, portfolioSignature, remoteHydrated, storageMode]);

  const updatePersonalInfo = (info: PersonalInfo) => setPersonalInfo(info);

  const addOrg = (o: Omit<OrgEntry, "id">) =>
    setOrgs((prev) => [...prev, normalizeOrg({ ...o, id: Date.now() })]);
  const updateOrg = (o: OrgEntry) =>
    setOrgs((prev) => prev.map((x) => (x.id === o.id ? normalizeOrg(o) : x)));
  const deleteOrg = (id: number) =>
    setOrgs((prev) => prev.filter((x) => x.id !== id));

  const addProject = (p: Omit<Project, "id">) =>
    setProjects((prev) => [...prev, { ...p, id: Date.now() }]);

  const updateProject = (p: Project) =>
    setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)));

  const deleteProject = (id: number) =>
    setProjects((prev) => prev.filter((x) => x.id !== id));

  const addCertificate = (c: Omit<Certificate, "id">) =>
    setCertificates((prev) => [...prev, { ...c, id: Date.now() }]);

  const updateCertificate = (c: Certificate) =>
    setCertificates((prev) => prev.map((x) => (x.id === c.id ? c : x)));

  const deleteCertificate = (id: number) =>
    setCertificates((prev) => prev.filter((x) => x.id !== id));

  const toggleAdmin = () => setIsAdmin((v) => !v);

  return (
    <DataContext.Provider
      value={{
        personalInfo,
        updatePersonalInfo,
        orgs,
        addOrg,
        updateOrg,
        deleteOrg,
        projects,
        certificates,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        isAdmin,
        toggleAdmin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
