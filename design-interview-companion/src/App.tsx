import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { BookmarksPage, HomePage, LessonPage, PlanPage, PracticePage, ProgressPage, ReadPage } from '@/pages/companion';
import { GuidePage, GuideReaderPage } from '@/pages/guide';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
         <Route path="/" component={HomePage} />
         <Route path="/read" component={ReadPage} />
         <Route path="/read/:lessonId" component={LessonPage} />
          <Route path="/guide" component={GuidePage} />
          <Route path="/guide/:pageNumber" component={GuideReaderPage} />
         <Route path="/practice" component={PracticePage} />
         <Route path="/plan" component={PlanPage} />
         <Route path="/bookmarks" component={BookmarksPage} />
         <Route path="/progress" component={ProgressPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
