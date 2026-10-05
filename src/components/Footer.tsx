import React from 'react';
import { COMPANY_INFO } from '../data/travelData';
import { CompanySettings } from '../types/dashboard';
import { ShieldCheck, Instagram, Globe, Phone, Heart } from 'lucide-react';

interface FooterProps {
  settings?: CompanySettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const companyName = settings?.companyName || 'PT Fajar Karya Wisata';
  const tagline = settings?.tagline || 'Service Of Priority';

  const footerLinks = [
    { label: 'Beranda', href: '#' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Paket Wisata', href: '#paket-wisata' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Destinasi', href: '#destinasi' },
    { label: 'Promo', href: '#promo' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Berita', href: '#berita' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs tracking-wider">
                FKW
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {companyName}
              </span>
            </div>

            <div className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-400">
              {tagline}
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Melayani kebutuhan perjalanan wisata dengan pelayanan profesional, nyaman, dan terpercaya.
              Mitra terdepan untuk study tour sekolah, wisata keluarga, rombongan instansi, dan custom trip nusantara.
            </p>

            <div className="flex items-center gap-4 text-xs pt-1">
              <a
                href={COMPANY_INFO.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                Instagram: {COMPANY_INFO.contact.instagram}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={COMPANY_INFO.contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                TikTok: {COMPANY_INFO.contact.tiktok}
              </a>
            </div>
          </div>

          {/* Quick Nav Links Mirror */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Navigasi
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 text-xs text-slate-500 space-y-1">
              <div>Website Resmi: <span className="text-slate-300">{COMPANY_INFO.contact.website}</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 PT Fajar Karya Wisata. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Service Of Priority</span>
            <span aria-hidden="true">·</span>
            <span>Indonesia Tour & Travel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
