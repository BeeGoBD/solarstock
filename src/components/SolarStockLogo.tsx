import React from 'react';

interface SolarStockLogoProps {
  /**
   * Layout format of the logo:
   * - 'horizontal': Emblem on left, "SOLARSTOCK" and optional tagline on right (ideal for headers)
   * - 'stacked': Emblem centered on top, typography centered below (ideal for modals, splash, hero, footer)
   * - 'mark': Emblem only (sun + S wave, ideal for compact buttons, avatars, mobile app bar)
   * - 'wordmark': "SOLARSTOCK" typography only
   */
  variant?: 'horizontal' | 'stacked' | 'mark' | 'wordmark';
  /**
   * Theme mode:
   * - 'light': Default, for white and light gray backgrounds
   * - 'dark': For dark backgrounds (e.g., footer, dark modals), keeping high contrast
   */
  theme?: 'light' | 'dark';
  /**
   * Whether to display the official tagline "We stock solar"
   * Default: true for stacked, true for horizontal on desktop, false for mark
   */
  showTagline?: boolean;
  /**
   * Sizing scale presets or custom
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  /**
   * Custom classes to apply to container
   */
  className?: string;
  /**
   * ID for testing or targeting
   */
  id?: string;
}

/**
 * Official SolarStock Vector Emblem (Sun + Dynamic S-Wave)
 * Razor-sharp SVG with pure transparent background, exactly matching the official brand identity.
 */
export const SolarStockEmblem: React.FC<{
  className?: string;
  theme?: 'light' | 'dark';
}> = ({ className = 'w-10 h-10', theme = 'light' }) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      aria-label="SolarStock Logo Emblem"
    >
      <g>
        {/* Sun Rays radiating outwards to top-left */}
        <g stroke="#F37023" strokeWidth="3.2" strokeLinecap="round">
          {/* 7 distinct sun rays */}
          <line x1="47" y1="36" x2="42" y2="24" />
          <line x1="36" y1="44" x2="28" y2="34" />
          <line x1="28" y1="56" x2="17" y2="48" />
          <line x1="24" y1="70" x2="11" y2="67" />
          <line x1="24" y1="84" x2="10" y2="85" />
          <line x1="28" y1="98" x2="17" y2="103" />
          <line x1="36" y1="110" x2="27" y2="118" />
        </g>

        {/* Sun Disk nestled in upper-left crook of the S */}
        <circle cx="56" cy="74" r="19" fill="#F37023" />

        {/* Outer Orange Accent Swoosh (Upper right shoulder + Lower outer contour) */}
        <path
          d="M 52 58
             C 80 40, 114 44, 128 66
             C 131 71, 127 77, 121 75
             C 112 72, 100 71, 89 73
             C 73 76, 59 86, 52 101
             C 45 115, 47 130, 56 142
             C 68 157, 88 170, 110 168
             C 118 167, 124 163, 126 158
             C 124 165, 116 172, 105 174
             C 78 176, 53 158, 42 138
             C 32 120, 33 96, 44 78
             C 46 72, 48 65, 52 58 Z"
          fill="#F37023"
        />

        {/* Outer Orange Crest highlight on top right */}
        <path
          d="M 85 46
             C 106 48, 124 57, 131 72
             C 125 70, 115 67, 103 68
             C 115 62, 102 50, 85 46 Z"
          fill="#F37023"
        />

        {/* Main Green "S" Wave / Leaf Body */}
        <path
          d="M 58 62
             C 83 48, 112 52, 124 68
             C 125 70, 122 73, 118 72
             C 107 68, 94 68, 83 74
             C 68 81, 56 94, 52 110
             C 48 126, 54 142, 66 152
             C 80 164, 100 168, 117 162
             C 110 170, 97 174, 85 173
             C 65 171, 51 157, 43 140
             C 36 122, 39 100, 49 81
             C 52 74, 54 68, 58 62 Z"
          fill="#398E2E"
        />

        {/* Inner Green Leaf Body Contour & Rich Depth */}
        <path
          d="M 64 64
             C 88 52, 112 55, 122 69
             C 111 66, 98 67, 88 72
             C 70 82, 58 98, 56 120
             C 54 136, 62 150, 76 159
             C 90 167, 106 168, 120 162
             C 112 170, 98 174, 86 173
             C 64 171, 50 155, 46 137
             C 42 116, 49 93, 64 64 Z"
          fill="#398E2E"
        />

        {/* Lower Orange Energy Sweep */}
        <path
          d="M 86 173
             C 100 173, 113 167, 122 158
             C 119 164, 111 170, 101 172
             C 95 173, 90 173, 86 173 Z"
          fill="#F37023"
        />
      </g>
    </svg>
  );
};

