import React, { useState, useEffect } from 'react';
import { HotelPartnerRecord } from '../../types/dashboard';
import { X, Save, Trash2, Hotel } from 'lucide-react';

interface HotelModalProps {
  hotel: HotelPartnerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (hotel: HotelPartnerRecord) => void;
  onDelete?: (id: string) => void;
}

export const HotelModal: React.FC<HotelModalProps> = ({
  hotel,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const isEditing = !!hotel;
  const [formData, setFormData] = useState<HotelPartnerRecord>({
    id: `hotel-${Date.now()}`,
    name: 'Hotel Pesona Alam',
    city: 'Batu, Malang',
    stars: 4,
    contractRate: 'Rp 650.000 / malam (Superior)',
    contactPerson: 'Bpk. Hendro',
    phone: '0341-550011',
    status: 'Mitra Aktif',
  });

  useEffect(() => {
    if (hotel) {
      setFormData({ ...hotel });
    } else {
      setFormData({
        id: `hotel-${Date.now()}`,
        name: '',
        city: 'Batu, Malang',
        stars: 4,
        contractRate: 'Rp 600.000 / malam',
        contactPerson: '',
        phone: '',
        status: 'Mitra Aktif',
      });
    }
  }, [hotel, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
              <Hotel className="w-4 h-4" />
              <span>{isEditing ? 'Edit Mitra Hotel' : 'Tambah Rekanan Hotel Baru'}</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? formData.name : 'Pendaftaran Akomodasi Mitra'}
            </h3>
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
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nama Hotel / Resort / Villa *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Golden Tulip Holland Resort"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kota / Wilayah *
              </label>
              <input
                type="text"
                required
                placeholder="Batu, Malang / Bromo / Yogyakarta"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Klasifikasi Bintang
              </label>
              <select
                value={formData.stars}
                onChange={(e) => setFormData({ ...formData, stars: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={3}>Bintang 3 (★★★)</option>
                <option value={4}>Bintang 4 (★★★★)</option>
                <option value={5}>Bintang 5 (★★★★★)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kesepakatan Tarif Kontrak Korporat *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Rp 650.000 / malam (Superior Twin Room)"
              value={formData.contractRate}
              onChange={(e) => setFormData({ ...formData, contractRate: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Sales / Kontak PIC
              </label>
              <input
                type="text"
                required
                placeholder="Ibu Ratna / Bpk. Yudi"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nomor Telepon Sales
              </label>
              <input
                type="text"
                required
                placeholder="0341-xxxxxx / 0812xxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Status Kemitraan
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Mitra Aktif">Mitra Aktif</option>
              <option value="Evaluasi Kontrak">Evaluasi Kontrak</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Yakin ingin menghapus ${formData.name}?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Mitra</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Hotel</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
