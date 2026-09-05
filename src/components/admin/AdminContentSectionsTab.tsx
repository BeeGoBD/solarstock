import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  HelpCircle,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  Upload,
  Calendar
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FaqItem, BlogPost, PeaceOfMindItem, SolarCareFeature } from '../../types';

export const AdminContentSectionsTab: React.FC = () => {
  const {
    peaceOfMind,
    updatePeaceOfMind,
    solarCare,
    updateSolarCare,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    blogs,
    addBlog,
    updateBlog,
    deleteBlog
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'peace' | 'care' | 'faqs' | 'blogs'>('peace');
  const [toast, setToast] = useState<string | null>(null);

  // Local state for forms
  const [peaceForm, setPeaceForm] = useState(() => ({
    ...peaceOfMind,
    items: peaceOfMind?.items || []
  }));
  const [careForm, setCareForm] = useState(() => ({
    ...solarCare,
    features: (solarCare?.features && solarCare.features.length > 0)
      ? solarCare.features
      : [
          {
            id: 'feat-1',
            title: solarCare?.feature1Title || 'Instant Unit Replacement',
            subtitle: solarCare?.feature1Desc || 'Zero waiting for repair parts'
          },
          {
            id: 'feat-2',
            title: solarCare?.feature2Title || '730 Days Surge Coverage',
            subtitle: solarCare?.feature2Desc || 'Full lightning & grid fluctuation cover'
          }
        ]
  }));

  const [editingFaq, setEditingFaq] = useState<{ index: number; item: FaqItem } | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSuccess(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Sub Tab Navigation */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveSubTab('peace')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'peace'
              ? 'bg-amber-400 text-neutral-950'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Peace of Mind Guarantee</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('care')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'care'
              ? 'bg-amber-400 text-neutral-950'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>SolarCare+ Warranty</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('faqs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'faqs'
              ? 'bg-amber-400 text-neutral-950'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQs ({faqs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('blogs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'blogs'
              ? 'bg-amber-400 text-neutral-950'
              : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Solar Guides & Blogs ({blogs.length})</span>
        </button>
      </div>

      {/* 1. PEACE OF MIND */}
      {activeSubTab === 'peace' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Peace of Mind Guarantee Bar
              </h3>
              <p className="text-xs text-neutral-400">
                Edit the 4-point security guarantees displayed across the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                updatePeaceOfMind(peaceForm);
                showToast('Peace of mind guarantee updated!');
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1">Section Title</label>
              <input
                type="text"
                value={peaceForm.title}
                onChange={(e) => setPeaceForm({ ...peaceForm, title: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2.5 rounded-lg outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1">Subtitle / Social Proof</label>
              <input
                type="text"
                value={peaceForm.subtitle}
                onChange={(e) => setPeaceForm({ ...peaceForm, subtitle: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2.5 rounded-lg outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              The 4 Guarantee Pillars:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(peaceForm.items || []).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400">Card #{idx + 1}</span>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => {
                        const nextItems = [...peaceForm.items];
                        nextItems[idx] = { ...item, tag: e.target.value };
                        setPeaceForm({ ...peaceForm, items: nextItems });
                      }}
                      placeholder="TAG"
                      className="bg-neutral-900 border border-neutral-700 text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono font-bold w-32 text-right"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Card Heading</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const nextItems = [...peaceForm.items];
                        nextItems[idx] = { ...item, title: e.target.value };
                        setPeaceForm({ ...peaceForm, items: nextItems });
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-1.5 rounded outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Description Subtext</label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => {
                        const nextItems = [...peaceForm.items];
                        nextItems[idx] = { ...item, subtitle: e.target.value };
                        setPeaceForm({ ...peaceForm, items: nextItems });
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-1.5 rounded outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SOLAR CARE+ */}
      {activeSubTab === 'care' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                SolarCare+ Protection Banner
              </h3>
              <p className="text-xs text-neutral-400">
                Configure headlines, replacement guarantees, and emergency hotlines.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                updateSolarCare(careForm);
                showToast('SolarCare+ section saved!');
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Headline</label>
                <input
                  type="text"
                  value={careForm.title}
                  onChange={(e) => setCareForm({ ...careForm, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2.5 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={careForm.tag}
                  onChange={(e) => setCareForm({ ...careForm, tag: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2.5 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1">Description Paragraph</label>
              <textarea
                rows={2}
                value={careForm.description}
                onChange={(e) => setCareForm({ ...careForm, description: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2.5 rounded-lg outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Highlight Feature Cards:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(careForm.features || []).map((feat, idx) => (
                  <div
                    key={feat.id || idx}
                    className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 space-y-2"
                  >
                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-0.5">Feature Title</label>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const nextFeats = [...careForm.features];
                          nextFeats[idx] = { ...feat, title: e.target.value };
                          setCareForm({ ...careForm, features: nextFeats });
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-1.5 rounded outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-0.5">Feature Subtitle</label>
                      <input
                        type="text"
                        value={feat.subtitle}
                        onChange={(e) => {
                          const nextFeats = [...careForm.features];
                          nextFeats[idx] = { ...feat, subtitle: e.target.value };
                          setCareForm({ ...careForm, features: nextFeats });
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-1.5 rounded outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FAQS */}
      {activeSubTab === 'faqs' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Store FAQs & SEO Answers
              </h3>
              <p className="text-xs text-neutral-400">
                Add, edit, or remove frequently asked questions shown at the bottom of the store.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingFaq({
                  index: -1,
                  item: {
                    q: 'New Question regarding Solarstock warranty or delivery?',
                    a: 'Detailed engineering response explaining product authenticity and warranty coverage.'
                  }
                });
                setIsAddingFaq(true);
              }}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 space-y-2 group hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs font-bold text-white leading-tight">{faq.q}</h5>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaq({ index: idx, item: { ...faq } });
                        setIsAddingFaq(false);
                      }}
                      className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete this FAQ item?')) {
                          deleteFaq(idx);
                          showToast('FAQ deleted.');
                        }
                      }}
                      className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BLOGS */}
      {activeSubTab === 'blogs' && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Solar Guides & Technical Articles
              </h3>
              <p className="text-xs text-neutral-400">
                Publish articles on solar sizing, battery care, and government net metering.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingBlog({
                  id: `blog-${Date.now()}`,
                  title: 'New Solar Installation Guide',
                  category: 'Guides',
                  readTime: '4 min read',
                  date: 'September 2026',
                  summary: 'Comprehensive tips for residential solar installations in Bangladesh.',
                  image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
                  tags: ['Solar', 'Batteries']
                });
                setIsAddingBlog(true);
              }}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Blog Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex gap-3 group hover:border-neutral-700 transition-colors"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-20 h-20 rounded-lg object-cover border border-neutral-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-amber-400 block">{blog.date}</span>
                  <h5 className="text-xs font-bold text-white line-clamp-1">{blog.title}</h5>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">{blog.summary}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBlog(blog);
                      setIsAddingBlog(false);
                    }}
                    className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
                    title="Edit Blog"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Delete this blog post?')) {
                        deleteBlog(blog.id);
                        showToast('Blog deleted.');
                      }
                    }}
                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                    title="Delete Blog"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT FAQ MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-5 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              {isAddingFaq ? 'Add Question & Answer' : 'Edit Question & Answer'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Question</label>
                <input
                  type="text"
                  value={editingFaq.item.q}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      item: { ...editingFaq.item, q: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Answer</label>
                <textarea
                  rows={4}
                  value={editingFaq.item.a}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      item: { ...editingFaq.item, a: e.target.value }
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isAddingFaq) {
                    addFaq(editingFaq.item);
                  } else {
                    updateFaq(editingFaq.index, editingFaq.item);
                  }
                  setEditingFaq(null);
                  showToast('FAQ saved!');
                }}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BLOG MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              {isAddingBlog ? 'Add Blog Post' : 'Edit Blog Post'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Blog Title</label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Date</label>
                  <input
                    type="text"
                    value={editingBlog.date}
                    onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Summary</label>
                <textarea
                  rows={3}
                  value={editingBlog.summary}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingBlog.image}
                    onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                    className="flex-1 bg-neutral-950 border border-neutral-700 text-xs text-white p-2 rounded-lg outline-none focus:border-amber-400"
                  />
                  <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white rounded-lg flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => setEditingBlog({ ...editingBlog, image: url }))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isAddingBlog) {
                    addBlog(editingBlog);
                  } else {
                    updateBlog(editingBlog.id, editingBlog);
                  }
                  setEditingBlog(null);
                  showToast('Blog saved!');
                }}
                className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Blog</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
