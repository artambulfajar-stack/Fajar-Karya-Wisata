import React, { useState, useRef } from 'react';
import {
  TourPackage,
  ServiceItem,
  PromoItem,
  TestimonialItem,
  GalleryPhoto,
} from '../../types/travel';
import { CompanySettings } from '../../types/dashboard';
import {
  Save,
  Check,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Compass,
  Tag,
  Star,
  Layers,
  Building,
  Info,
  X,
  Camera,
  Upload,
  Link,
  RotateCcw,
  Image as ImageIcon,
  MapPin,
} from 'lucide-react';
import heroBromo from '../../assets/images/hero_travel_bromo_1791223504621.jpg';
import tourBus from '../../assets/images/tour_bus_fleet_1791223520045.jpg';
import studyTour from '../../assets/images/study_tour_students_1791223533857.jpg';
import familyBatu from '../../assets/images/family_vacation_batu_1791223546638.jpg';

interface WebsiteCMSTabProps {
  settings: CompanySettings;
  onSaveSettings: (s: CompanySettings) => void;
  packages: TourPackage[];
  onSavePackages: (pkgs: TourPackage[]) => void;
  services: ServiceItem[];
  onSaveServices: (srvs: ServiceItem[]) => void;
  promos: PromoItem[];
  onSavePromos: (prms: PromoItem[]) => void;
  testimonials: TestimonialItem[];
  onSaveTestimonials: (testis: TestimonialItem[]) => void;
  gallery: GalleryPhoto[];
  onSaveGallery: (photos: GalleryPhoto[]) => void;
}

