import React, { useState } from 'react';
import { BookingRecord, BookingStatus } from '../../types/dashboard';
import {
  X,
  Printer,
  CheckCircle2,
  Clock,
  Bus,
  User,
  Phone,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface BookingDetailModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: BookingStatus) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  onClose,
  onUpdateStatus,
}) => {
  const [printMode, setPrintMode] = useState(false);

  if (!booking) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const remainingBalance = booking.totalPrice - booking.paidAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
              <span>{booking.id}</span>
              <span aria-hidden="true">·</span>
              <span>Kategori: {booking.clientType}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {booking.clientName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{booking.destination}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPrintMode(!printMode)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{printMode ? 'Mode Detail' : 'Format Surat Tugas'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-800">
          {printMode ? (
            /* Printable Surat Perintah Jalan / Manifest */
            <div className="border border-slate-300 p-6 rounded-xl space-y-4 bg-slate-50 font-sans text-xs print:m-0 print:border-none">
              <div className="border-b border-slate-400 pb-3 flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-sm text-slate-900">PT FAJAR KARYA WISATA</div>
                  <div className="text-[11px] text-slate-600">Service Of Priority · Biro Perjalanan Wisata</div>
                  <div className="text-[10px] text-slate-500">Website: fajarkaryawisata.my.id</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs">SURAT TUGAS JALAN & MANIFEST</div>
                  <div className="font-mono text-xs text-amber-700">{booking.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-slate-700">Rombongan:</span> {booking.clientName} ({booking.paxCount} Orang)
                </div>
                <div>
                  <span className="font-bold text-slate-700">Paket:</span> {booking.packageName}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Tanggal:</span> {booking.departureDate} s/d {booking.returnDate}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Armada Ditugaskan:</span> {booking.busAssigned}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Kapten Pengemudi:</span> {booking.driverName}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Tour Leader (TL):</span> {booking.tourLeader}
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded">
                <span className="font-bold">Instruksi Khusus & Catatan Perjalanan:</span>
                <p className="mt-1 text-slate-700">{booking.notes || '-'}</p>
              </div>

              <div className="pt-6 grid grid-cols-3 text-center border-t border-slate-300">
                <div>
                  <div>Penanggung Jawab Rombongan</div>
                  <div className="h-14" />
                  <div className="font-bold">( {booking.clientName.split(' ')[0]} )</div>
                </div>
                <div>
                  <div>Tour Leader / Kru Lapangan</div>
                  <div className="h-14" />
                  <div className="font-bold">( {booking.tourLeader.split(',')[0]} )</div>
                </div>
                <div>
                  <div>Operasional PT FKW</div>
                  <div className="h-14" />
                  <div className="font-bold">( Manajemen Operasional )</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Status Update Strip */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Status Operasional Saat Ini:</div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    {booking.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Ubah Status:</span>
                  <select
                    value={booking.status}
                    onChange={(e) => onUpdateStatus(booking.id, e.target.value as BookingStatus)}
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                    <option value="DP Diterima">DP Diterima</option>
                    <option value="Lunas & Terjadwal">Lunas & Terjadwal</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                <div>
                  <div className="text-xs text-slate-500">Total Biaya Paket</div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 font-mono tabular-nums">
                    {formatRupiah(booking.totalPrice)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Uang Muka / Terbayar</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-600 font-mono tabular-nums">
                    {formatRupiah(booking.paidAmount)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Sisa Tagihan Pelunasan</div>
                  <div className={`text-base sm:text-lg font-bold font-mono tabular-nums ${remainingBalance > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                    {formatRupiah(remainingBalance)}
                  </div>
                </div>
              </div>

              {/* Operational & Dispatch Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Rincian Penugasan & Logistik Perjalanan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-slate-500 block mb-0.5">Armada Transportasi:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {booking.busAssigned}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-slate-500 block mb-0.5">Pemandu Wisata / Tour Leader:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      {booking.tourLeader}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-slate-500 block mb-0.5">Pengemudi Utama:</span>
                    <span className="font-semibold text-slate-900">
                      {booking.driverName}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-slate-500 block mb-0.5">Kontak Penanggung Jawab:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {booking.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Catatan Kebutuhan Khusus / Permintaan Rombongan:
                </h4>
                <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/80 text-xs text-slate-700 leading-relaxed">
                  {booking.notes || 'Tidak ada catatan khusus.'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Diterbitkan oleh Sistem Manajemen Operasional PT Fajar Karya Wisata
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
