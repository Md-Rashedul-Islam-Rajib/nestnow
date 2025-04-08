import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import UpdateRentalHouseListing from './_components/UpdateRentalHouseListing'

const RentalHouseUpdate = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >

      
      <UpdateRentalHouseListing />
    </Suspense>
  )
}

export default RentalHouseUpdate