export const WebsiteCMSTab: React.FC<WebsiteCMSTabProps> = ({
  settings,
  onSaveSettings,
  packages,
  onSavePackages,
  services,
  onSaveServices,
  promos,
  onSavePromos,
  testimonials,
  onSaveTestimonials,
  gallery,
  onSaveGallery,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'hero' | 'about' | 'packages' | 'gallery' | 'services' | 'promos' | 'testimonials'
  >('hero');

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3500);
  };

  // State for editing Hero & About (includes photo URLs)
  const [heroForm, setHeroForm] = useState({
    companyName: settings.companyName,
    tagline: settings.tagline,
    headline: settings.headline,
    heroImageUrl: settings.heroImageUrl || heroBromo,
    aboutImageUrl: settings.aboutImageUrl || tourBus,
  });

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);
  const packageFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // State for editing a Tour Package
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [packageCustomUrl, setPackageCustomUrl] = useState('');

  // State for editing a Promo
  const [editingPromo, setEditingPromo] = useState<PromoItem | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // State for editing a Testimonial
  const [editingTesti, setEditingTesti] = useState<TestimonialItem | null>(null);
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);

  // State for editing Gallery
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryCustomUrl, setGalleryCustomUrl] = useState('');

  // Helper file reader
  const handleReadFile = (file: File, onSuccess: (base64: string) => void) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onSuccess(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handlers for Hero & About
  const handleSaveHeroAndAbout = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...settings,
      companyName: heroForm.companyName,
      tagline: heroForm.tagline,
      headline: heroForm.headline,
      heroImageUrl: heroForm.heroImageUrl,
      aboutImageUrl: heroForm.aboutImageUrl,
    });
    showToast('Tampilan Beranda, Slogan, dan Foto Utama berhasil diperbarui di website!');
  };

  // Handlers for Package
  const handleSavePackage = (pkg: TourPackage) => {
    if (packages.some((p) => p.id === pkg.id)) {
      onSavePackages(packages.map((p) => (p.id === pkg.id ? pkg : p)));
      showToast('Paket wisata dan foto berhasil diperbarui!');
    } else {
      onSavePackages([pkg, ...packages]);
      showToast('Paket wisata baru berhasil ditambahkan ke website!');
    }
    setIsPkgModalOpen(false);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Yakin ingin menghapus paket wisata ini dari website?')) {
      onSavePackages(packages.filter((p) => p.id !== id));
      showToast('Paket wisata telah dihapus.');
    }
  };

  // Handlers for Gallery
  const handleSaveGalleryPhoto = (photo: GalleryPhoto) => {
    if (gallery.some((g) => g.id === photo.id)) {
      onSaveGallery(gallery.map((g) => (g.id === photo.id ? photo : g)));
      showToast('Foto dokumentasi galeri berhasil diperbarui!');
    } else {
      onSaveGallery([photo, ...gallery]);
      showToast('Foto baru berhasil diunggah ke Galeri Dokumentasi!');
    }
    setIsGalleryModalOpen(false);
  };

  const handleDeleteGalleryPhoto = (id: string) => {
    if (confirm('Yakin ingin menghapus foto ini dari galeri?')) {
      onSaveGallery(gallery.filter((g) => g.id !== id));
      showToast('Foto galeri telah dihapus.');
    }
  };

  // Handlers for Promo
  const handleSavePromo = (promo: PromoItem) => {
    if (promos.some((p) => p.id === promo.id)) {
      onSavePromos(promos.map((p) => (p.id === promo.id ? promo : p)));
      showToast('Promo berhasil diperbarui!');
    } else {
      onSavePromos([promo, ...promos]);
      showToast('Promo baru berhasil ditambahkan!');
    }
    setIsPromoModalOpen(false);
  };

  const handleDeletePromo = (id: string) => {
    if (confirm('Yakin ingin menghapus voucher promo ini?')) {
      onSavePromos(promos.filter((p) => p.id !== id));
      showToast('Promo telah dihapus.');
    }
  };

  // Handlers for Testimonials
  const handleSaveTesti = (testi: TestimonialItem) => {
    if (testimonials.some((t) => t.id === testi.id)) {
      onSaveTestimonials(testimonials.map((t) => (t.id === testi.id ? testi : t)));
      showToast('Testimoni berhasil diperbarui!');
    } else {
      onSaveTestimonials([testi, ...testimonials]);
      showToast('Testimoni baru berhasil ditambahkan!');
    }
    setIsTestiModalOpen(false);
  };

  const handleDeleteTesti = (id: string) => {
    if (confirm('Yakin ingin menghapus testimoni ini?')) {
      onSaveTestimonials(testimonials.filter((t) => t.id !== id));
      showToast('Testimoni telah dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Kustomisasi Konten & Foto Website (CMS)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Admin dapat merubah seluruh teks, paket wisata, promo, serta mengunggah foto kustom untuk Hero, Tentang Kami, Paket, dan Galeri Dokumentasi.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Subtab Segmented Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'hero'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-amber-600" />
          <span>Beranda & Foto Utama</span>
        </button>

        <button
          onClick={() => setActiveSubTab('packages')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'packages'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Paket Wisata ({packages.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('gallery')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'gallery'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-amber-600" />
          <span>Galeri Foto ({gallery.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('services')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'services'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>Layanan ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('promos')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'promos'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          <span>Promo & Voucher ({promos.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('testimonials')}
          className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'testimonials'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-600" />
          <span>Testimoni ({testimonials.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: HERO, ABOUT, & MAIN PHOTOS */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveHeroAndAbout} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 max-w-4xl">
          <div className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-600" />
              <span>Kustomisasi Teks & Foto Utama Beranda</span>
            </div>
            <span className="text-[11px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Perubahan Langsung Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Brand / Perusahaan
              </label>
              <input
                type="text"
                required
                value={heroForm.companyName}
                onChange={(e) => setHeroForm({ ...heroForm, companyName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Slogan Komitmen (Tagline)
              </label>
              <input
                type="text"
                required
                value={heroForm.tagline}
                onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Judul Headline Utama (Hero Title)
            </label>
            <input
              type="text"
              required
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>

          {/* FOTO 1: HERO BACKGROUND IMAGE */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Foto Sampul Utama (Hero Background)
              </label>
              <button
                type="button"
                onClick={() => setHeroForm({ ...heroForm, heroImageUrl: heroBromo })}
                className="text-[11px] text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ke Bromo Default</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-slate-300 shadow-sm shrink-0 bg-slate-200">
                <img
                  src={heroForm.heroImageUrl}
                  alt="Pratinjau Hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[10px] py-0.5 text-center font-medium">
                  Pratinjau Hero
                </div>
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                <input
                  type="file"
                  ref={heroFileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleReadFile(f, (url) => setHeroForm({ ...heroForm, heroImageUrl: url }));
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => heroFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Foto Hero dari Komputer / HP</span>
                </button>

                <div className="relative">
                  <Link className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="url"
                    placeholder="Atau tempel URL gambar latar (https://...)"
                    value={heroForm.heroImageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImageUrl: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOTO 2: ABOUT US IMAGE */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Foto Section "Tentang Kami" (Armada / Profil)
              </label>
              <button
                type="button"
                onClick={() => setHeroForm({ ...heroForm, aboutImageUrl: tourBus })}
                className="text-[11px] text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ke Armada Bus Default</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-slate-300 shadow-sm shrink-0 bg-slate-200">
                <img
                  src={heroForm.aboutImageUrl}
                  alt="Pratinjau Tentang Kami"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[10px] py-0.5 text-center font-medium">
                  Pratinjau Tentang Kami
                </div>
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                <input
                  type="file"
                  ref={aboutFileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleReadFile(f, (url) => setHeroForm({ ...heroForm, aboutImageUrl: url }));
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => aboutFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Foto Profil dari Komputer / HP</span>
                </button>

                <div className="relative">
                  <Link className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="url"
                    placeholder="Atau tempel URL gambar profil (https://...)"
                    value={heroForm.aboutImageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, aboutImageUrl: e.target.value })}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Teks & Foto Beranda</span>
            </button>
          </div>
        </form>
      )}

      {/* SUBTAB 2: TOUR PACKAGES CRUD (WITH PHOTO UPLOAD) */}
      {activeSubTab === 'packages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Admin dapat menambah paket baru, merubah harga per pax, fasilitas, serta mengganti/mengunggah foto paket wisata.
            </div>
            <button
              onClick={() => {
                setEditingPackage({
                  id: `pkg-${Date.now()}`,
                  title: 'Paket Wisata Baru',
                  category: 'keluarga',
                  categoryLabel: 'Wisata Keluarga',
                  duration: '3 Hari 2 Malam (3D2N)',
                  destination: 'Malang & Batu',
                  highlights: ['Destinasi 1', 'Destinasi 2', 'Destinasi 3'],
                  startingPrice: 'Mulai Rp 1.250.000',
                  priceNote: 'per peserta',
                  image: familyBatu,
                  description: 'Deskripsi paket wisata baru yang nyaman dan terencana.',
                  itinerary: [
                    { day: 1, title: 'Hari Pertama', activities: ['Penjemputan', 'Eksplorasi wisata'] },
                  ],
                  included: ['Transportasi AC', 'Hotel terstandar', 'Makan harian', 'Tiket masuk'],
                  excluded: ['Pengeluaran pribadi'],
                  recommendedPax: 'Min. 10 Orang',
                });
                setIsPkgModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Paket Wisata</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {pkg.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{pkg.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{pkg.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">Harga Mulai</div>
                      <div className="text-xs font-bold text-amber-600 font-mono">{pkg.startingPrice}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingPackage(pkg);
                          setIsPkgModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50"
                        title="Edit Paket & Ganti Foto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Hapus Paket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Edit Package dengan Upload Foto */}
          {isPkgModalOpen && editingPackage && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900">Edit / Tambah Paket Wisata</h3>
                  <button onClick={() => setIsPkgModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold mb-1">Judul Paket</label>
                    <input
                      type="text"
                      value={editingPackage.title}
                      onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Foto Paket dengan Upload & URL */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="block font-bold text-slate-800">
                      Foto Paket Wisata (Bisa Upload dari HP/Laptop)
                    </label>
                    <div className="flex gap-3 items-center">
                      <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={editingPackage.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="file"
                          ref={packageFileInputRef}
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleReadFile(f, (url) => setEditingPackage({ ...editingPackage, image: url }));
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => packageFileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Pilih Foto dari Galeri / Komputer</span>
                        </button>

                        <div className="flex gap-1.5">
                          <input
                            type="url"
                            placeholder="Atau tempel tautan URL foto"
                            value={packageCustomUrl}
                            onChange={(e) => setPackageCustomUrl(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs border rounded-lg bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (packageCustomUrl.trim()) {
                                setEditingPackage({ ...editingPackage, image: packageCustomUrl.trim() });
                                setPackageCustomUrl('');
                              }
                            }}
                            className="px-2.5 py-1 bg-slate-800 text-white rounded-lg font-medium"
                          >
                            Terapkan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Kategori</label>
                      <select
                        value={editingPackage.category}
                        onChange={(e) =>
                          setEditingPackage({
                            ...editingPackage,
                            category: e.target.value as any,
                            categoryLabel: e.target.options[e.target.selectedIndex].text,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg bg-white"
                      >
                        <option value="keluarga">Wisata Keluarga</option>
                        <option value="study-tour">Study Tour</option>
                        <option value="group">Wisata Group & Gathering</option>
                        <option value="custom">Custom Trip</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Durasi</label>
                      <input
                        type="text"
                        value={editingPackage.duration}
                        onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Destinasi</label>
                      <input
                        type="text"
                        value={editingPackage.destination}
                        onChange={(e) => setEditingPackage({ ...editingPackage, destination: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Harga Mulai Dari</label>
                      <input
                        type="text"
                        value={editingPackage.startingPrice}
                        onChange={(e) => setEditingPackage({ ...editingPackage, startingPrice: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Deskripsi Singkat Paket</label>
                    <textarea
                      rows={3}
                      value={editingPackage.description}
                      onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setIsPkgModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSavePackage(editingPackage)}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                  >
                    Simpan Paket Wisata
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: GALLERY PHOTOS MANAGER (UPLOAD & CUSTOMIZE) */}
      {activeSubTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Manajemen Foto Galeri Perjalanan</h3>
              <p className="text-xs text-slate-500">
                Admin dapat mengunggah foto kegiatan armada, destinasi, dan study tour yang langsung tampil di section Galeri website.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingPhoto({
                  id: `gal-${Date.now()}`,
                  title: 'Foto Dokumentasi Baru',
                  category: 'armada',
                  categoryLabel: 'Armada Bus',
                  image: tourBus,
                  location: 'Jawa Timur',
                  caption: 'Dokumentasi perjalanan wisata PT Fajar Karya Wisata.',
                });
                setIsGalleryModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Upload Foto Galeri Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded capitalize">
                    {photo.category}
                  </div>
                </div>

                <div className="p-3 space-y-1.5">
                  <div className="font-bold text-xs text-slate-900 line-clamp-1">{photo.title}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="line-clamp-1">{photo.location}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setEditingPhoto(photo);
                        setIsGalleryModalOpen(true);
                      }}
                      className="text-amber-700 hover:text-amber-900 font-semibold text-[11px] flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit / Ganti Foto</span>
                    </button>
                    <button
                      onClick={() => handleDeleteGalleryPhoto(photo.id)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Upload & Edit Foto Galeri */}
          {isGalleryModalOpen && editingPhoto && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900">Upload & Edit Foto Galeri</h3>
                  <button onClick={() => setIsGalleryModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold mb-1">Judul Dokumentasi</label>
                    <input
                      type="text"
                      required
                      value={editingPhoto.title}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Kategori Galeri</label>
                      <select
                        value={editingPhoto.category}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg bg-white"
                      >
                        <option value="armada">Armada Bus</option>
                        <option value="alam">Destinasi & Alam</option>
                        <option value="study-tour">Study Tour Sekolah</option>
                        <option value="gathering">Family & Gathering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Lokasi Destinasi</label>
                      <input
                        type="text"
                        value={editingPhoto.location}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Upload Foto Galeri */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="block font-bold text-slate-800">
                      File Foto Galeri (Bisa Upload dari HP/Komputer)
                    </label>
                    <div className="flex gap-3 items-center">
                      <div className="w-24 h-20 rounded-lg overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                        <img src={editingPhoto.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="file"
                          ref={galleryFileInputRef}
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleReadFile(f, (url) => setEditingPhoto({ ...editingPhoto, image: url }));
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Pilih Foto dari Perangkat</span>
                        </button>

                        <div className="flex gap-1.5">
                          <input
                            type="url"
                            placeholder="Atau masukkan tautan URL"
                            value={galleryCustomUrl}
                            onChange={(e) => setGalleryCustomUrl(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-xs border rounded-lg bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (galleryCustomUrl.trim()) {
                                setEditingPhoto({ ...editingPhoto, image: galleryCustomUrl.trim() });
                                setGalleryCustomUrl('');
                              }
                            }}
                            className="px-2.5 py-1 bg-slate-800 text-white rounded-lg font-medium"
                          >
                            Terapkan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={2}
                      value={editingPhoto.caption}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSaveGalleryPhoto(editingPhoto)}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                  >
                    Simpan Foto Galeri
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: SERVICES CRUD */}
      {activeSubTab === 'services' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500">
            Berikut 7 layanan utama PT Fajar Karya Wisata yang tampil di website. Anda dapat menyesuaikan deskripsi dan poin unggulan.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv, idx) => (
              <div key={srv.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{srv.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">#0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-600">{srv.shortDesc}</p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500">Fitur Layanan:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {srv.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: PROMOS CRUD */}
      {activeSubTab === 'promos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Admin dapat mengelola promo diskon, voucher rombongan, dan periode berlaku.
            </div>
            <button
              onClick={() => {
                setEditingPromo({
                  id: `promo-${Date.now()}`,
                  badge: 'Promo Baru',
                  title: 'Diskon Spesial Musim Wisata',
                  code: 'FKWSPESIAL',
                  discount: 'Cashback Rp 500.000',
                  validUntil: 'Berlaku s/d Akhir Bulan',
                  description: 'Voucher diskon khusus rombongan wisata.',
                  terms: ['Khusus pemesanan minimal 25 pax.', 'Tidak dapat digabung dengan promo lain.'],
                });
                setIsPromoModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Promo Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {promo.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {promo.code}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{promo.title}</h4>
                  <div className="text-xs font-bold text-emerald-700 mt-1">{promo.discount}</div>
                  <p className="text-[11px] text-slate-500 mt-1">{promo.terms?.join(' · ') || promo.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{promo.validUntil}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPromo(promo);
                        setIsPromoModalOpen(true);
                      }}
                      className="p-1 rounded text-amber-700 hover:bg-amber-50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePromo(promo.id)}
                      className="p-1 rounded text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Promo */}
          {isPromoModalOpen && editingPromo && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900">Edit / Tambah Promo</h3>
                  <button onClick={() => setIsPromoModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold mb-1">Judul Promo</label>
                    <input
                      type="text"
                      value={editingPromo.title}
                      onChange={(e) => setEditingPromo({ ...editingPromo, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Kode Voucher</label>
                      <input
                        type="text"
                        value={editingPromo.code}
                        onChange={(e) => setEditingPromo({ ...editingPromo, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Diskon / Nilai</label>
                      <input
                        type="text"
                        value={editingPromo.discount}
                        onChange={(e) => setEditingPromo({ ...editingPromo, discount: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg font-semibold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Masa Berlaku</label>
                    <input
                      type="text"
                      value={editingPromo.validUntil}
                      onChange={(e) => setEditingPromo({ ...editingPromo, validUntil: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Syarat & Ketentuan (Pisahkan dengan tanda koma)</label>
                    <textarea
                      rows={2}
                      value={editingPromo.terms?.join(', ') || ''}
                      onChange={(e) =>
                        setEditingPromo({
                          ...editingPromo,
                          terms: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setIsPromoModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSavePromo(editingPromo)}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                  >
                    Simpan Promo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 6: TESTIMONIALS CRUD */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Admin dapat menambah atau merubah testimoni kepuasan pelanggan yang tampil di website.
            </div>
            <button
              onClick={() => {
                setEditingTesti({
                  id: `testi-${Date.now()}`,
                  name: 'Nama Klien',
                  role: 'Ketua Rombongan',
                  organization: 'Keluarga / Instansi',
                  quote: 'Pelayanan PT Fajar Karya Wisata sangat memuaskan dan armada nyaman.',
                  tripType: 'Trip Wisata',
                  destination: 'Malang & Batu',
                  rating: 5,
                  date: 'Oktober 2026',
                });
                setIsTestiModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Testimoni</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-bold">{'★'.repeat(testi.rating)}</span>
                    <span className="text-[10px] text-slate-400">{testi.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 italic mt-2">"{testi.quote}"</p>
                  <div className="pt-2 font-bold text-xs text-slate-900">{testi.name}</div>
                  <div className="text-[11px] text-slate-500">{testi.role} · {testi.organization}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-amber-700 font-semibold">{testi.tripType}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingTesti(testi);
                        setIsTestiModalOpen(true);
                      }}
                      className="p-1 rounded text-amber-700 hover:bg-amber-50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTesti(testi.id)}
                      className="p-1 rounded text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Testimoni */}
          {isTestiModalOpen && editingTesti && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900">Edit / Tambah Testimoni</h3>
                  <button onClick={() => setIsTestiModalOpen(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold mb-1">Nama Pelanggan</label>
                    <input
                      type="text"
                      value={editingTesti.name}
                      onChange={(e) => setEditingTesti({ ...editingTesti, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Peran / Jabatan</label>
                      <input
                        type="text"
                        value={editingTesti.role}
                        onChange={(e) => setEditingTesti({ ...editingTesti, role: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Instansi / Asal</label>
                      <input
                        type="text"
                        value={editingTesti.organization}
                        onChange={(e) => setEditingTesti({ ...editingTesti, organization: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Jenis Paket Trip</label>
                      <input
                        type="text"
                        value={editingTesti.tripType}
                        onChange={(e) => setEditingTesti({ ...editingTesti, tripType: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Destinasi</label>
                      <input
                        type="text"
                        value={editingTesti.destination}
                        onChange={(e) => setEditingTesti({ ...editingTesti, destination: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Kutipan Testimoni</label>
                    <textarea
                      rows={3}
                      value={editingTesti.quote}
                      onChange={(e) => setEditingTesti({ ...editingTesti, quote: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setIsTestiModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSaveTesti(editingTesti)}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700"
                  >
                    Simpan Testimoni
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
