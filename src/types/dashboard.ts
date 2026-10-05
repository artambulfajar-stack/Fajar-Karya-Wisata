export type BookingStatus =
  | 'Menunggu Konfirmasi'
  | 'DP Diterima'
  | 'Lunas & Terjadwal'
  | 'Sedang Berjalan'
  | 'Selesai';

export interface BookingRecord {
  id: string;
  clientName: string;
  clientType: 'Sekolah' | 'Instansi / Korporasi' | 'Keluarga' | 'Komunitas';
  packageName: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  paxCount: number;
  totalPrice: number;
  paidAmount: number;
  status: BookingStatus;
  busAssigned: string;
  driverName: string;
  tourLeader: string;
  phone: string;
  createdAt: string;
  notes: string;
}

export type FleetStatus = 'Tersedia' | 'Sedang Beroperasi' | 'Perawatan / Servis';

export interface FleetRecord {
  id: string;
  unitCode: string;
  model: string;
  plateNumber: string;
  capacity: number;
  status: FleetStatus;
  currentDriver: string;
  currentLocation: string;
  lastService: string;
  kirExpiry: string;
}

export interface HotelPartnerRecord {
  id: string;
  name: string;
  city: string;
  stars: number;
  contractRate: string;
  contactPerson: string;
  phone: string;
  status: 'Mitra Aktif' | 'Evaluasi Kontrak';
}

export interface AdminUser {
  username: string;
  name: string;
  role: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  headline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  address: string;
  operationalHours: string;
  monthlyRevenueTarget: number;
  internalNotice: string;
  heroImageUrl?: string;
  aboutImageUrl?: string;
}
