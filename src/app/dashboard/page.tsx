import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import WelcomePage from './_components/WelcomePage';

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <WelcomePage />
    </Suspense>
  );
}

export default DashboardPage
