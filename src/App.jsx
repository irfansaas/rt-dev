import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { Loader2 } from 'lucide-react';

const TimelineCalculator = lazy(() => import('./components/TimelineCalculator'));

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10B981',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="py-8">
            <ErrorBoundary message="The Timeline Calculator encountered an error. Please try again.">
              <div className="container mx-auto px-4">
                <Suspense
                  fallback={
                    <div className="min-h-[60vh] flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="animate-spin text-nerdio-primary-500 mx-auto mb-4" size={48} />
                        <p className="text-gray-600">Loading Timeline Calculator...</p>
                      </div>
                    </div>
                  }
                >
                  <TimelineCalculator />
                </Suspense>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
