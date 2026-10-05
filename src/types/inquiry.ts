export interface ConsultationInquiry {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  destination: string;
  participants: number;
  duration?: string;
  notes: string;
  createdAt: string;
  status: 'Menunggu Balasan' | 'Sudah Dibalas' | 'Dikonversi ke Booking';
  adminReplyNotes?: string;
  repliedAt?: string;
}
