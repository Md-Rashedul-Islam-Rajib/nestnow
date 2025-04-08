"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRentalHouse } from "@/types/globals.types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { deleteRentalHouse } from "@/utilities/actions/deleteRentalHouse";
import { toast } from "sonner";

interface RentalHouseCardProps {
  rentalHouse: TRentalHouse;
  action?: "view" | "update" | "delete";
}

export const RentalHouseCard = ({
  rentalHouse,
  action = "view",
}: RentalHouseCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalImages = rentalHouse.images.length;

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));

  const handleCardClick = () => {
    if (action === "view") {
      router.push(`/dashboard/rental-house/${rentalHouse._id}`);
    }
  };

  

  const handleDelete = async () => {
    try {
      console.log(rentalHouse._id)
      await deleteRentalHouse(rentalHouse._id);
      toast.success("Rental house deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete rental house.");
      console.error(err);
    } finally {
      setIsDialogOpen(false);
    }
  };


  return (
    <Card
      onClick={action === "view" ? handleCardClick : undefined}
      className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl shadow-md transition-all border border-gray-200",
        action === "view" ? "cursor-pointer hover:shadow-lg" : ""
      )}
    >
      {/* Image Slider */}
      <div className="relative h-60 w-full">
        <picture>
        <img
          src={rentalHouse.images[currentImageIndex]}
          alt={`Rental house image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
          />
          </picture>
        {totalImages > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight />
            </Button>
            <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
              {currentImageIndex + 1}/{totalImages}
            </span>
          </>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {rentalHouse.location}
        </CardTitle>
        <p className="text-gray-500 text-sm">
          {new Date(rentalHouse.createdAt!).toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-gray-700 text-sm line-clamp-2">
          {rentalHouse.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {rentalHouse.amenities.slice(0, 10).map((amenity, idx) => (
            <Badge
              key={idx}
              className="bg-blue-100 text-blue-800 font-medium hover:bg-blue-200"
            >
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="pt-3 border-t mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>
            Rent: <strong>${rentalHouse.rent_amount}</strong>/month
          </span>
          <span className="text-xs">ID: {rentalHouse._id.slice(-5)}</span>
        </div>

        {action === "update" && (
          <Link href={`/dashboard/rental-house/update/${rentalHouse._id}`}>
          <Button
            className="w-full mt-4 cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" /> Update
            </Button>
            </Link>
        )}

        {action === "delete" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="w-full mt-4"
                variant="destructive"
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Are you sure?</h3>
              <p>
                This action cannot be undone. This will permanently delete the
                rental house.
              </p>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
