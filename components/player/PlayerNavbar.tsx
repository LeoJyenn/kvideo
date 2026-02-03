import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Icons } from '@/components/ui/Icon';
import { siteConfig } from '@/lib/config/site-config';

export function PlayerNavbar({
    isPremium,
    onOpenFavorites,
    onOpenHistory,
}: {
    isPremium?: boolean;
    onOpenFavorites?: () => void;
    onOpenHistory?: () => void;
}) {
    const router = useRouter();

    return (
        <nav className="sticky top-0 z-50 pt-0.5 pb-2 px-4" style={{ transform: 'translateZ(0)' }}>
            <div className="max-w-7xl mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <button
                            onClick={() => router.push(isPremium ? '/premium' : '/')}
                            className="player-logo flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
                            title={isPremium ? "返回高级主页" : "返回首页"}
                        >
                            <Image
                                src="/icon.png"
                                alt={siteConfig.name}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </button>
                        <Button
                            variant="secondary"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <Icons.ChevronLeft size={20} />
                            <span className="hidden sm:inline">返回</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeSwitcher
                            settingsHref="/settings"
                            onOpenFavorites={onOpenFavorites}
                            onOpenHistory={onOpenHistory}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
