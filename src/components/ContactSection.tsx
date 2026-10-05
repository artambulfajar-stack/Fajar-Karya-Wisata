import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/travelData';
import { CompanySettings } from '../types/dashboard';
import {
  MessageCircle,
  Instagram,
  Globe,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Phone,
} from 'lucide-react';

interface ContactSectionProps {
  initialServiceOrPackage?: string;
  settings?: CompanySettings;
  onAddInquiry?: (inquiry: {
    name: string;
    phone: string;
    serviceType: string;
    destination: string;
    participants: number;
    notes: string;
  }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceOrPackage,
  settings,
  onAddInquiry,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(
    initialServiceOrPackage || 'Paket Wisata Keluarga'
  );
  const [participants, setParticipants] = useState('10');
  const [destination, setDestination] = useState('Malang - Batu');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeWhatsapp = settings?.whatsappNumber || COMPANY_INFO.contact.whatsapp;
  const activeWhatsappDisplay = settings?.whatsappDisplay || COMPANY_INFO.contact.whatsappDisplay;
  const activeAddress = settings?.address || COMPANY_INFO.contact.address;
  const activeHours = settings?.operationalHours || COMPANY_INFO.contact.operationalHours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onAddInquiry) {
      onAddInquiry({
        name: name || 'Tamu Website',
        phone: phone || '-',
        serviceType: serviceType || 'Konsultasi Wisata',
        destination: destination || 'Belum Ditentukan',
        participants: parseInt(participants) || 1,
        notes: message || 'Konsultasi perjalanan wisata dari formulir website.',
      });
    }

    const waText = `Halo PT Fajar Karya Wisata, saya ingin konsultasi perjalanan wisata (Service Of Priority):

• Nama: ${name || '-'}
• No. WhatsApp: ${phone || '-'}
• Layanan / Paket: ${serviceType}
• Destinasi Tujuan: ${destination}
• Jumlah Rombongan: ${participants} orang
• Pesan / Kebutuhan: ${message || 'Mohon informasi paket dan penawaran terbaik'}

Terima kasih.`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${activeWhatsapp}?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  return (
    <section id="kontak" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-400 mb-2">
            10. HUBUNGI KAMI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Siap Merencanakan Perjalanan Anda?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Konsultasikan kebutuhan perjalanan Anda bersama PT Fajar Karya Wisata. Kami siap
            membantu menyusun rencana terbaik yang aman, nyaman, dan berkesan.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Interactive Lead Capture Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Column 1: Official Channels & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-5">
              <h3 className="text-base font-bold text-white tracking-tight">
                Saluran Resmi PT Fajar Karya Wisata
              </h3>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">WhatsApp Resmi (Chat & Konsultasi)</div>
                  <a
                    href={`https://wa.me/${activeWhatsapp}?text=Halo%20PT%20Fajar%20Karya%20Wisata%2C%20saya%20ingin%20konsultasi%20perjalanan.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {activeWhatsappDisplay}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Instagram</div>
                  <a
                    href={COMPANY_INFO.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {COMPANY_INFO.contact.instagram}
                  </a>
                </div>
              </div>

              {/* TikTok */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 border border-slate-600 font-bold text-xs">
                  TT
                </div>
                <div>
                  <div className="text-xs text-slate-400">TikTok</div>
                  <a
                    href={COMPANY_INFO.contact.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {COMPANY_INFO.contact.tiktok}
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Website Resmi</div>
                  <span className="text-sm font-bold text-white">
                    {COMPANY_INFO.contact.website}
                  </span>
                </div>
              </div>
            </div>

            {/* Operational Info */}
            <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Jam Operasional & Layanan</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {COMPANY_INFO.contact.operationalHours}
              </p>
            </div>
          </div>

          {/* Column 2: Interactive Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Formulir Konsultasi Wisata
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Isi rincian di bawah ini, tim kami akan merespons dengan rekomendasi paket dan penawaran harga.
              </p>

              {submitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Pesan Terkirim ke WhatsApp</h4>
                  <p className="text-xs text-slate-600">
                    Sistem telah mengarahkan pesan konsultasi Anda ke customer service PT Fajar Karya Wisata. Kami akan segera membalas rincian penawaran perjalanan Anda.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white"
                  >
                    Kirim Pertanyaan Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama Lengkap / Instansi *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda atau Lembaga"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 08123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Kategori Layanan
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Paket Wisata Keluarga">Wisata Keluarga</option>
                        <option value="Study Tour & Eduwisata">Study Tour Sekolah</option>
                        <option value="Wisata Group & Gathering">Wisata Group / Kantor</option>
                        <option value="Sewa Transportasi Wisata">Transportasi / Bus</option>
                        <option value="Hotel & Akomodasi">Hotel & Akomodasi</option>
                        <option value="Custom Trip">Custom Trip</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Destinasi Tujuan
                      </label>
                      <input
                        type="text"
                        placeholder="Malang / Bromo / Yogya"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Jumlah Peserta (Pax)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Contoh: 30"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Catatan / Kebutuhan Tambahan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan tanggal rencana berangkat, durasi hari, atau fasilitas yang diinginkan..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konsultasi via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
