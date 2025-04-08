"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TRentalHouse } from "@/types/globals.types";
import { formatDate } from "date-fns";

const RentalHouseDetailComponent = ({ rentalHouse }: { rentalHouse: TRentalHouse }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = rentalHouse.images?.length || 0;

  const [formData, setFormData] = useState({
    moveInDate: "",
    rentalDuration: "",
    specialRequirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitRequest = () => {
    console.log("Rental Request Data:", formData);
    // You can connect to API here
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{rentalHouse.location}</h1>
      <p className="text-gray-500 mb-2">
        Posted on: {formatDate(new Date(rentalHouse.createdAt!), "PPPpp")}
      </p>
      <div className="relative h-80 w-full mb-4">
        <picture>
          <img
            src={rentalHouse.images[currentImageIndex]}
            alt="Rental Image"
            className="w-full h-full object-cover rounded-md"
          />
        </picture>
        {totalImages > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
            {currentImageIndex + 1}/{totalImages}
          </div>
        )}
      </div>

      <div className="space-x-2 mb-4">
        {rentalHouse.images.map((img: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-16 h-16 border-2 ${
              index === currentImageIndex
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <picture>
              <img
                src={img}
                alt="Thumbnail"
                className="w-full h-full object-cover rounded"
              />
            </picture>
          </button>
        ))}
      </div>

      <p className="text-gray-700 mb-4">{rentalHouse.description}</p>
      <p className="mb-2 font-semibold">
        Rent Amount: ${rentalHouse.rent_amount}/month
      </p>
      <p className="mb-2">Bedrooms: {rentalHouse.number_of_bedrooms}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {rentalHouse.amenities.map((item: string, idx: number) => (
          <Badge key={idx}>{item}</Badge>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Request Rental</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Rental</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="date"
              name="moveInDate"
              placeholder="Move-in Date"
              value={formData.moveInDate}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="rentalDuration"
              placeholder="Rental Duration (e.g., 6 months)"
              value={formData.rentalDuration}
              onChange={handleChange}
            />
            <Textarea
              name="specialRequirements"
              placeholder="Special Requirements"
              value={formData.specialRequirements}
              onChange={handleChange}
            />
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentalHouseDetailComponent;
