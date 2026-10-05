import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle } from '../../types/news';
import { X, Save, Trash2, Image, FileText, CheckCircle2, Upload, Link, Sparkles } from 'lucide-react';
import heroBromo from '../../assets/images/hero_travel_bromo_1791223504621.jpg';
import tourBus from '../../assets/images/tour_bus_fleet_1791223520045.jpg';
import studyTour from '../../assets/images/study_tour_students_1791223533857.jpg';
import familyBatu from '../../assets/images/family_vacation_batu_1791223546638.jpg';

interface NewsEditorModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: NewsArticle) => void;
  onDelete?: (id: string) => void;
}

export const NewsEditorModal: React.FC<NewsEditorModalProps> = ({
  article,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const isEditing = !!article;

  const availableCoverPresets = [
    { label: 'Wisata Bromo Sunrise', path: heroBromo },
    { label: 'Armada Bus Eksekutif', path: tourBus },
    { label: 'Kegiatan Study Tour', path: studyTour },
    { label: 'Keluarga di Batu Malang', path: familyBatu },
  ];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Edukasi & Tips Wisata');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Redaksi Fajar Karya Wisata');
  const [readTime, setReadTime] = useState('3 menit baca');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'Dipublikasikan' | 'Draf'>('Dipublikasikan');
  const [coverImage, setCoverImage] = useState(heroBromo);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 5MB.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCoverImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = () => {
    if (customImageUrl.trim()) {
      setCoverImage(customImageUrl.trim());
      setCustomImageUrl('');
    }
  };

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setCategory(article.category);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setAuthor(article.author);
      setReadTime(article.readTime);
      setPublishedDate(article.publishedDate);
      setStatus(article.status);
      setCoverImage(article.coverImage);
    } else {
      setTitle('');
      setCategory('Edukasi & Tips Wisata');
      setExcerpt('');
      setContent('');
      setAuthor('Redaksi Fajar Karya Wisata');
      setReadTime('3 menit baca');
      setPublishedDate(new Date().toISOString().split('T')[0]);
      setStatus('Dipublikasikan');
      setCoverImage(heroBromo);
    }
  }, [article, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const savedArticle: NewsArticle = {
      id: article ? article.id : `news-${Date.now()}`,
      title,
      slug: slug || 'berita-fkw',
      category,
      excerpt,
      content,
      author,
      publishedDate,
      readTime,
      coverImage,
      status,
    };

    onSave(savedArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
              <FileText className="w-4 h-4" />
              <span>{isEditing ? 'Edit Artikel Berita' : 'Tulis Berita Baru untuk Website'}</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {isEditing ? title || 'Edit Berita' : 'Publikasi Berita & Kabar Wisata'}
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
              Judul Berita / Artikel *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Rekomendasi Destinasi Liburan Sekolah Favorit di Jawa Timur"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kategori Berita
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Edukasi & Tips Wisata">Edukasi & Tips Wisata</option>
                <option value="Destinasi Unggulan">Destinasi Unggulan</option>
                <option value="Kabar Perusahaan">Kabar Perusahaan</option>
                <option value="Promo & Kegiatan">Promo & Kegiatan</option>
                <option value="Info Pariwisata">Info Pariwisata</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status Publikasi
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Dipublikasikan">Dipublikasikan (Tampil di Web)</option>
                <option value="Draf">Draf (Disimpan Internal)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tanggal Publikasi
              </label>
              <input
                type="date"
                required
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Foto Sampul Berita dengan Upload File & URL */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Foto Sampul Berita (Bisa Upload dari HP/Komputer)
              </label>
              {uploadError && (
                <span className="text-[11px] text-rose-600 font-semibold">{uploadError}</span>
              )}
            </div>

            {/* Current Selected Preview & Uploader Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden border border-slate-300 shadow-sm shrink-0 bg-slate-200">
                <img
                  src={coverImage}
                  alt="Pratinjau Sampul"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[10px] py-0.5 text-center font-medium">
                  Pratinjau Foto
                </div>
              </div>

              <div className="flex-1 space-y-2.5 w-full">
                {/* File Upload Button */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto dari Perangkat (Galeri/File)</span>
                  </button>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Mendukung file JPG, PNG, atau WebP (Maks. 5MB).
                  </p>
                </div>

                {/* Custom URL Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="url"
                      placeholder="Atau masukkan tautan URL gambar (https://...)"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600 mb-1.5 block">
                Atau pilih dari foto dokumentasi resmi FKW:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableCoverPresets.map((preset) => (
                  <div
                    key={preset.label}
                    onClick={() => setCoverImage(preset.path)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all aspect-[4/3] group ${
                      coverImage === preset.path
                        ? 'border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.path}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[9px] text-white font-medium line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                    {coverImage === preset.path && (
                      <div className="absolute top-1 right-1 bg-amber-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Penulis (Author)
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimasi Waktu Baca
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Ringkasan Singkat (Excerpt) *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Tuliskan 1-2 kalimat pengantar menarik yang menjelaskan garis besar berita..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Isi Konten Berita Lengkap *
            </label>
            <textarea
              rows={8}
              required
              placeholder="Tuliskan isi berita lengkap di sini. Gunakan baris kosong untuk memisahkan antar paragraf..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
                    onDelete(article!.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Berita</span>
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
                <span>{status === 'Dipublikasikan' ? 'Publikasikan ke Website' : 'Simpan Draf'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