/**
 * SolarStock Main Brand Logo Component
 */
export const SolarStockLogo: React.FC<SolarStockLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  showTagline = true,
  size = 'md',
  className = '',
  id
}) => {
  // Sizing definitions
  const sizeStyles = {
    xs: {
      emblem: 'w-6 h-6',
      text: 'text-sm',
      tagline: 'text-[7.5px]',
      gap: 'gap-1.5'
    },
    sm: {
      emblem: 'w-8 h-8',
      text: 'text-base sm:text-lg',
      tagline: 'text-[8px] sm:text-[9px]',
      gap: 'gap-2'
    },
    md: {
      emblem: 'w-9 h-9 sm:w-11 sm:h-11',
      text: 'text-lg sm:text-2xl',
      tagline: 'text-[9px] sm:text-[10.5px]',
      gap: 'gap-2 sm:gap-2.5'
    },
    lg: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      text: 'text-2xl sm:text-3xl',
      tagline: 'text-[11px] sm:text-[13px]',
      gap: 'gap-3'
    },
    xl: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      text: 'text-3xl sm:text-4xl',
      tagline: 'text-xs sm:text-sm',
      gap: 'gap-3.5'
    },
    custom: {
      emblem: '',
      text: '',
      tagline: '',
      gap: 'gap-2'
    }
  }[size];

  // Mark only
  if (variant === 'mark') {
    return (
      <div id={id} className={`inline-flex items-center justify-center ${className}`}>
        <SolarStockEmblem className={sizeStyles.emblem} theme={theme} />
      </div>
    );
  }

  // Wordmark only
  if (variant === 'wordmark') {
    return (
      <div id={id} className={`inline-flex flex-col select-none ${className}`}>
        <div className={`font-black italic tracking-tighter uppercase font-['Outfit',sans-serif] ${sizeStyles.text} leading-none`}>
          <span className="text-[#F37023]">SOLAR</span>
          <span className="text-[#398E2E]">STOCK</span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-[0.22em] lowercase font-['Plus_Jakarta_Sans',sans-serif] ${sizeStyles.tagline} mt-0.5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-[#398E2E]'
            }`}
          >
            We stock solar
          </span>
        )}
      </div>
    );
  }

  // Stacked format (Emblem top, text bottom)
  if (variant === 'stacked') {
    return (
      <div
        id={id}
        className={`inline-flex flex-col items-center text-center select-none ${className}`}
      >
        <SolarStockEmblem className={sizeStyles.emblem} theme={theme} />
        <div className="mt-1.5 flex flex-col items-center">
          <div className={`font-black italic tracking-tighter uppercase font-['Outfit',sans-serif] ${sizeStyles.text} leading-tight`}>
            <span className="text-[#F37023]">SOLAR</span>
            <span className="text-[#398E2E]">STOCK</span>
          </div>
          {showTagline && (
            <span
              className={`font-medium tracking-[0.24em] lowercase font-['Plus_Jakarta_Sans',sans-serif] ${sizeStyles.tagline} mt-0.5 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-[#398E2E]'
              }`}
            >
              We stock solar
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal format (Standard Header & Navbar)
  return (
    <div
      id={id}
      className={`inline-flex items-center ${sizeStyles.gap} select-none ${className}`}
    >
      <SolarStockEmblem className={sizeStyles.emblem} theme={theme} />
      <div className="flex flex-col justify-center text-left">
        <div className={`font-black italic tracking-tighter uppercase font-['Outfit',sans-serif] ${sizeStyles.text} leading-none flex items-baseline`}>
          <span className="text-[#F37023]">SOLAR</span>
          <span className="text-[#398E2E]">STOCK</span>
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-[0.2em] sm:tracking-[0.24em] lowercase font-['Plus_Jakarta_Sans',sans-serif] ${sizeStyles.tagline} mt-0.5 block whitespace-nowrap ${
              theme === 'dark' ? 'text-emerald-400' : 'text-[#398E2E]'
            }`}
          >
            We stock solar
          </span>
        )}
      </div>
    </div>
  );
};

export default SolarStockLogo;
