import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const FloatingWhatsApp: React.FC = () => {
  const defaultMessage = encodeURIComponent(
    'Halo PT Fajar Karya Wisata, saya ingin berkonsultasi mengenai paket perjalanan wisata (Service Of Priority).'
  );

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center group focus:outline-none"
    >
      <a
        href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi cepat via WhatsApp"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-3 rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold tracking-tight hidden sm:inline-block pr-1">
          Chat WhatsApp
        </span>
      </a>
    </aside>
  );
};
