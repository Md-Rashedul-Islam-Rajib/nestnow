// import { useState } from "react";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
// import { Check, ChevronDown, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface MultiSelectProps {
//   values: string[];
//   onValuesChange: (selected: string[]) => void;
//   options: string[];
//   placeholder?: string;
// }

// const MultiSelect = ({
//   values,
//   onValuesChange,
//   options,
//   placeholder = "Select options",
// }: MultiSelectProps) => {
//   const [open, setOpen] = useState(false);

//   const toggleSelection = (value: string) => {
//     if (values.includes(value)) {
//       onValuesChange(values.filter((item) => item !== value));
//     } else {
//       onValuesChange([...values, value]);
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-full justify-between">
//           {values.length > 0 ? (
//             <div className="flex flex-wrap gap-1">
//               {values.map((value) => (
//                 <span
//                   key={value}
//                   className="flex items-center gap-1 bg-gray-200 text-black px-2 py-1 rounded"
//                 >
//                   {value}{" "}
//                   <X
//                     size={14}
//                     className="cursor-pointer"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSelection(value);
//                     }}
//                   />
//                 </span>
//               ))}
//             </div>
//           ) : (
//             <span className="text-gray-500">{placeholder}</span>
//           )}
//           <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandGroup>
//             {options.map((option) => (
//               <CommandItem
//                 key={option}
//                 onSelect={() => toggleSelection(option)}
//               >
//                 <Check
//                   className={`mr-2 h-4 w-4 ${
//                     values.includes(option) ? "opacity-100" : "opacity-0"
//                   }`}
//                 />
//                 {option}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default MultiSelect;
