'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Icons } from '@/components/ui/Icon';

interface ThemeSwitcherProps {
  settingsHref?: string;
  onOpenFavorites?: () => void;
  onOpenHistory?: () => void;
}

export function ThemeSwitcher({
  settingsHref,
  onOpenFavorites,
  onOpenHistory,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 bg-[var(--glass-bg)] backdrop-blur-xl [-webkit-backdrop-filter:blur(25px)] border border-[var(--glass-border)] rounded-[var(--radius-full)] p-1 shadow-[var(--shadow-sm)]">
      <button
        onClick={() => setTheme('light')}
        className={`
          flex items-center justify-center
          w-9 h-9
          rounded-[var(--radius-full)]
          transition-all duration-200
          cursor-pointer
          ${theme === 'light'
            ? 'bg-[var(--accent-color)] text-white scale-105'
            : 'text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]'
          }
        `}
        aria-label="设为浅色主题"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`
          flex items-center justify-center
          w-9 h-9
          rounded-[var(--radius-full)]
          transition-all duration-200
          cursor-pointer
          ${theme === 'dark'
            ? 'bg-[var(--accent-color)] text-white scale-105'
            : 'text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]'
          }
        `}
        aria-label="设为深色主题"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`
          flex items-center justify-center
          w-9 h-9
          rounded-[var(--radius-full)]
          transition-all duration-200
          cursor-pointer
          ${theme === 'system'
            ? 'bg-[var(--accent-color)] text-white scale-105'
            : 'text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]'
          }
        `}
        aria-label="设为系统主题"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
      {settingsHref && (
        <Link
          href={settingsHref}
          className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] transition-all duration-200 cursor-pointer text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]"
          aria-label="设置"
        >
          <svg className="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
        </Link>
      )}
      {onOpenFavorites && (
        <button
          onClick={onOpenFavorites}
          className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] transition-all duration-200 cursor-pointer text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]"
          aria-label="收藏"
          type="button"
        >
          <Icons.Heart size={20} className="text-current" />
        </button>
      )}
      {onOpenHistory && (
        <button
          onClick={onOpenHistory}
          className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-full)] transition-all duration-200 cursor-pointer text-[var(--text-color-secondary)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,transparent)]"
          aria-label="历史记录"
          type="button"
        >
          <Icons.History size={20} className="text-current" />
        </button>
      )}
    </div>
  );
}

