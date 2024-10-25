/*
NOTE: cn() is a utility function that combines the CLSX and Tailwind Merge libraries to conditionally join classes without style conflicts. For instance, if the styling of a badge varies depending on whether a value is exceeded or not (blue when within the limit, red when exceeded), cn() ensures that the appropriate class is applied based on the condition, and any conflicting styles—like two different colors—are resolved, leaving only the correct one in the final output.
*/

// SECTION: Import Statements
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
