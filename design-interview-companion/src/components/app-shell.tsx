import { BookOpen, Bookmark, CalendarDays, Check, ChevronRight, CircleUserRound, FileText, Gauge, LibraryBig, PenLine, Search, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { type ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Today', icon: Sparkles },
  { href: '/read', label: 'Quick reads', icon: BookOpen },
  { href: '/guide', label: 'Full guide', icon: FileText },
  { href: '/practice', label: 'Practice', icon: PenLine },
  { href: '/plan', label: '14-day plan', icon: CalendarDays },
  { href: '/bookmarks', label: 'Saved', icon: Bookmark },
  { href: '/progress', label: 'Progress', icon: Gauge },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return (
    <div className="paper-grain min-h-[100dvh] bg-background text-foreground md:flex">
      <aside className="hidden md:flex md:w-[248px] md:flex-col md:justify-between md:border-r md:border-sidebar-border md:bg-sidebar md:px-5 md:py-7">
        <div>
          <Link href="/" className="mb-12 flex items-center gap-3 text-sidebar-foreground" data-testid="link-brand">
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-sidebar-primary text-sidebar-primary-foreground">
              <LibraryBig size={19} strokeWidth={2.2} />
            </span>
            <span>
              <span className="block text-[25px] font-bold leading-none">Fieldnotes</span>
              <span className="mt-1 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-sidebar-foreground/55">design interview companion</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="space-y-1.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === '/' ? location === '/' : location.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  data-testid={`link-nav-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'}`}
                >
                  <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
                  <span>{label}</span>
                  {active && <ChevronRight size={14} className="ml-auto text-sidebar-primary" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/65 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono-ui text-[10px] uppercase tracking-[.16em] text-sidebar-foreground/50">Your focus</span>
            <CircleUserRound size={17} className="text-sidebar-primary" />
          </div>
           <p className="text-[20px] font-bold leading-[1.05] text-sidebar-foreground">One useful idea at a time.</p>
          <p className="mt-3 text-xs leading-5 text-sidebar-foreground/55">Your reading, notes, and practice stay on this device.</p>
        </div>
      </aside>
      <div className="min-w-0 flex-1 pb-[82px] md:pb-0">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-border/70 bg-background/92 px-5 backdrop-blur-md md:h-[76px] md:px-10">
          <div className="flex items-center gap-2.5 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary text-primary-foreground"><LibraryBig size={16} /></span>
             <span className="text-[22px] font-bold">Fieldnotes</span>
          </div>
          <div className="hidden items-center gap-2 text-muted-foreground md:flex">
            <span className="font-mono-ui text-[10px] uppercase tracking-[.18em]">300+ interview insights</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span className="text-xs">Read with a point of view</span>
          </div>
          <Link href="/read" data-testid="link-header-search" className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
            <Search size={15} />
            <span className="hidden sm:inline">Find an insight</span>
            <span className="font-mono-ui text-[10px] text-muted-foreground/60">⌘ K</span>
          </Link>
        </header>
        <main>{children}</main>
      </div>
      <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-30 flex h-[75px] items-center justify-around border-t border-border bg-card/95 px-2 backdrop-blur-lg md:hidden">
         {navItems.filter(({ href }) => href !== '/plan').map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? location === '/' : location.startsWith(href);
          return (
            <Link key={href} href={href} data-testid={`link-mobile-nav-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`} className={`flex min-w-[48px] flex-col items-center gap-1 rounded-xl py-2 text-[9px] ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
               <span>{label === '14-day plan' ? 'Plan' : label === 'Quick reads' ? 'Quick' : label === 'Full guide' ? 'Guide' : label}</span>
              {active && <span className="h-0.5 w-3 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-9 flex flex-col gap-5 border-b border-border/80 pb-8 md:mb-11 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mb-3 font-mono-ui text-[10px] uppercase tracking-[.2em] text-primary">{eyebrow}</p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.1rem)] leading-[.98] tracking-[-.03em] text-foreground">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-[15px]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return <div className={`h-1.5 overflow-hidden rounded-full bg-muted ${className}`}><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(100, value)}%` }} /></div>;
}

export function BookmarkButton({ saved, onClick, label = 'Bookmark lesson' }: { saved: boolean; onClick: () => void; label?: string }) {
  return <button type="button" onClick={onClick} aria-label={saved ? `Remove bookmark: ${label}` : label} data-testid={saved ? 'button-remove-bookmark' : 'button-add-bookmark'} className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${saved ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'}`}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button>;
}

export function CompletionMark({ complete }: { complete: boolean }) {
  return <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${complete ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent'}`}><Check size={14} strokeWidth={3} /></span>;
}