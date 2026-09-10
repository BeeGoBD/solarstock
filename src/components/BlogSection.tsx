import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowRight, BookOpen, Clock, Tag, MapPin, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BlogPost, ArchiveNewsItem } from '../types';
import { HISTORICAL_DISPATCHES } from '../data/mockData';
import { BlogDetailModal } from './BlogDetailModal';

interface BlogSectionProps {
  onSelectBlog?: (blog: BlogPost) => void;
  onSeeAll?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectBlog, onSeeAll }) => {
  const { blogs } = useStore();
  const [selectedModalBlog, setSelectedModalBlog] = useState<BlogPost | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedArchiveItem, setSelectedArchiveItem] = useState<ArchiveNewsItem | null>(null);

  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1);

  const handleOpenBlog = (blog: BlogPost) => {
    if (onSelectBlog) {
      onSelectBlog(blog);
    }
    setSelectedModalBlog(blog);
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Section Header matching video (00:19) */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] tracking-tight">
            Latest Blog Posts & Event Dispatches
          </h2>
          <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full hidden sm:inline-block">
            SolarStock Regional Intelligence
          </span>
        </div>
        <button
          onClick={() => {
            if (featuredBlog) handleOpenBlog(featuredBlog);
            if (onSeeAll) onSeeAll();
          }}
          className="text-xs font-bold text-neutral-600 hover:text-amber-600 bg-neutral-100 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          <span>READ ALL ARTICLES</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Blog Card */}
      {featuredBlog && (
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-4">
          {/* Blog Image */}
          <div
            onClick={() => handleOpenBlog(featuredBlog)}
            className="md:col-span-5 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 cursor-pointer group"
          >
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Blog Content */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Meta category & date matching video */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                <span className="text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
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
              <h3
                onClick={() => handleOpenBlog(featuredBlog)}
                className="text-base sm:text-2xl font-extrabold font-['Outfit',sans-serif] text-neutral-950 hover:text-amber-600 transition-colors leading-snug mb-2.5 cursor-pointer"
              >
                {featuredBlog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
                {featuredBlog.excerpt}
              </p>
            </div>

            {/* Read Article link */}
            <button
              onClick={() => handleOpenBlog(featuredBlog)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-neutral-950 hover:text-amber-600 uppercase tracking-wider group transition-colors self-start"
            >
              <span>READ FULL ARTICLE</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Secondary Blog Grid */}
      {secondaryBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secondaryBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleOpenBlog(blog)}
              className="bg-white rounded-xl border border-neutral-200/90 p-4 sm:p-5 hover:border-amber-400/80 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 mb-3">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 mb-1.5">
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-extrabold">
                    {blog.category}
                  </span>
                  <span>•</span>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-neutral-950 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                  {blog.title}
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs font-extrabold text-neutral-900 group-hover:text-amber-600 uppercase tracking-wider">
                <span>Read Analysis</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Historical Dispatches & Regional Milestones Archive */}
      <div className="mt-6 bg-neutral-50/80 rounded-2xl border border-neutral-200/80 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Regional Milestones & Exhibition Archive (SolarStock History)
            </h3>
            <span className="text-[10px] text-neutral-400 hidden sm:inline-block">
              • Archive records from regional desk dispatches
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowArchive(!showArchive)}
            className="text-xs font-bold text-neutral-600 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <span>{showArchive ? 'Collapse Archive' : 'View 4 Regional Dispatches'}</span>
            {showArchive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showArchive && (
          <div className="mt-4 pt-3 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-200">
            {HISTORICAL_DISPATCHES.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-2xs hover:border-amber-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 mb-1">
                    <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                      {item.category || 'Archive'}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mb-1.5 leading-snug">
                    {item.title}
                  </h4>
                  {item.location && (
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium mb-1">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="line-clamp-1">{item.location} {item.booth ? `(${item.booth})` : ''}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-neutral-600 line-clamp-3 leading-relaxed">
                    {item.summary || item.details}
                  </p>
                </div>
                {item.booth && (
                  <div className="mt-2 pt-1.5 border-t border-neutral-100 text-[10px] text-amber-900 font-bold">
                    Official Stall / Booth: {item.booth}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Blog Reader Modal */}
      <BlogDetailModal
        blog={selectedModalBlog}
        onClose={() => setSelectedModalBlog(null)}
        onSelectAnotherBlog={(b) => setSelectedModalBlog(b)}
        allBlogs={blogs}
      />
    </section>
  );
};

