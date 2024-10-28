import {
  cookieIcon,
  cookingPotIcon,
  dashboardIcon,
  foodBowlIcon,
  heartbeatIcon,
  reicpeBookIcon,
} from "@/icons/icons";

export default function SideNav(): React.ReactNode {
  return (
    <div className="h-screen w-fit flex bg-gray-200 border-r border-gray-100">
      {/* Container */}
      <aside className="flex flex-col items-center bg-white text-gray-700 shadow h-full">
        <ul>
          {/* Navigation Item 1 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-5 w-5">{dashboardIcon}</span>
            </a>
          </li>
          {/* Navigation Item 2 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-5 w-5">{cookingPotIcon}</span>
            </a>
          </li>
          {/* Navigation Item 3 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-6 w-6">{cookieIcon}</span>
            </a>
          </li>
          {/* Navigation Item 4 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-5 w-5">{reicpeBookIcon}</span>
            </a>
          </li>
          {/* Navigation Item 5 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-6 w-6">{foodBowlIcon}</span>
            </a>
          </li>
          {/* Navigation Item 6 */}
          <li className="hover:bg-blue-100 transition-all duration-800 ease-in-out">
            <a
              href="."
              className="h-16 px-6 flex justify-center items-center w-full"
            >
              <span className="h-6 w-6">{heartbeatIcon}</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
