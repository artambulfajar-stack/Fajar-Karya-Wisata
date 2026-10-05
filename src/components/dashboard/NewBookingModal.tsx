import React, { useState } from 'react';
import { BookingRecord, BookingStatus } from '../../types/dashboard';
import { X, Plus, Calendar, DollarSign, Users, MapPin, Bus } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking: (booking: BookingRecord) => void;
  initialData?: Partial<BookingRecord>;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
  initialData,
}) => {
  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [clientType, setClientType] = useState<BookingRecord['clientType']>(
    initialData?.clientType || 'Sekolah'
  );
  const [packageName, setPackageName] = useState(
    initialData?.packageName || 'Study Tour Edukasi Yogyakarta 3D2N'
  );
  const [destination, setDestination] = useState(initialData?.destination || 'Yogyakarta & Sekitarnya');
  const [departureDate, setDepartureDate] = useState(initialData?.departureDate || '2026-11-15');
  const [returnDate, setReturnDate] = useState(initialData?.returnDate || '2026-11-17');
  const [paxCount, setPaxCount] = useState(initialData?.paxCount || 45);
  const [totalPrice, setTotalPrice] = useState(initialData?.totalPrice || 39375000);
  const [paidAmount, setPaidAmount] = useState(initialData?.paidAmount || 15000000);
  const [status, setStatus] = useState<BookingStatus>(initialData?.status || 'DP Diterima');
  const [busAssigned, setBusAssigned] = useState(initialData?.busAssigned || 'FKW-01 (Jetbus 3+ HDD 50 Seat)');
  const [driverName, setDriverName] = useState(initialData?.driverName || 'Pak Sukardi');
  const [tourLeader, setTourLeader] = useState(initialData?.tourLeader || 'Bagas Pratama');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  React.useEffect(() => {
    if (initialData && isOpen) {
      if (initialData.clientName) setClientName(initialData.clientName);
      if (initialData.clientType) setClientType(initialData.clientType);
      if (initialData.packageName) setPackageName(initialData.packageName);
      if (initialData.destination) setDestination(initialData.destination);
      if (initialData.paxCount) setPaxCount(initialData.paxCount);
      if (initialData.phone) setPhone(initialData.phone);
      if (initialData.notes) setNotes(initialData.notes);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newRecord: BookingRecord = {
      id: `FKW-2026-${randomSuffix}`,
      clientName,
      clientType,
      packageName,
      destination,
      departureDate,
      returnDate,
      paxCount: Number(paxCount),
      totalPrice: Number(totalPrice),
      paidAmount: Number(paidAmount),
      status,
      busAssigned,
      driverName,
      tourLeader,
      phone,
      createdAt: new Date().toISOString().split('T')[0],
      notes,
    };

    onAddBooking(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Tambah Reservasi Perjalanan Baru
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Input data rombongan, alokasi armada, dan status pembayaran operasional.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1 text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Rombongan / Klien *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: SMAN 3 Surabaya"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategori Klien
              </label>
              <select
                value={clientType}
                onChange={(e) => setClientType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Sekolah">Sekolah / Eduwisata</option>
                <option value="Instansi / Korporasi">Instansi / Korporasi</option>
                <option value="Keluarga">Keluarga</option>
                <option value="Komunitas">Komunitas / Umum</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Paket Wisata
              </label>
              <input
                type="text"
                required
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destinasi Tujuan
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tgl Berangkat
              </label>
              <input
                type="date"
                required
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tgl Pulang
              </label>
              <input
                type="date"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Jumlah Peserta (Pax)
              </label>
              <input
                type="number"
                min="1"
                required
                value={paxCount}
                onChange={(e) => setPaxCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Total Biaya (Rp)
              </label>
              <input
                type="number"
                required
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Sudah Bayar / DP (Rp)
              </label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status Operasional
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="DP Diterima">DP Diterima</option>
                <option value="Lunas & Terjadwal">Lunas & Terjadwal</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Armada Bus
              </label>
              <input
                type="text"
                value={busAssigned}
                onChange={(e) => setBusAssigned(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Driver Utama
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tour Leader (TL)
              </label>
              <input
                type="text"
                value={tourLeader}
                onChange={(e) => setTourLeader(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                No. HP / WhatsApp Klien *
              </label>
              <input
                type="tel"
                required
                placeholder="0812xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Catatan Operasional
              </label>
              <input
                type="text"
                placeholder="Fasilitas khusus, banner rombongan, dll"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Reservasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
