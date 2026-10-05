import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BookingSteps } from './components/BookingSteps';
import { DestinationsSection } from './components/DestinationsSection';
import { PromoSection } from './components/PromoSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TripEstimatorModal } from './components/TripEstimatorModal';
import { CompanyDashboard } from './components/dashboard/CompanyDashboard';
import { AdminLoginModal } from './components/dashboard/AdminLoginModal';
import {
  TourPackage,
  ServiceItem,
  PromoItem,
  TestimonialItem,
  GalleryPhoto,
} from './types/travel';
import { AdminUser, CompanySettings } from './types/dashboard';
import { NewsArticle } from './types/news';
import { ConsultationInquiry } from './types/inquiry';
import { DEFAULT_COMPANY_SETTINGS } from './data/dashboardData';
import { INITIAL_NEWS_ARTICLES } from './data/newsData';
import { INITIAL_INQUIRIES } from './data/inquiryData';
import {
  PACKAGES_DATA,
  SERVICES_DATA,
  PROMOS_DATA,
  TESTIMONIALS_DATA,
  GALLERY_DATA,
} from './data/travelData';
import { NewsSection } from './components/NewsSection';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'dashboard'>('public');
  const [isTripEstimatorOpen, setIsTripEstimatorOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [prefilledPackage, setPrefilledPackage] = useState<string | undefined>();
  const [contactServiceFocus, setContactServiceFocus] = useState<string | undefined>();

  // Admin user authentication state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('fkw_admin_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Company settings customizable by admin
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('fkw_company_settings');
    return saved ? JSON.parse(saved) : DEFAULT_COMPANY_SETTINGS;
  });

  // News and articles state
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('fkw_news_articles');
    return saved ? JSON.parse(saved) : INITIAL_NEWS_ARTICLES;
  });

  // Consultation inquiries state
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>(() => {
    const saved = localStorage.getItem('fkw_consultation_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // CMS: Tour packages state
  const [packages, setPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('fkw_tour_packages');
    return saved ? JSON.parse(saved) : PACKAGES_DATA;
  });

  // CMS: Services state
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('fkw_services_list');
    return saved ? JSON.parse(saved) : SERVICES_DATA;
  });

  // CMS: Promos state
  const [promos, setPromos] = useState<PromoItem[]>(() => {
    const saved = localStorage.getItem('fkw_promos_list');
    return saved ? JSON.parse(saved) : PROMOS_DATA;
  });

  // CMS: Testimonials state
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('fkw_testimonials_list');
    return saved ? JSON.parse(saved) : TESTIMONIALS_DATA;
  });

  // CMS: Gallery photos state
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('fkw_gallery_photos');
    return saved ? JSON.parse(saved) : GALLERY_DATA;
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('fkw_news_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('fkw_consultation_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('fkw_tour_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('fkw_services_list', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('fkw_promos_list', JSON.stringify(promos));
  }, [promos]);

  useEffect(() => {
    localStorage.setItem('fkw_testimonials_list', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('fkw_gallery_photos', JSON.stringify(gallery));
  }, [gallery]);

  // Handlers for Articles
  const handleSaveArticle = (savedArticle: NewsArticle) => {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === savedArticle.id);
      if (exists) {
        return prev.map((a) => (a.id === savedArticle.id ? savedArticle : a));
      }
      return [savedArticle, ...prev];
    });
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  // Handlers for Settings
  const handleUpdateSettings = (newSettings: CompanySettings) => {
    setCompanySettings(newSettings);
    localStorage.setItem('fkw_company_settings', JSON.stringify(newSettings));
  };

  // Handlers for Inquiries
  const handleSaveInquiry = (updated: ConsultationInquiry) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === updated.id ? updated : inq)));
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const handleAddInquiry = (newInq: {
    name: string;
    phone: string;
    serviceType: string;
    destination: string;
    participants: number;
    duration?: string;
    notes: string;
  }) => {
    const inquiryRecord: ConsultationInquiry = {
      id: `INQ-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      name: newInq.name,
      phone: newInq.phone,
      serviceType: newInq.serviceType,
      destination: newInq.destination,
      participants: newInq.participants,
      duration: newInq.duration,
      notes: newInq.notes,
      createdAt: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'Menunggu Balasan',
    };
    setInquiries((prev) => [inquiryRecord, ...prev]);
  };

  // Handlers for CMS
  const handleSavePackages = (newPkgs: TourPackage[]) => {
    setPackages(newPkgs);
  };

  const handleSaveServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
  };

  const handleSavePromos = (newPromos: PromoItem[]) => {
    setPromos(newPromos);
  };

  const handleSaveTestimonials = (newTestis: TestimonialItem[]) => {
    setTestimonials(newTestis);
  };

  const handleSaveGallery = (newGallery: GalleryPhoto[]) => {
    setGallery(newGallery);
  };

  // Authentication & Dashboard navigation
  const handleOpenDashboard = () => {
    if (adminUser) {
      setCurrentView('dashboard');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('fkw_admin_session');
    setAdminUser(null);
    setCurrentView('public');
  };

  const handleOpenConsultation = () => {
    setPrefilledPackage(undefined);
    setIsTripEstimatorOpen(true);
  };

  const handleSelectPackageForBooking = (pkg: TourPackage) => {
    setPrefilledPackage(`${pkg.title} (${pkg.duration})`);
    setIsTripEstimatorOpen(true);
  };

  const handleSelectServiceForConsult = (serviceTitle: string) => {
    setContactServiceFocus(serviceTitle);
    const contactElem = document.getElementById('kontak');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestinationForConsult = (destName: string) => {
    setPrefilledPackage(`Eksplorasi Wilayah: ${destName}`);
    setIsTripEstimatorOpen(true);
  };

  const handleClaimPromo = (promo: PromoItem) => {
    setPrefilledPackage(`Klaim Promo: ${promo.title} (Kode: ${promo.code})`);
    setIsTripEstimatorOpen(true);
  };

  if (currentView === 'dashboard' && adminUser) {
    return (
      <CompanyDashboard
        adminUser={adminUser}
        onLogout={handleLogout}
        onBackToPublicSite={() => setCurrentView('public')}
        settings={companySettings}
        onUpdateSettings={handleUpdateSettings}
        articles={articles}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        inquiries={inquiries}
        onSaveInquiry={handleSaveInquiry}
        onDeleteInquiry={handleDeleteInquiry}
        packages={packages}
        onSavePackages={handleSavePackages}
        services={services}
        onSaveServices={handleSaveServices}
        promos={promos}
        onSavePromos={handleSavePromos}
        testimonials={testimonials}
        onSaveTestimonials={handleSaveTestimonials}
        gallery={gallery}
        onSaveGallery={handleSaveGallery}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onOpenDashboard={handleOpenDashboard}
        settings={companySettings}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
          settings={companySettings}
        />

        {/* 1. TENTANG KAMI */}
        <AboutSection settings={companySettings} />

        {/* 2. LAYANAN KAMI */}
        <ServicesSection
          services={services}
          onSelectServiceForConsult={handleSelectServiceForConsult}
        />

        {/* 3. PAKET WISATA */}
        <PackagesSection
          packages={packages}
          onOpenCustomBuilder={handleOpenConsultation}
          onSelectPackageForBooking={handleSelectPackageForBooking}
        />

        {/* 4. MENGAPA MEMILIH KAMI? */}
        <WhyChooseUs />

        {/* 5. CARA PEMESANAN */}
        <BookingSteps onStartBooking={handleOpenConsultation} />

        {/* 6. DESTINASI WISATA */}
        <DestinationsSection
          onSelectDestinationForConsult={handleSelectDestinationForConsult}
        />

        {/* 7. PROMO */}
        <PromoSection
          promos={promos}
          onClaimPromo={handleClaimPromo}
        />

        {/* 8. GALERI */}
        <GallerySection gallery={gallery} />

        {/* BERITA & PUBLIKASI WISATA */}
        <NewsSection
          articles={articles}
          onConsultArticleTopic={(topic) => {
            setPrefilledPackage(topic);
            setIsTripEstimatorOpen(true);
          }}
        />

        {/* 9. TESTIMONI */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 10. HUBUNGI KAMI */}
        <ContactSection
          initialServiceOrPackage={contactServiceFocus}
          settings={companySettings}
          onAddInquiry={handleAddInquiry}
        />
      </main>

      {/* FOOTER */}
      <Footer settings={companySettings} />

      {/* Floating Fast WhatsApp Pill */}
      <FloatingWhatsApp />

      {/* Interactive Trip Estimator & WhatsApp Generator Modal */}
      <TripEstimatorModal
        isOpen={isTripEstimatorOpen}
        onClose={() => setIsTripEstimatorOpen(false)}
        prefilledPackageName={prefilledPackage}
        onAddInquiry={handleAddInquiry}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
