import { getSingleRentalHouse } from '@/utilities/actions/getSingleRentalHouse';
import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import UpdateRentalHouseFrom from './_components/UpdateRentalHouseForm';

const UpdateRentalHouse = async ({
    params,
}: {
    params: Promise<{ id: string }>
    }) => {
    const { id } = await params;
    const data = await getSingleRentalHouse(id);
      const rentalHouse = data?.data
  return (
      <Suspense
          fallback={
            <div className="flex size-full min-h-dvh items-center justify-center">
              <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
            </div>
          }
        >
    
          <UpdateRentalHouseFrom rentalHouse={rentalHouse} />
          
        </Suspense>
  )
}

export default UpdateRentalHouse
