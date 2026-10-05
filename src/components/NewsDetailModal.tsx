import React, { useState } from 'react';
import { NewsArticle } from '../types/news';
import { X, Calendar, Clock, User, Share2, Check, MessageCircle, ArrowRight } from 'lucide-react';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onConsult: (topic: string) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  onClose,
  onConsult,
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header Media */}
        <div className="relative h-56 sm:h-72 shrink-0 bg-slate-900">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Tutup artikel"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight text-balance">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 text-slate-800">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-amber-600" />
                {article.author}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedDate}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tautan Tersalin</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan Artikel</span>
                </>
              )}
            </button>
          </div>

          {/* Excerpt */}
          <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm font-medium text-slate-700 leading-relaxed italic">
            &ldquo;{article.excerpt}&rdquo;
          </div>

          {/* Article Prose Paragraphs */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-8 p-5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Rencanakan Perjalanan Wisata Anda Bersama Kami
              </h4>
              <p className="text-xs text-amber-900/80 mt-0.5">
                Konsultasikan kebutuhan paket perjalanan, armada bus, atau custom trip dengan standar Service Of Priority.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onConsult(`Konsultasi terkait artikel: ${article.title}`);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi Sekarang</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
