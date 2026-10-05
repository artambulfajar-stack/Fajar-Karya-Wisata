export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  status: 'Dipublikasikan' | 'Draf';
  featured?: boolean;
}
