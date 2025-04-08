import { RentalHouseCard } from '@/components/shared/dashboard/RentalHouse/RentalHouseCard';
import { TRentalHouse } from '@/types/globals.types';
import { getRentalHouse } from '@/utilities/actions/getRentalHouse';
import React from 'react'

const RentalHouseListing = async () => {
  const data = await getRentalHouse();
  const rentalHouses: TRentalHouse[] = data?.data?.data;
  

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Rental Houses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rentalHouses?.map((rentalHouse) => (
          <RentalHouseCard key={rentalHouse._id} action='view' rentalHouse={rentalHouse} />
        ))}
      </div>
    </main>
  );
}

export default RentalHouseListing;
