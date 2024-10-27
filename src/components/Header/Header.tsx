// SECTION: Import Statements

import { chefIcon, userIcon } from "@/icons/icons";

export default function Header(): React.ReactNode {
  return (
    <header className="flex items-center h-16 border-b shrink-0 px-[1.2rem] justify-between">
      <span className="flex items-center gap-2 text-lg font-semibold md:text-base">
        {/* Company Logo */}
        <span className="h-8 w-8 text-blue-600">{chefIcon}</span>
        <span className="text-lg text-blue-600">ResCulina</span>
      </span>

      <div className="h-6 w-6 flex items-center gap-3 text-gray-600">
        {userIcon}
      </div>
    </header>
  );
}
