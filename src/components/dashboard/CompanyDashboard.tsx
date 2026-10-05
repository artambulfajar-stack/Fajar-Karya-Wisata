import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Bus,
  Hotel,
  DollarSign,
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Printer,
  Eye,
  ShieldCheck,
  MapPin,
  TrendingUp,
  RefreshCw,
  Phone,
  Sparkles,
  LogOut,
  Settings,
  Edit2,
  Trash2,
  Bell,
  Sliders,
  Newspaper,
  MessageSquare,
  Globe2,
} from 'lucide-react';
import {
  BookingRecord,
  BookingStatus,
  FleetRecord,
  HotelPartnerRecord,
  AdminUser,
  CompanySettings,
} from '../../types/dashboard';
import { NewsArticle } from '../../types/news';
import { ConsultationInquiry } from '../../types/inquiry';
import {
  TourPackage,
  ServiceItem,
  PromoItem,
  TestimonialItem,
  GalleryPhoto,
} from '../../types/travel';
import {
  INITIAL_BOOKINGS,
  INITIAL_FLEET,
  INITIAL_HOTEL_PARTNERS,
  DEFAULT_COMPANY_SETTINGS,
} from '../../data/dashboardData';
import { BookingDetailModal } from './BookingDetailModal';
import { NewBookingModal } from './NewBookingModal';
import { EditBookingModal } from './EditBookingModal';
import { FleetModal } from './FleetModal';
import { HotelModal } from './HotelModal';
import { SettingsTab } from './SettingsTab';
import { NewsManagerTab } from './NewsManagerTab';
import { InquiriesTab } from './InquiriesTab';
import { WebsiteCMSTab } from './WebsiteCMSTab';

