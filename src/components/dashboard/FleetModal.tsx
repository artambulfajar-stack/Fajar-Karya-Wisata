import React, { useState, useEffect } from 'react';
import { FleetRecord, FleetStatus } from '../../types/dashboard';
import { X, Save, Trash2, Bus } from 'lucide-react';

interface FleetModalProps {
  fleet: FleetRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (fleet: FleetRecord) => void;
  onDelete?: (id: string) => void;
}

export const FleetModal: React.FC<FleetModalProps> = ({
  fleet,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const isEditing = !!fleet;
  const [formData, setFormData] = useState<FleetRecord>({
    id: `fleet-${Date.now()}`,
    unitCode: 'FKW-07 "New Priority"',
    model: 'Jetbus 5 HDD Mercedes-Benz OH 1626',
    plateNumber: 'N 7007 FKW',
    capacity: 50,
    status: 'Tersedia',
    currentDriver: 'Kapten Baru',
    currentLocation: 'Pool Utama Malang',
    lastService: '2026-10-01',
    kirExpiry: '2027-08-30',
  });

  useEffect(() => {
    if (fleet) {
      setFormData({ ...fleet });
    } else {
      setFormData({
        id: `fleet-${Date.now()}`,
        unitCode: 'FKW-07 "New Priority"',
        model: 'Jetbus 5 HDD Mercedes-Benz OH 1626',
        plateNumber: 'N 7007 FKW',
        capacity: 50,
        status: 'Tersedia',
        currentDriver: 'Kapten Driver',
        currentLocation: 'Pool Utama Malang',
        lastService: '2026-10-01',
        kirExpiry: '2027-08-30',
      });
    }
  }, [fleet, isOpen]);

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
              <Bus className="w-4 h-4" />
              <span>{isEditing ? 'Edit Unit Armada' : 'Tambah Unit Armada Baru'}</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? formData.unitCode : 'Pendaftaran Unit Kendaraan'}
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
              Kode & Nama Julukan Unit *
            </label>
            <input
              type="text"
              required
              placeholder='Contoh: FKW-01 "Priority Star"'
              value={formData.unitCode}
              onChange={(e) => setFormData({ ...formData, unitCode: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tipe Bodi & Karoseri
              </label>
              <input
                type="text"
                required
                placeholder="Jetbus 3+ HDD Mercedes-Benz"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nomor Polisi (Plat Nomor) *
              </label>
              <input
                type="text"
                required
                placeholder="N 7001 FKW"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kapasitas Kursi (Seat)
              </label>
              <input
                type="number"
                min="4"
                max="65"
                required
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status Operasional
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as FleetStatus })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Tersedia">Tersedia (Ready to Roll)</option>
                <option value="Sedang Beroperasi">Sedang Beroperasi (Di Lapangan)</option>
                <option value="Perawatan / Servis">Perawatan / Servis Rutin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kapten Driver
              </label>
              <input
                type="text"
                value={formData.currentDriver}
                onChange={(e) => setFormData({ ...formData, currentDriver: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lokasi Unit Saat Ini
              </label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tgl Terakhir Servis
              </label>
              <input
                type="text"
                value={formData.lastService}
                onChange={(e) => setFormData({ ...formData, lastService: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Masa Berlaku Uji KIR
              </label>
              <input
                type="text"
                value={formData.kirExpiry}
                onChange={(e) => setFormData({ ...formData, kirExpiry: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Yakin ingin menghapus unit ${formData.unitCode}?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Unit</span>
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
                <span>Simpan Armada</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
