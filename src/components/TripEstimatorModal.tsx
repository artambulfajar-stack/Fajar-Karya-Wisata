import React, { useState } from 'react';
import { X, Send, Sparkles, Bus, Users, Calendar, MapPin, Hotel, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface TripEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPackageName?: string;
  onAddInquiry?: (inquiry: {
    name: string;
    phone: string;
    serviceType: string;
    destination: string;
    participants: number;
    duration?: string;
    notes: string;
  }) => void;
}

export const TripEstimatorModal: React.FC<TripEstimatorModalProps> = ({
  isOpen,
  onClose,
  prefilledPackageName,
  onAddInquiry,
}) => {
  const [destination, setDestination] = useState('Malang & Kota Batu');
  const [tripType, setTripType] = useState('Wisata Keluarga');
  const [duration, setDuration] = useState('3 Hari 2 Malam (3D2N)');
  const [paxCount, setPaxCount] = useState<number>(10);
  const [hotelPref, setHotelPref] = useState('Hotel Bintang 3 / 4');
  const [departureDate, setDepartureDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState(
    prefilledPackageName ? `Tertarik dengan paket: ${prefilledPackageName}` : ''
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Determine recommended vehicle based on pax count
  const getRecommendedTransport = (pax: number) => {
    if (pax <= 6) return 'Toyota Innova Reborn / Grand Avanza (Kapasitas 6-7 seat)';
    if (pax <= 14) return 'Toyota HiAce Luxury / Commuter Eksekutif (Kapasitas 14 seat)';
    if (pax <= 32) return 'Medium Bus Pariwisata AC (Kapasitas 31-33 seat)';
    return 'Big Bus HDD / SHD Pariwisata (Kapasitas 45-50 seat)';
  };

  const recommendedTransport = getRecommendedTransport(paxCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onAddInquiry) {
      onAddInquiry({
        name: name || 'Tamu Estimator',
        phone: phone || '-',
        serviceType: tripType,
        destination: destination,
        participants: paxCount,
        duration: duration,
        notes: `Rancangan Perjalanan: ${duration}, Estimasi Tanggal: ${departureDate || 'Belum pasti'}, Rekomendasi Bus: ${recommendedTransport}, Hotel: ${hotelPref}. Catatan: ${specialNotes || '-'}`,
      });
    }

    // Prepare WhatsApp Message
    const message = `Halo PT Fajar Karya Wisata, saya ingin berkonsultasi mengenai rencana perjalanan wisata (Service Of Priority):

• Nama Pemesan: ${name || '-'}
• No. WhatsApp: ${phone || '-'}
• Kategori Perjalanan: ${tripType}
• Destinasi Tujuan: ${destination}
• Estimasi Durasi: ${duration}
• Jumlah Peserta: ${paxCount} orang
• Rekomendasi Armada: ${recommendedTransport}
• Preferensi Penginapan: ${hotelPref}
• Rencana Keberangkatan: ${departureDate || 'Menyesuaikan'}
• Catatan / Kebutuhan Khusus: ${specialNotes || '-'}

Mohon informasi ketersediaan, penawaran harga terbaik, dan rancangan itinerary-nya. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodedMessage}`;

    setSubmitted(true);

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative shrink-0">
          <button
            onClick={onClose}
            aria-label="Tutup perancang perjalanan"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Kalkulator & Perancang Perjalanan</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Rancang Custom Trip Fajar Karya Wisata
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tentukan sendiri preferensi destinasi, durasi, dan armada. Tim kami siap meramu itinerary paling pas.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Rancangan Siap Dikirim!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Kami sedang mengarahkan Anda ke WhatsApp resmi PT Fajar Karya Wisata dengan rincian kebutuhan perjalanan yang sudah tersusun rapi.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Selesai
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-slate-800">
            {/* Step 1: Destination & Trip Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Destinasi Utama
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Malang & Kota Batu (Jawa Timur)">Malang & Kota Batu (Jatim)</option>
                  <option value="Bromo Sunrise & Tengger (Jawa Timur)">Bromo Sunrise & Tengger</option>
                  <option value="Banyuwangi & Kawah Ijen (Jawa Timur)">Banyuwangi & Kawah Ijen</option>
                  <option value="Yogyakarta & Candi Warisan (DIY)">Yogyakarta & Candi (DIY)</option>
                  <option value="Bandung & Lembang (Jawa Barat)">Bandung & Lembang (Jabar)</option>
                  <option value="Semarang & Solo (Jawa Tengah)">Semarang & Solo (Jateng)</option>
                  <option value="Bali & Lombok">Bali & Lombok</option>
                  <option value="Custom Destinasi Lainnya">Destinasi Lainnya (Kustom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kategori Perjalanan
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Wisata Keluarga">Wisata Keluarga</option>
                  <option value="Study Tour & Eduwisata Sekolah">Study Tour Sekolah</option>
                  <option value="Wisata Group / Gathering Kantor">Wisata Group / Corporate Gathering</option>
                  <option value="Komunitas / Organisasi">Komunitas / Organisasi</option>
                  <option value="Custom Trip Privat">Custom Trip Privat</option>
                </select>
              </div>
            </div>

            {/* Step 2: Duration & Pax Counter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Durasi Perjalanan
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="1 Hari (One Day Tour)">1 Hari (One Day Tour)</option>
                  <option value="2 Hari 1 Malam (2D1N)">2 Hari 1 Malam (2D1N)</option>
                  <option value="3 Hari 2 Malam (3D2N)">3 Hari 2 Malam (3D2N)</option>
                  <option value="4 Hari 3 Malam (4D3N)">4 Hari 3 Malam (4D3N)</option>
                  <option value="Lebih dari 4 Hari (Kustom)">Lebih dari 4 Hari (Kustom)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimasi Peserta: <span className="text-amber-600 font-extrabold">{paxCount} Orang</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="2"
                    max="150"
                    step="1"
                    value={paxCount}
                    onChange={(e) => setPaxCount(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={paxCount}
                    onChange={(e) => setPaxCount(Math.max(1, Number(e.target.value)))}
                    className="w-20 px-2 py-1 text-sm text-center border rounded-lg border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Recommended Fleet Box */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
              <Bus className="w-5 h-5 text-amber-700 shrink-0" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Rekomendasi Armada untuk {paxCount} Peserta:</span>{' '}
                {recommendedTransport}
              </div>
            </div>

            {/* Step 3: Hotel & Departure Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferensi Penginapan
                </label>
                <select
                  value={hotelPref}
                  onChange={(e) => setHotelPref(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Hotel Bintang 3 / 4">Hotel Bintang 3 / 4 (Rekomendasi)</option>
                  <option value="Hotel Bintang 5 / Luxury Resort">Hotel Bintang 5 / Luxury Resort</option>
                  <option value="Homestay / Villa Keluarga">Homestay / Villa Keluarga</option>
                  <option value="Tanpa Penginapan (One Day Tour)">Tanpa Penginapan (One Day Tour)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rencana Tanggal Berangkat
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Anda / Instansi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Fajar / SMA Negeri 1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Catatan Khusus / Permintaan Khusus
              </label>
              <textarea
                rows={2}
                placeholder="Sebutkan spot wisata yang ingin dikunjungi, titik jemput, atau kebutuhan makanan khusus..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Footer Form Action */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Rancangan ke WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
