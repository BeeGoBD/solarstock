import React from 'react';
import { ChevronRight, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectBlog?: (blog: BlogPost) => void;
  onSeeAll?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectBlog, onSeeAll }) => {
  const featuredBlog = BLOG_POSTS[0];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Section Header matching video (00:19) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] tracking-tight">
            Latest Blog Posts
          </h2>
          <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full hidden sm:inline-block">
            Solar Knowledge & Guides
          </span>
        </div>
        <button
          onClick={onSeeAll}
          className="text-xs font-bold text-neutral-600 hover:text-amber-600 bg-neutral-100 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          <span>SEE ALL</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Blog Card matching video style */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Blog Image */}
        <div className="md:col-span-5 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
          <img
            src={featuredBlog.image}
            alt={featuredBlog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Blog Content */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Meta category & date matching video */}
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              <span className="text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                {featuredBlog.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Calendar className="w-3 h-3" />
                {featuredBlog.date}
              </span>
              <span>•</span>
              <span className="text-neutral-500">{featuredBlog.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-2xl font-extrabold font-['Outfit',sans-serif] text-neutral-950 hover:text-amber-600 transition-colors leading-snug mb-2.5">
              {featuredBlog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
              {featuredBlog.excerpt}
            </p>
          </div>

          {/* See more link matching video */}
          <button
            onClick={() => onSelectBlog && onSelectBlog(featuredBlog)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-neutral-950 hover:text-amber-600 uppercase tracking-wider group transition-colors self-start"
          >
            <span>SEE MORE</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
