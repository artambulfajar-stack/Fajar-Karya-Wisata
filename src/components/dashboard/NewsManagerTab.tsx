import React, { useState } from 'react';
import { NewsArticle } from '../../types/news';
import { Plus, Search, Edit2, Trash2, Eye, Calendar, Clock, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { NewsEditorModal } from './NewsEditorModal';

interface NewsManagerTabProps {
  articles: NewsArticle[];
  onSaveArticle: (article: NewsArticle) => void;
  onDeleteArticle: (id: string) => void;
}

export const NewsManagerTab: React.FC<NewsManagerTabProps> = ({
  articles,
  onSaveArticle,
  onDeleteArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    setEditingArticle(null);
    setEditorModalOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setEditorModalOpen(true);
  };

  const handleTogglePublish = (article: NewsArticle) => {
    const updated: NewsArticle = {
      ...article,
      status: article.status === 'Dipublikasikan' ? 'Draf' : 'Dipublikasikan',
    };
    onSaveArticle(updated);
  };

  return (
    <div className="space-y-5">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Manajemen Berita & Publikasi Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tulis berita kegiatan wisata, tips edukasi, dan informasi layanan yang langsung tampil di halaman depan website.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tulis Berita Baru</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg overflow-x-auto text-xs">
          {['all', 'Dipublikasikan', 'Draf'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'all' ? 'Semua Berita' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari judul berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Articles Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-400">
            Belum ada artikel berita yang cocok. Silakan tambahkan berita baru.
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${
                        article.status === 'Dipublikasikan'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{article.publishedDate}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleTogglePublish(article)}
                  className={`font-semibold text-[11px] ${
                    article.status === 'Dipublikasikan'
                      ? 'text-slate-500 hover:text-slate-700'
                      : 'text-emerald-700 hover:text-emerald-800'
                  }`}
                >
                  {article.status === 'Dipublikasikan' ? 'Jadikan Draf' : 'Publikasikan'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold text-[11px]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus berita "${article.title}"?`)) {
                        onDeleteArticle(article.id);
                      }
                    }}
                    className="p-1 text-rose-600 hover:text-rose-800 rounded"
                    title="Hapus berita"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      <NewsEditorModal
        article={editingArticle}
        isOpen={editorModalOpen}
        onClose={() => {
          setEditorModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={onSaveArticle}
        onDelete={onDeleteArticle}
      />
    </div>
  );
};
