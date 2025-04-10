/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createFormData } from "nhb-toolbox";
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
  CreateRentalHouseFormValues,
  rentalHouseSchema,
} from "@/types/globals.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { TagsInput } from "@/components/extention/TagsInput";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateRentalHouseFrom = () => {
  const { data: session } = useSession()
  const token = session?.user?.token;
  const [landlordId, setLandlordId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ userId: string }>(token);
        setLandlordId(decoded.userId);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [token]);
  const form = useForm<CreateRentalHouseFormValues>({
    resolver: zodResolver(rentalHouseSchema),
    defaultValues: {
      location: "",
      description: "",
      rent_amount: 0,
      number_of_bedrooms: 0,
      amenities: [],
      images: [],
    },
  });

  const onSubmit = async (data: CreateRentalHouseFormValues) => {
      if (!landlordId) return console.error("Landlord ID not found!");

      const payload = {
        ...data,
        landlord_ID: landlordId,
      };
   

    const formData = createFormData(payload);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/landlords/listings", {
        method: "POST",
        headers: {
          Authorization: `${token}`, 
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Rental house created successfully!");
        form.reset(); // clear form
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
                Create a Rental House
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
                  <div className="w-72">
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

                  {/* Multiple Image Upload */}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
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
                    {loading ? "Creating":"Create"}
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

export default CreateRentalHouseFrom;
