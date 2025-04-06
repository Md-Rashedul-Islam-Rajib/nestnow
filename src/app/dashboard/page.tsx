import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <div>Dashboard</div>
    </Suspense>
  );
}

export default DashboardPage
