import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react'
import CreateRentalHouseFrom from './_components/CreateRentalHouseForm';

const CreateRentalHouse = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <CreateRentalHouseFrom />
    </Suspense>
  );
}

export default CreateRentalHouse
