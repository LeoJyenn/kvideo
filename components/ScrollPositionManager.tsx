'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { settingsStore } from '@/lib/store/settings-store';

/**
 * ScrollPositionManager - Maintains scroll position across navigation and refreshes
 * Uses sessionStorage to persist scroll state per URL
 */
export function ScrollPositionManager() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Create a unique key for the current page including search params
    const getPageKey = useCallback(() => {
        const params = searchParams.toString();
        return `scroll-pos:${pathname}${params ? '?' + params : ''}`;
    }, [pathname, searchParams]);

    // Restoration logic
    useEffect(() => {
        const settings = settingsStore.getSettings();
        if (!settings.rememberScrollPosition) return;

        const key = getPageKey();
        const savedPos = sessionStorage.getItem(key);

        if (savedPos) {
            const position = parseInt(savedPos, 10);
            if (!isNaN(position) && position > 0) {
                // We use multiple attempts to restore scroll because content might be loading dynamically
                // (e.g., search results, movie grids)

                // Keep trying until we actually scroll there or a timeout occurs
                let attempts = 0;
                const maxAttempts = 10;

                const tryScroll = () => {
                    const currentScroll = window.scrollY;
                    window.scrollTo(0, position);
                    attempts++;

                    // Verify if we actually reached the target position (with some wiggle room)
                    const reached = Math.abs(window.scrollY - position) < 10;

                    if (!reached && attempts < maxAttempts) {
                        // If we didn't reach it, it's likely because the page height hasn't caught up yet
                        setTimeout(tryScroll, 200);
                    }
                };

                const timerId = setTimeout(tryScroll, 100);
                return () => clearTimeout(timerId);
            }
        }
    }, [getPageKey, pathname, searchParams]); // Run on navigation

    // Saving logic
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        let lastSavedAt = 0;
        const intervalMs = 200;

        const savePosition = () => {
            const key = getPageKey();
            if (window.scrollY > 0) {
                sessionStorage.setItem(key, window.scrollY.toString());
            } else {
                sessionStorage.removeItem(key);
            }
            lastSavedAt = Date.now();
        };

        const handleScroll = () => {
            const settings = settingsStore.getSettings();
            if (!settings.rememberScrollPosition) return;

            const now = Date.now();
            const elapsed = now - lastSavedAt;

            if (elapsed >= intervalMs) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                savePosition();
                return;
            }

            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    timeoutId = null;
                    savePosition();
                }, intervalMs - elapsed);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [getPageKey]);

    return null;
}
