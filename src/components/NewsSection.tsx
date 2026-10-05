import React, { useState } from 'react';
import { NewsArticle } from '../types/news';
import { NewsDetailModal } from './NewsDetailModal';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';

interface NewsSectionProps {
  articles: NewsArticle[];
  onConsultArticleTopic: (topic: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  onConsultArticleTopic,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filter only published articles for public view
  const publishedArticles = articles.filter((a) => a.status === 'Dipublikasikan');

  if (publishedArticles.length === 0) return null;

  return (
    <section id="berita" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
              KABAR & INFORMASI WISATA
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Berita & Artikel Fajar Karya Wisata
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Wawasan destinasi, panduan perjalanan aman, dan pembaruan fasilitas operasional terkini dari tim kami.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Media Image */}
                <div
                  onClick={() => setSelectedArticle(article)}
                  className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Clean unboxed metadata with dot separator */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.publishedDate}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2.5 group-hover:text-amber-700 transition-colors cursor-pointer line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer with Read Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-400 font-medium">
                  Oleh: {article.author.split(' ')[0]}
                </span>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors focus:outline-none focus-visible:underline"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Modal */}
        <NewsDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onConsult={(topic) => {
            setSelectedArticle(null);
            onConsultArticleTopic(topic);
          }}
        />
      </div>
    </section>
  );
};
