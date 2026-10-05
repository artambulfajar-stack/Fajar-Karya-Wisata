import React, { useState, useEffect } from 'react';
import { ConsultationInquiry } from '../../types/inquiry';
import {
  X,
  Send,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

interface ReplyInquiryModalProps {
  inquiry: ConsultationInquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveReply: (updated: ConsultationInquiry) => void;
  onConvertToBooking: (inquiry: ConsultationInquiry) => void;
}

export const ReplyInquiryModal: React.FC<ReplyInquiryModalProps> = ({
  inquiry,
  isOpen,
  onClose,
  onSaveReply,
  onConvertToBooking,
}) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [status, setStatus] = useState<ConsultationInquiry['status']>('Sudah Dibalas');

  useEffect(() => {
    if (inquiry) {
      setStatus(inquiry.status);
      setReplyMessage(
        inquiry.adminReplyNotes ||
          `Halo ${inquiry.name}, terima kasih telah menghubungi PT Fajar Karya Wisata (Service Of Priority).\n\nKami telah meninjau kebutuhan perjalanan Anda ke ${inquiry.destination} untuk ${inquiry.participants} orang peserta. Kami siap memberikan penawaran paket terbaik dengan fasilitas armada prima, hotel terstandar, dan pemandu berpengalaman.\n\nBerikut kami lampirkan estimasi penawaran dan draft jadwal perjalanan untuk rombongan Anda. Apakah ada preferensi khusus terkait waktu keberangkatan?`
      );
    }
  }, [inquiry, isOpen]);

  if (!isOpen || !inquiry) return null;

  const handleSendWhatsAppReply = () => {
    const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.slice(1)
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : '62' + cleanPhone;

    const fullText = `*PT FAJAR KARYA WISATA - SERVICE OF PRIORITY*\n\n${replyMessage}\n\nSalam hormat,\n*Manajemen Operasional PT Fajar Karya Wisata*\nWebsite: fajarkaryawisata.my.id`;

    const encoded = encodeURIComponent(fullText);
    const waUrl = `https://wa.me/${waPhone}?text=${encoded}`;

    // Update status to Sudah Dibalas
    const updatedInquiry: ConsultationInquiry = {
      ...inquiry,
      status: 'Sudah Dibalas',
      adminReplyNotes: replyMessage,
      repliedAt: new Date().toLocaleString('id-ID'),
    };
    onSaveReply(updatedInquiry);

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveOnly = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedInquiry: ConsultationInquiry = {
      ...inquiry,
      status,
      adminReplyNotes: replyMessage,
      repliedAt: inquiry.repliedAt || new Date().toLocaleString('id-ID'),
    };
    onSaveReply(updatedInquiry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-0.5">
              <span>{inquiry.id}</span>
              <span aria-hidden="true">·</span>
              <span>{inquiry.serviceType}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Balas Konsultasi: {inquiry.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSaveOnly} className="overflow-y-auto p-6 space-y-5 flex-1 text-slate-800">
          {/* Inquiry Details Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="font-bold text-slate-900 text-sm">
                Rincian Kebutuhan Wisata Klien
              </span>
              <span
                className={`px-2.5 py-0.5 rounded font-semibold text-[11px] ${
                  inquiry.status === 'Menunggu Balasan'
                    ? 'bg-rose-100 text-rose-800'
                    : inquiry.status === 'Dikonversi ke Booking'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {inquiry.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">WhatsApp:</span>
                <span className="font-mono font-semibold text-slate-800">{inquiry.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Destinasi:</span>
                <span className="font-semibold text-slate-800">{inquiry.destination}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Peserta:</span>
                <span className="font-semibold text-slate-800">{inquiry.participants} Orang</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Waktu Masuk:</span>
                <span className="text-slate-600">{inquiry.createdAt}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                Catatan / Permintaan Khusus Klien:
              </span>
              <p className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed font-sans">
                {inquiry.notes || 'Tidak ada catatan tambahan.'}
              </p>
            </div>
          </div>

          {/* Quick template snippets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tulis Balasan / Penawaran Resmi Admin
              </label>
              <span className="text-[11px] text-slate-400">Pilih template cepat:</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-2">
              <button
                type="button"
                onClick={() =>
                  setReplyMessage(
                    `Halo ${inquiry.name}, terima kasih atas minat Anda pada paket study tour PT Fajar Karya Wisata.\n\nUntuk rombongan ${inquiry.participants} siswa ke ${inquiry.destination}, kami siapkan armada Big Bus HDD Scania/Mercedes-Benz ber-AC dingin, hotel bintang 3 berfasilitas lengkap, makan prasmanan teratur, tiket destinasi, pendampingan Tour Leader berlisensi, serta free asuransi perjalanan.\n\nKami siap mengirimkan proposal penawaran resmi berstempel PT FKW. Mohon konfirmasi jadwal rencana tanggal keberangkatan.`
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] text-slate-700 font-medium transition-colors"
              >
                + Template Study Tour
              </button>

              <button
                type="button"
                onClick={() =>
                  setReplyMessage(
                    `Halo ${inquiry.name}, salam hangat dari PT Fajar Karya Wisata.\n\nMenanggapi konsultasi liburan keluarga ke ${inquiry.destination} untuk ${inquiry.participants} orang, kami sediakan armada privat Toyota HiAce Luxury VIP dengan driver ramah yang menguasai rute wisata tanpa macet.\n\nJadwal santai ramah anak & lansia, termasuk voucher oleh-oleh khas dan rekomendasi kuliner legendaris.`
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] text-slate-700 font-medium transition-colors"
              >
                + Template Wisata Keluarga
              </button>

              <button
                type="button"
                onClick={() =>
                  setReplyMessage(
                    `Halo ${inquiry.name}, terima kasih telah menghubungi PT Fajar Karya Wisata.\n\nPermintaan custom trip ke ${inquiry.destination} sedang kami kalkulasikan bersama tim logistik dan mitra hotel. Kami akan segera menghubungi Anda dengan rincian biaya yang paling efisien dan transparan.`
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] text-slate-700 font-medium transition-colors"
              >
                + Template Custom Trip
              </button>
            </div>

            <textarea
              rows={6}
              required
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ubah Status Konsultasi
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Menunggu Balasan">Menunggu Balasan</option>
                <option value="Sudah Dibalas">Sudah Dibalas</option>
                <option value="Dikonversi ke Booking">Dikonversi ke Booking</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onConvertToBooking(inquiry);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                <FileCheck className="w-4 h-4" />
                <span>Konversi Jadi Booking Reservasi</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100"
            >
              Tutup
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
              >
                Simpan Catatan
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppReply}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim via WhatsApp</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
