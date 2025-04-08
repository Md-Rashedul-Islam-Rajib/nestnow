import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import DeleteRentalHouseListing from './_components/DeleteRentalHouseListing'

const DeleteRentalHouse = () => {
  return (
     <Suspense
             fallback={
               <div className="flex size-full min-h-dvh items-center justify-center">
                 <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
               </div>
             }
           >
       
             <DeleteRentalHouseListing />
             
           </Suspense>
  )
}

export default DeleteRentalHouse