interface CompanyDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onBackToPublicSite: () => void;
  settings: CompanySettings;
  onUpdateSettings: (newSettings: CompanySettings) => void;
  articles: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
  inquiries: ConsultationInquiry[];
  onSaveInquiry: (updated: ConsultationInquiry) => void;
  onDeleteInquiry: (id: string) => void;
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

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  adminUser,
  onLogout,
  onBackToPublicSite,
  settings,
  onUpdateSettings,
  articles,
  onSaveArticle,
  onDeleteArticle,
  inquiries,
  onSaveInquiry,
  onDeleteInquiry,
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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'inquiries' | 'bookings' | 'schedule' | 'fleet' | 'hotels' | 'news' | 'website_cms' | 'settings'
  >('overview');

  const [prefilledBookingData, setPrefilledBookingData] = useState<Partial<BookingRecord> | undefined>();

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'Menunggu Balasan').length;

  const handleConvertToBooking = (inquiry: ConsultationInquiry) => {
    setPrefilledBookingData({
      clientName: inquiry.name,
      destination: inquiry.destination,
      paxCount: inquiry.participants,
      phone: inquiry.phone,
      notes: `Dikonversi dari konsultasi ${inquiry.id}: ${inquiry.notes}`,
    });
    setIsNewBookingModalOpen(true);
    onSaveInquiry({
      ...inquiry,
      status: 'Dikonversi ke Booking',
      repliedAt: new Date().toLocaleString('id-ID'),
    });
  };

  // Persistent state for Bookings, Fleet, and Hotels
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('fkw_dashboard_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [fleetList, setFleetList] = useState<FleetRecord[]>(() => {
    const saved = localStorage.getItem('fkw_dashboard_fleet');
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [hotelPartners, setHotelPartners] = useState<HotelPartnerRecord[]>(() => {
    const saved = localStorage.getItem('fkw_dashboard_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTEL_PARTNERS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fkw_dashboard_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('fkw_dashboard_fleet', JSON.stringify(fleetList));
  }, [fleetList]);

  useEffect(() => {
    localStorage.setItem('fkw_dashboard_hotels', JSON.stringify(hotelPartners));
  }, [hotelPartners]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals state
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<BookingRecord | null>(null);
  const [selectedBookingForEdit, setSelectedBookingForEdit] = useState<BookingRecord | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // Fleet modal state
  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [editingFleet, setEditingFleet] = useState<FleetRecord | null>(null);

  // Hotel modal state
  const [hotelModalOpen, setHotelModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<HotelPartnerRecord | null>(null);

  // Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalPaid = bookings.reduce((sum, b) => sum + b.paidAmount, 0);
  const totalActivePax = bookings
    .filter((b) => b.status !== 'Selesai')
    .reduce((sum, b) => sum + b.paxCount, 0);
  const activeTripsCount = bookings.filter((b) => b.status === 'Sedang Berjalan').length;
  const scheduledTripsCount = bookings.filter(
    (b) => b.status === 'Lunas & Terjadwal' || b.status === 'DP Diterima'
  ).length;

  const targetPercentage = Math.min(
    100,
    Math.round((totalRevenue / (settings.monthlyRevenueTarget || 350000000)) * 100)
  );

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Booking handlers
  const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBookingForDetail && selectedBookingForDetail.id === id) {
      setSelectedBookingForDetail((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAddBooking = (newBooking: BookingRecord) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleSaveBookingEdit = (updated: BookingRecord) => {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Fleet handlers
  const handleSaveFleet = (savedUnit: FleetRecord) => {
    if (editingFleet) {
      setFleetList((prev) => prev.map((f) => (f.id === savedUnit.id ? savedUnit : f)));
    } else {
      setFleetList([savedUnit, ...fleetList]);
    }
  };

  const handleDeleteFleet = (id: string) => {
    setFleetList((prev) => prev.filter((f) => f.id !== id));
  };

  // Hotel handlers
  const handleSaveHotel = (savedHotel: HotelPartnerRecord) => {
    if (editingHotel) {
      setHotelPartners((prev) => prev.map((h) => (h.id === savedHotel.id ? savedHotel : h)));
    } else {
      setHotelPartners([savedHotel, ...hotelPartners]);
    }
  };

  const handleDeleteHotel = (id: string) => {
    setHotelPartners((prev) => prev.filter((h) => h.id !== id));
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Sedang Berjalan':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Sedang Berjalan
          </span>
        );
      case 'Lunas & Terjadwal':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Lunas & Terjadwal
          </span>
        );
      case 'DP Diterima':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            DP Diterima
          </span>
        );
      case 'Menunggu Konfirmasi':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Menunggu
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selesai
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-30">
        {/* Zone 1: Breadcrumb & Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPublicSite}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Website Publik</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>/</span>
            <span className="text-white font-semibold">{settings.companyName}</span>
            <span>/</span>
            <span className="text-amber-400 font-medium">Dashboard Admin</span>
          </div>
        </div>

        {/* Zone 2: Fast Search */}
        <div className="hidden md:flex items-center relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari rombongan, kode, rute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Zone 3: Actions & Admin Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewBookingModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>+ Booking Baru</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">{adminUser.name}</span>
          </div>

          <button
            onClick={onLogout}
            title="Keluar dari akun admin"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </header>

      {/* Main Workspace: Sidebar + Viewport */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Manajemen
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ringkasan Operasional</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'inquiries'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Kotak Masuk Konsultasi</span>
              </div>
              {pendingInquiriesCount > 0 ? (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold tabular-nums">
                  {pendingInquiriesCount}
                </span>
              ) : (
                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Manajemen Booking</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Jadwal & Manifest</span>
              </div>
              <span className="font-mono text-[11px] text-amber-600 font-bold tabular-nums">
                {scheduledTripsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'fleet'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Armada & Transport</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {fleetList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'hotels'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Hotel className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Mitra Hotel & Vendor</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {hotelPartners.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'news'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Berita & Publikasi</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('website_cms')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'website_cms'
                  ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Tampilan Website (CMS)</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Live
              </span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pengaturan & Kustomisasi</span>
              </button>
            </div>
          </div>

          {/* Operational Status Footnote */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{settings.tagline}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Akses Admin: {adminUser.role}
            </p>
          </div>
        </aside>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Internal Announcement Banner (Admin customized) */}
          {settings.internalNotice && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
              <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Pengumuman Operasional Internal: </span>
                <span>{settings.internalNotice}</span>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Ringkasan Operasional & Bisnis
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Monitoring omset reservasi, persentase target, dan kesiapan armada bus PT Fajar Karya Wisata.
                  </p>
                </div>

                {/* Progress toward Monthly Target */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center gap-4">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Target Omset Bulan Ini</div>
                    <div className="font-mono font-bold text-slate-900 tabular-nums">
                      {formatRupiah(settings.monthlyRevenueTarget)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-extrabold text-amber-600 text-sm tabular-nums">
                      {targetPercentage}%
                    </div>
                    <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${targetPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Total Nilai Reservasi</span>
                    <DollarSign className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {formatRupiah(totalRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3 h-3" />
                    <span>Terbayar: {formatRupiah(totalPaid)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Total Peserta Aktif</span>
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {totalActivePax}{' '}
                    <span className="text-xs font-normal text-slate-500">Orang</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Sekolah, instansi, & keluarga
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Trip Siap Berangkat</span>
                    <Calendar className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {scheduledTripsCount}{' '}
                    <span className="text-xs font-normal text-slate-500">Keberangkatan</span>
                  </div>
                  <div className="text-[11px] text-blue-600 mt-1">
                    {activeTripsCount} Trip sedang di lapangan
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Kesiapan Armada Bus</span>
                    <Bus className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {fleetList.filter((f) => f.status === 'Tersedia').length} / {fleetList.length}{' '}
                    <span className="text-xs font-normal text-emerald-600 font-sans font-semibold">
                      Unit Prima
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-600 mt-1">
                    {fleetList.filter((f) => f.status === 'Perawatan / Servis').length} Unit perawatan berkala
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Upcoming Departures & Fleet Readiness */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Column 1: Upcoming Trips */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Keberangkatan Terdekat</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="text-xs text-amber-700 hover:underline font-semibold"
                    >
                      Lihat Semua Jadwal →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBookingForDetail(b)}
                        className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-400">{b.id}</span>
                            <span className="font-bold text-xs text-slate-900 truncate max-w-[200px]">
                              {b.clientName}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {b.destination} · {b.departureDate} ({b.paxCount} pax)
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{getStatusBadge(b.status)}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5 tabular-nums">
                            {formatRupiah(b.totalPrice)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Fleet Status Quick View */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Bus className="w-4 h-4 text-amber-600" />
                      <span>Status Unit Armada</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('fleet')}
                      className="text-xs text-amber-700 hover:underline font-semibold"
                    >
                      Kelola Armada →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {fleetList.slice(0, 4).map((fleet) => (
                      <div
                        key={fleet.id}
                        className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-900">
                            {fleet.unitCode}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Plat: {fleet.plateNumber} · {fleet.capacity} seat
                          </div>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            fleet.status === 'Tersedia'
                              ? 'bg-emerald-50 text-emerald-700'
                              : fleet.status === 'Sedang Beroperasi'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {fleet.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKING MANAGEMENT (With Full Edit / Delete capability) */}
          {activeTab === 'bookings' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Manajemen Reservasi & Booking
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Admin dapat menambah, mengedit rincian pemesanan, memperbarui status, atau menghapus data.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Booking Baru</span>
                </button>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg overflow-x-auto text-xs">
                  {['all', 'Menunggu Konfirmasi', 'DP Diterima', 'Lunas & Terjadwal', 'Sedang Berjalan', 'Selesai'].map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                          statusFilter === st
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st === 'all' ? 'Semua Status' : st}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filter nama / kode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-4 py-3">Kode & Klien</th>
                        <th className="px-4 py-3">Destinasi</th>
                        <th className="px-4 py-3">Jadwal</th>
                        <th className="px-4 py-3 text-center">Pax</th>
                        <th className="px-4 py-3 text-right">Nilai Total</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Aksi Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                            Tidak ada data booking yang sesuai dengan kriteria pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr
                            key={b.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td
                              className="px-4 py-3 cursor-pointer"
                              onClick={() => setSelectedBookingForDetail(b)}
                            >
                              <div className="font-mono text-[11px] text-amber-700 font-bold">
                                {b.id}
                              </div>
                              <div className="font-bold text-slate-900 group-hover:text-amber-700">
                                {b.clientName}
                              </div>
                              <div className="text-[10px] text-slate-400">{b.clientType}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-slate-800">{b.destination}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                                {b.packageName}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                              <div>{b.departureDate}</div>
                              <div className="text-[10px] text-slate-400">s/d {b.returnDate}</div>
                            </td>
                            <td className="px-4 py-3 text-center font-mono tabular-nums font-semibold">
                              {b.paxCount}
                            </td>
                            <td className="px-4 py-3 text-right font-mono tabular-nums font-bold text-slate-900">
                              {formatRupiah(b.totalPrice)}
                              <div className="text-[10px] text-emerald-600 font-normal">
                                DP: {formatRupiah(b.paidAmount)}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getStatusBadge(b.status)}
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedBookingForDetail(b)}
                                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                                  title="Lihat Detail & Surat Tugas"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setSelectedBookingForEdit(b)}
                                  className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded transition-colors"
                                  title="Edit Data Reservasi"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Hapus booking ${b.clientName} (${b.id})?`)) {
                                      handleDeleteBooking(b.id);
                                    }
                                  }}
                                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors"
                                  title="Hapus Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULE & DISPATCH */}
          {activeTab === 'schedule' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Jadwal Keberangkatan & Penugasan Kru
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Rundown logistik, kesiapan armada bus, dan penugasan Kapten Driver serta Tour Leader (TL).
                </p>
              </div>

              <div className="space-y-4">
                {bookings
                  .filter((b) => b.status !== 'Selesai')
                  .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime())
                  .map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 border border-amber-200">
                            <span>{new Date(b.departureDate).getDate()}</span>
                            <span className="text-[9px] uppercase">
                              {new Date(b.departureDate).toLocaleString('id-ID', { month: 'short' })}
                            </span>
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-amber-700 font-semibold">{b.id}</span>
                              <span className="text-xs text-slate-400">·</span>
                              <span className="font-bold text-sm text-slate-900">{b.clientName}</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              {b.packageName} · {b.paxCount} Peserta Wisata
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(b.status)}
                          <button
                            onClick={() => setSelectedBookingForDetail(b)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                          >
                            Surat Tugas
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                            Armada Ditugaskan:
                          </span>
                          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <Bus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            {b.busAssigned}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                            Pengemudi & Kru:
                          </span>
                          <span className="font-semibold text-slate-800">
                            {b.driverName}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">
                            Tour Leader (TL):
                          </span>
                          <span className="font-semibold text-slate-800">
                            {b.tourLeader}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: FLEET MANAGEMENT (With Add / Edit / Delete) */}
          {activeTab === 'fleet' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Manajemen Armada Pariwisata
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Admin dapat menambah unit kendaraan baru, mengedit data karoseri, plat nomor, dan jadwal servis.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingFleet(null);
                    setFleetModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Armada</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {fleetList.map((unit) => (
                  <div
                    key={unit.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {unit.plateNumber}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            unit.status === 'Tersedia'
                              ? 'bg-emerald-50 text-emerald-700'
                              : unit.status === 'Sedang Beroperasi'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {unit.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 mb-1">
                        {unit.unitCode}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        {unit.model}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Kapasitas:</span>
                          <span className="font-semibold text-slate-900">{unit.capacity} Seat</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Driver Kapten:</span>
                          <span className="font-medium text-slate-800">{unit.currentDriver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Posisi Unit:</span>
                          <span className="font-medium text-slate-800">{unit.currentLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Servis Terakhir:</span>
                          <span className="font-mono text-[11px] text-slate-700">{unit.lastService}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Masa Uji KIR:</span>
                          <span className="font-mono text-[11px] text-emerald-700 font-semibold">{unit.kirExpiry}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          const nextStatus: FleetRecord['status'] =
                            unit.status === 'Tersedia'
                              ? 'Sedang Beroperasi'
                              : unit.status === 'Sedang Beroperasi'
                              ? 'Perawatan / Servis'
                              : 'Tersedia';
                          setFleetList((prev) =>
                            prev.map((f) => (f.id === unit.id ? { ...f, status: nextStatus } : f))
                          );
                        }}
                        className="text-slate-500 hover:text-slate-900 text-[11px] font-medium"
                      >
                        Ganti Status Cepat
                      </button>

                      <button
                        onClick={() => {
                          setEditingFleet(unit);
                          setFleetModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 font-semibold"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Unit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HOTEL PARTNERS (With Add / Edit / Delete) */}
          {activeTab === 'hotels' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Direktori Rekanan Hotel & Akomodasi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Admin dapat menambah hotel baru, menyesuaikan tarif kontrak korporat, dan kontak sales.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingHotel(null);
                    setHotelModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Hotel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {hotelPartners.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {hotel.city}
                        </span>
                        <span className="text-xs text-amber-500 font-bold">
                          {'★'.repeat(hotel.stars)}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{hotel.name}</h3>
                        <div className="text-xs font-semibold text-emerald-700 mt-1">
                          Tarif Kontrak: {hotel.contractRate}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                        <div>PIC: <span className="font-medium text-slate-800">{hotel.contactPerson}</span></div>
                        <div>Telepon Sales: <span className="font-mono text-slate-800">{hotel.phone}</span></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {hotel.status}
                      </span>

                      <button
                        onClick={() => {
                          setEditingHotel(hotel);
                          setHotelModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 font-semibold"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Data</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INQUIRIES & KONSULTASI WISATA */}
          {activeTab === 'inquiries' && (
            <InquiriesTab
              inquiries={inquiries}
              onSaveInquiry={onSaveInquiry}
              onDeleteInquiry={onDeleteInquiry}
              onConvertToBooking={handleConvertToBooking}
            />
          )}

          {/* TAB 6: NEWS & PUBLICATION */}
          {activeTab === 'news' && (
            <NewsManagerTab
              articles={articles}
              onSaveArticle={onSaveArticle}
              onDeleteArticle={onDeleteArticle}
            />
          )}

          {/* TAB 7: WEBSITE CMS (Kustomisasi Tampilan Website) */}
          {activeTab === 'website_cms' && (
            <WebsiteCMSTab
              settings={settings}
              onSaveSettings={onUpdateSettings}
              packages={packages}
              onSavePackages={onSavePackages}
              services={services}
              onSaveServices={onSaveServices}
              promos={promos}
              onSavePromos={onSavePromos}
              testimonials={testimonials}
              onSaveTestimonials={onSaveTestimonials}
              gallery={gallery}
              onSaveGallery={onSaveGallery}
            />
          )}

          {/* TAB 8: SETTINGS & CUSTOMIZATION */}
          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={onUpdateSettings}
            />
          )}
        </main>
      </div>

      {/* Detail Modal */}
      <BookingDetailModal
        booking={selectedBookingForDetail}
        onClose={() => setSelectedBookingForDetail(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onAddBooking={handleAddBooking}
      />

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={selectedBookingForEdit}
        isOpen={!!selectedBookingForEdit}
        onClose={() => setSelectedBookingForEdit(null)}
        onSave={handleSaveBookingEdit}
        onDelete={handleDeleteBooking}
      />

      {/* Fleet Modal */}
      <FleetModal
        fleet={editingFleet}
        isOpen={fleetModalOpen}
        onClose={() => {
          setFleetModalOpen(false);
          setEditingFleet(null);
        }}
        onSave={handleSaveFleet}
        onDelete={handleDeleteFleet}
      />

      {/* Hotel Modal */}
      <HotelModal
        hotel={editingHotel}
        isOpen={hotelModalOpen}
        onClose={() => {
          setHotelModalOpen(false);
          setEditingHotel(null);
        }}
        onSave={handleSaveHotel}
        onDelete={handleDeleteHotel}
      />
    </div>
  );
};
