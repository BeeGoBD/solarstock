import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenAllCategories?: () => void;
}

// Realistic rendered Product Icon Component for each Category
export const RealisticProductIcon: React.FC<{ categoryId: string; iconUrl?: string; className?: string }> = ({
  categoryId,
  iconUrl,
  className = 'w-12 h-12'
}) => {
  if (iconUrl && iconUrl.startsWith('http')) {
    return (
      <img
        src={iconUrl}
        alt={categoryId}
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  switch (categoryId) {
    case 'ips-systems':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ipsBody" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="ipsScreen" x1="0" y1="0" x2="28" y2="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect x="6" y="14" width="52" height="38" rx="5" fill="url(#ipsBody)" stroke="#334155" strokeWidth="1.5" />
          <path d="M22 14V10C22 8.89543 22.8954 8 24 8H40C41.1046 8 42 8.89543 42 10V14" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="12" y="20" width="26" height="15" rx="2.5" fill="url(#ipsScreen)" stroke="#38bdf8" strokeWidth="0.8" />
          <path d="M15 27.5C18 24 20 31 23 27.5C26 24 28 31 31 27.5C33 25 35 29 36 27.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="15" y="22.5" width="8" height="2" rx="0.5" fill="#bae6fd" />
          <rect x="25" y="22.5" width="10" height="2" rx="0.5" fill="#fef08a" />
          <circle cx="48" cy="27" r="4.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="48" cy="27" r="2" fill="#22c55e" />
          <line x1="12" y1="41" x2="38" y2="41" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="45" x2="38" y2="45" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="44" cy="42" r="1.5" fill="#38bdf8" />
          <circle cx="48" cy="42" r="1.5" fill="#fbbf24" />
          <circle cx="52" cy="42" r="1.5" fill="#ef4444" />
        </svg>
      );

    case 'hybrid-inverters':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="invBody" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8fafc" />
              <stop offset="1" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="invScreen" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect x="10" y="8" width="44" height="48" rx="4" fill="url(#invBody)" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="10" y="8" width="44" height="4" rx="1" fill="#f59e0b" />
          <rect x="18" y="16" width="28" height="18" rx="2" fill="url(#invScreen)" stroke="#475569" strokeWidth="1" />
          <circle cx="24" cy="23" r="2.5" fill="#facc15" />
          <path d="M28 23H36" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1 1" />
          <path d="M33 27H23" stroke="#4ade80" strokeWidth="1.2" />
          <rect x="22" y="29.5" width="20" height="2" rx="0.5" fill="#38bdf8" />
          <circle cx="22" cy="38" r="1.5" fill="#94a3b8" />
          <circle cx="27" cy="38" r="1.5" fill="#94a3b8" />
          <circle cx="37" cy="38" r="1.5" fill="#94a3b8" />
          <circle cx="42" cy="38" r="1.5" fill="#94a3b8" />
          <line x1="16" y1="45" x2="48" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="49" x2="48" y2="49" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="24" y="10" width="16" height="2" rx="0.5" fill="#d97706" />
        </svg>
      );

    case 'lithium-batteries':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="batBody" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          <rect x="12" y="10" width="40" height="46" rx="4" fill="url(#batBody)" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="16" y="14" width="32" height="12" rx="2" fill="#0f172a" />
          <rect x="20" y="18" width="3" height="4" rx="0.5" fill="#22c55e" />
          <rect x="24.5" y="18" width="3" height="4" rx="0.5" fill="#22c55e" />
          <rect x="29" y="18" width="3" height="4" rx="0.5" fill="#22c55e" />
          <rect x="33.5" y="18" width="3" height="4" rx="0.5" fill="#22c55e" />
          <rect x="38" y="18" width="3" height="4" rx="0.5" fill="#22c55e" />
          <text x="32" y="24.5" fill="#38bdf8" fontSize="3" fontWeight="bold" textAnchor="middle">100%</text>
          <rect x="16" y="30" width="14" height="10" rx="1.5" fill="#334155" />
          <rect x="21" y="32" width="4" height="6" rx="1" fill="#ef4444" />
          <circle cx="38" cy="35" r="3" fill="#dc2626" />
          <circle cx="44" cy="35" r="3" fill="#0f172a" />
          <rect x="18" y="44" width="28" height="6" rx="1.5" fill="#f59e0b" />
          <text x="32" y="48.5" fill="#0f172a" fontSize="3.5" fontWeight="900" textAnchor="middle">LiFePO4 48V</text>
        </svg>
      );

    case 'monitor-screen':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monScreen" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#090d16" />
              <stop offset="1" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect x="8" y="12" width="48" height="34" rx="3.5" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <rect x="11" y="15" width="42" height="28" rx="2" fill="url(#monScreen)" />
          <path d="M14 36L20 30L26 33L33 23L41 27L48 19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="19" r="2" fill="#facc15" />
          <rect x="14" y="18" width="10" height="3" rx="0.5" fill="#4ade80" />
          <rect x="14" y="23" width="6" height="2" rx="0.5" fill="#facc15" />
          <circle cx="49" cy="18" r="1" fill="#22c55e" />
          <path d="M47 16C48 15 50 15 51 16" stroke="#4ade80" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M28 46H36V50H28V46Z" fill="#334155" />
          <rect x="22" y="50" width="20" height="3.5" rx="1.5" fill="#475569" />
        </svg>
      );

    case 'solar-panels':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pvGlass" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e3a8a" />
              <stop offset="0.5" stopColor="#172554" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="sunGleam" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="0.6" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="8" y="10" width="48" height="44" rx="2.5" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
          <rect x="11" y="13" width="42" height="38" rx="1" fill="url(#pvGlass)" />
          <line x1="25" y1="13" x2="25" y2="51" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="39" y1="13" x2="39" y2="51" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="11" y1="25.5" x2="53" y2="25.5" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="11" y1="38.5" x2="53" y2="38.5" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="18" y1="13" x2="18" y2="51" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="32" y1="13" x2="32" y2="51" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="46" y1="13" x2="46" y2="51" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M11 13L35 13L11 37Z" fill="url(#sunGleam)" />
          <circle cx="14" cy="16" r="1.2" fill="#facc15" />
        </svg>
      );

    case 'maintenance-group':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#facc15" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="meterGrad" x1="0" y1="0" x2="20" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <path d="M14 26C14 16.5 21.5 10 32 10C42.5 10 50 16.5 50 26H54C54.5 26 55 26.5 55 27V29C55 29.5 54.5 30 54 30H10C9.5 30 9 29.5 9 29V27C9 26.5 9.5 26 10 26H14Z" fill="url(#helmetGrad)" stroke="#b45309" strokeWidth="1.2" />
          <path d="M28 10V26H36V10" fill="#fde047" opacity="0.6" />
          <rect x="22" y="32" width="20" height="26" rx="3.5" fill="url(#meterGrad)" stroke="#7f1d1d" strokeWidth="1.2" />
          <rect x="25" y="35" width="14" height="7" rx="1" fill="#bae6fd" stroke="#0284c7" strokeWidth="0.8" />
          <text x="32" y="40" fill="#0369a1" fontSize="3.5" fontWeight="bold" textAnchor="middle">230.5V</text>
          <circle cx="32" cy="47" r="3.5" fill="#1e293b" />
          <line x1="32" y1="44" x2="32" y2="47" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          <circle cx="27" cy="54" r="1.5" fill="#0f172a" />
          <circle cx="37" cy="54" r="1.5" fill="#facc15" />
          <path d="M12 40L18 46M18 46L16 48M18 46L14 50" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'tubular-batteries':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tubBody" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect x="14" y="14" width="36" height="42" rx="3" fill="url(#tubBody)" stroke="#475569" strokeWidth="1.5" />
          <rect x="12" y="10" width="40" height="7" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <circle cx="20" cy="13.5" r="1.8" fill="#facc15" />
          <circle cx="25" cy="13.5" r="1.8" fill="#facc15" />
          <circle cx="30" cy="13.5" r="1.8" fill="#facc15" />
          <circle cx="34" cy="13.5" r="1.8" fill="#facc15" />
          <circle cx="39" cy="13.5" r="1.8" fill="#facc15" />
          <circle cx="44" cy="13.5" r="1.8" fill="#facc15" />
          <rect x="15" y="7" width="4" height="4" rx="1" fill="#dc2626" />
          <rect x="45" y="7" width="4" height="4" rx="1" fill="#0f172a" />
          <line x1="20" y1="24" x2="20" y2="48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="26" y1="24" x2="26" y2="48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="24" x2="32" y2="48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="24" x2="38" y2="48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="44" y1="24" x2="44" y2="48" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="22" y="28" width="20" height="6" rx="1" fill="#f59e0b" />
          <text x="32" y="32.5" fill="#0f172a" fontSize="3" fontWeight="bold" textAnchor="middle">200Ah</text>
        </svg>
      );

    case 'charge-controllers':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mpptBody" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          <rect x="12" y="10" width="40" height="46" rx="4" fill="url(#mpptBody)" stroke="#bae6fd" strokeWidth="1.2" />
          <rect x="18" y="16" width="28" height="15" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
          <text x="32" y="24" fill="#4ade80" fontSize="3.5" fontWeight="bold" textAnchor="middle">MPPT 60A</text>
          <text x="32" y="28.5" fill="#facc15" fontSize="2.5" textAnchor="middle">PV: 98V | 1250W</text>
          <circle cx="24" cy="36" r="2" fill="#e2e8f0" />
          <circle cx="32" cy="36" r="2" fill="#e2e8f0" />
          <circle cx="40" cy="36" r="2" fill="#e2e8f0" />
          <rect x="16" y="44" width="32" height="8" rx="1.5" fill="#1e293b" />
          <circle cx="20" cy="48" r="1.5" fill="#facc15" />
          <circle cx="25" cy="48" r="1.5" fill="#facc15" />
          <circle cx="30" cy="48" r="1.5" fill="#ef4444" />
          <circle cx="35" cy="48" r="1.5" fill="#0f172a" />
          <circle cx="40" cy="48" r="1.5" fill="#38bdf8" />
          <circle cx="44" cy="48" r="1.5" fill="#38bdf8" />
        </svg>
      );

    case 'solar-pumps':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pumpSteel" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94a3b8" />
              <stop offset="0.5" stopColor="#f8fafc" />
              <stop offset="1" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect x="23" y="16" width="18" height="38" rx="3" fill="url(#pumpSteel)" stroke="#475569" strokeWidth="1.2" />
          <path d="M27 16V10C27 9 28 8 29 8H35C36 8 37 9 37 10V16" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <circle cx="32" cy="7" r="2" fill="#38bdf8" />
          <path d="M25 6C27 4 37 4 39 6" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="36" x2="39" y2="36" stroke="#334155" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          <line x1="25" y1="40" x2="39" y2="40" stroke="#334155" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          <line x1="25" y1="44" x2="39" y2="44" stroke="#334155" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          <rect x="22" y="52" width="20" height="4" rx="1" fill="#334155" />
        </svg>
      );

    case 'solar-street-lights':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 56L24 22H30" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <rect x="24" y="16" width="32" height="14" rx="4" transform="rotate(5 24 16)" fill="#1e293b" stroke="#475569" strokeWidth="1.2" />
          <rect x="26" y="14" width="26" height="4" rx="1" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="0.5" />
          <rect x="28" y="22" width="20" height="6" rx="1.5" fill="#fef08a" />
          <circle cx="32" cy="25" r="1" fill="#f59e0b" />
          <circle cx="38" cy="25" r="1" fill="#f59e0b" />
          <circle cx="44" cy="25" r="1" fill="#f59e0b" />
          <circle cx="50" cy="26" r="2.5" fill="#e2e8f0" />
        </svg>
      );

    case 'solar-accessories':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="22" height="36" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="14" y="24" width="14" height="10" rx="1.5" fill="#0f172a" />
          <rect x="18" y="26" width="6" height="6" rx="1" fill="#ef4444" />
          <rect x="36" y="20" width="18" height="8" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="36" y="34" width="18" height="8" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <path d="M54 24H58" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <path d="M54 38H58" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="24" r="1.5" fill="#f59e0b" />
          <circle cx="45" cy="38" r="1.5" fill="#f59e0b" />
        </svg>
      );

    case 'solar-structures':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 48L32 16L52 48" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="36" x2="44" y2="36" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="8" y1="52" x2="56" y2="52" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <rect x="14" y="22" width="36" height="5" rx="1" transform="rotate(-15 14 22)" fill="#38bdf8" opacity="0.8" />
          <circle cx="32" cy="16" r="2.5" fill="#f59e0b" />
        </svg>
      );
  }
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onOpenAllCategories
}) => {
  const { categories } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif] tracking-tight">
            Shop by Categories
          </h2>
          <p className="text-xs text-neutral-500 hidden sm:block">
            Factory authorized equipment with certified warranties
          </p>
        </div>
        {onOpenAllCategories && (
          <button
            onClick={onOpenAllCategories}
            className="text-xs font-bold text-neutral-800 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>SEE ALL</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Categories Grid with High-Fidelity Realistic Equipment Icons */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="flex flex-col items-center text-center p-2.5 sm:p-3.5 rounded-xl bg-white border border-neutral-200/90 hover:border-amber-400 hover:shadow-md transition-all duration-200 group focus:outline-none"
          >
            {/* Realistic Product Icon Container */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-neutral-50 group-hover:bg-amber-50/70 border border-neutral-100 group-hover:border-amber-200 flex items-center justify-center p-1.5 mb-2 group-hover:scale-105 transition-all shadow-2xs">
              <RealisticProductIcon categoryId={cat.id} iconUrl={cat.icon} className="w-11 h-11 sm:w-12 sm:h-12" />
            </div>

            {/* Category Name */}
            <span className="text-[11px] sm:text-xs font-bold text-neutral-900 group-hover:text-amber-700 transition-colors line-clamp-1">
              {cat.name}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium hidden sm:inline-block">
              {cat.itemCount || 0}+ items
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
export default CategoryGrid;
