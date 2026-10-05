import React, { useState } from 'react';
import { ConsultationInquiry } from '../../types/inquiry';
import { Search, MessageSquare, MessageCircle, CheckCircle2, Clock, Trash2, ArrowRight } from 'lucide-react';
import { ReplyInquiryModal } from './ReplyInquiryModal';

interface InquiriesTabProps {
  inquiries: ConsultationInquiry[];
  onSaveInquiry: (updated: ConsultationInquiry) => void;
  onDeleteInquiry: (id: string) => void;
  onConvertToBooking: (inquiry: ConsultationInquiry) => void;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({
  inquiries,
  onSaveInquiry,
  onDeleteInquiry,
  onConvertToBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationInquiry | null>(null);

  const pendingCount = inquiries.filter((i) => i.status === 'Menunggu Balasan').length;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Kotak Masuk Konsultasi Wisata
            </h2>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white animate-pulse">
                {pendingCount} Menunggu
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Setiap permintaan konsultasi dan custom trip dari website langsung masuk ke sini untuk dibalas secara profesional oleh admin.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg overflow-x-auto text-xs">
          {['all', 'Menunggu Balasan', 'Sudah Dibalas', 'Dikonversi ke Booking'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'all' ? 'Semua Konsultasi' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama, WhatsApp, destinasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Klien & WhatsApp</th>
                <th className="px-4 py-3">Layanan / Destinasi</th>
                <th className="px-4 py-3 text-center">Peserta</th>
                <th className="px-4 py-3">Waktu Masuk</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    Tidak ada konsultasi yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 group-hover:text-amber-700">
                        {inq.name}
                      </div>
                      <div className="font-mono text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>{inq.phone}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{inq.destination}</div>
                      <div className="text-[10px] text-slate-400">{inq.serviceType}</div>
                      {inq.notes && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 italic max-w-xs mt-0.5">
                          &ldquo;{inq.notes}&rdquo;
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3 text-center font-mono font-semibold tabular-nums">
                      {inq.participants} Pax
                    </td>

                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-[11px]">
                      {inq.createdAt}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          inq.status === 'Menunggu Balasan'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : inq.status === 'Dikonversi ke Booking'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {inq.status === 'Menunggu Balasan' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                        )}
                        {inq.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInquiry(inq);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded transition-colors"
                        >
                          Balas
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Hapus konsultasi dari ${inq.name}?`)) {
                              onDeleteInquiry(inq.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Hapus pesan"
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

      {/* Reply Modal */}
      <ReplyInquiryModal
        inquiry={selectedInquiry}
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onSaveReply={onSaveInquiry}
        onConvertToBooking={onConvertToBooking}
      />
    </div>
  );
};
