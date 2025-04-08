/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    TRentalHouse,
  UpdateRentaLHouseFormValues,
  updateRentalHouseSchema,
} from "@/types/globals.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { TagsInput } from "@/components/extention/TagsInput";
import { useSession } from "next-auth/react";
// import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateRentalHouseFrom = ({rentalHouse} : {rentalHouse: TRentalHouse}) => {
  const { data: session } = useSession()
  const token = session?.user?.token;
  const [loading, setLoading] = useState(false);
    const router = useRouter();


  const form = useForm<UpdateRentaLHouseFormValues>({
    resolver: zodResolver(updateRentalHouseSchema),
    defaultValues: {
      location: rentalHouse.location || "",
      description: rentalHouse.description || "",
      rent_amount: Number(rentalHouse.rent_amount) || 0,
      number_of_bedrooms: Number(rentalHouse.number_of_bedrooms) || 0,
      amenities: rentalHouse.amenities || [],
      images: [], 
    },
  });

  const onSubmit = async (data: UpdateRentaLHouseFormValues) => {
      
   

    const formData = new FormData();

    // Basic field changes
    if (data.location !== rentalHouse.location) {
      formData.append("location", data.location!);
    }
    if (data.description !== rentalHouse.description) {
      formData.append("description", data.description!);
    }
    if (data.rent_amount !== Number(rentalHouse.rent_amount)) {
      formData.append("rent_amount", data.rent_amount!.toString());
    }
    if (data.number_of_bedrooms !== Number(rentalHouse.number_of_bedrooms)) {
      formData.append("number_of_bedrooms", data.number_of_bedrooms!.toString());
    }
    if (
      JSON.stringify(data.amenities) !== JSON.stringify(rentalHouse.amenities)
    ) {
      data.amenities!.forEach((tag) => formData.append("amenities", tag));
    }

    
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("replaceImages", "true");
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/landlords/listings/${rentalHouse._id}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`, 
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Rental house updated successfully!");
        form.reset();
        router.push("/dashboard/rental-house")  
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen bg-[url('/assets/register.jpg')] bg-cover bg-center flex justify-center items-center text-white px-6">
      <div className="absolute inset-0 bg-gray-950/70"></div>
      <div className="relative z-10 my-6 md:my-0 grid grid-cols-1 rounded-xl items-center">
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-lg shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Update Rental House
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="location"
                            placeholder="Rental House Location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="description"
                            placeholder="Enter Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="number_of_bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Bedrooms</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            autoComplete="number_of_bedrooms"
                            placeholder="Enter number of bedrooms"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rent_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rent Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            autoComplete="rent_amount"
                            placeholder="Enter rent amount"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tags Input for Amenities */}
                  <div className="w-80">
                    <FormField
                      control={form.control}
                      name="amenities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amenities</FormLabel>
                          <FormControl>
                            <TagsInput
                              value={field.value || []}
                              onValueChange={field.onChange}
                              placeholder="Add amenities"
                              className="w-full border rounded-md p-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {rentalHouse.images?.length > 0 && (
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      {rentalHouse.images.map((img, i) => (
                        <picture key={i}>
                          <img
                            src={img}
                            alt={`existing-img-${i}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                        </picture>
                      ))}
                    </div>
                  )}
                  {/* Multiple Image Upload */}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload New Images</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              field.onChange(files);
                            }}
                          />
                        </FormControl>
                        {field.value && field.value.length > 0 && (
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            {field.value.map((file: File, index: number) => (
                              <div key={index} className="relative">
                                <picture>
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    className="h-24 w-full object-cover rounded-md"
                                  />
                                </picture>
                              </div>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? "Updating" : "Update"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateRentalHouseFrom;
