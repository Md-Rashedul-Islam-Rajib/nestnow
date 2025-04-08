import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import RentalHouseListing from '../../_components/RentalHouseListing'

const RentalHouseList = () => {
  return (
     <Suspense
          fallback={
            <div className="flex size-full min-h-dvh items-center justify-center">
              <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
            </div>
          }
        >
          <RentalHouseListing />
        </Suspense>
  )
}

export default RentalHouseList
