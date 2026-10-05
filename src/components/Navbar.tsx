import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Compass, LayoutDashboard } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { CompanySettings } from '../types/dashboard';

interface NavbarProps {
  onOpenConsultation?: () => void;
  onOpenDashboard?: () => void;
  settings?: CompanySettings;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenDashboard, settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = settings?.companyName?.replace(/^PT\s+/i, '') || 'Fajar Karya Wisata';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Paket Wisata', href: '#paket-wisata' },
    { label: 'Destinasi', href: '#destinasi' },
    { label: 'Promo', href: '#promo' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Berita', href: '#berita' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between">
          {/* Zone 1: Single Brand Title Element */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider transition-colors ${
                isScrolled
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
              }`}
            >
              FKW
            </span>
            <span
              className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {brandName}
            </span>
          </a>

          {/* Zone 2: 4-6 Text Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded px-1 py-0.5 ${
                  isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenDashboard}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isScrolled
                  ? 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                  : 'text-white hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-sm'
              }`}
              title="Buka Dashboard Manajemen Perusahaan"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isScrolled
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-white text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Konsultasi</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className={`lg:hidden p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDashboard) onOpenDashboard();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Dashboard Manajemen Perusahaan</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
