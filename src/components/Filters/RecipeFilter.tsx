import { chevronDown } from "@/icons/icons";
import cn from "@/utilities/cn";
import { useState, useEffect, useRef } from "react";

// SECTION: Interfaces & Types
interface IFilterProps {
  filterCategory: string;
  filterData: string[];
}

export default function RecipeFilter({
  filterCategory,
  filterData,
}: IFilterProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-start w-fit" ref={dropdownRef}>
      <div className="relative group">
        <button
          onClick={toggleDropdown}
          className={cn(
            "inline-flex justify-center w-full px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm items-center",
            {
              "bg-indigo-100 border-indigo-200 text-indigo-700":
                isOpen === true,
            }
          )}
        >
          <span className="mr-2 text-sm">{filterCategory}</span>
          <span className="h-4 w-4">{chevronDown}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 rounded-md shadow-lg bg-white p-1 space-y-1 w-full text-sm">
            {/* Dropdown items */}
            {filterData.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col text-sm p-1 py-2 text-gray-700 hover:bg-sky-100 cursor-pointer rounded-md"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
