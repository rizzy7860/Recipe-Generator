// SECTION: Import Statements
import Image from "next/image";

export default function RecipePreview() {
  return (
    <div className="border border-gray-200 rounded-md flex flex-col">
      {/* Top section with Image, Title & Badges, and Tags */}
      <div className="flex">
        {/* Image */}
        <Image
          alt="an image of the recipe"
          className="rounded-md p-1"
          src={"/chicken.jpg"}
          height={100}
          width={100}
        />

        {/* Title & Badges */}
        <div className="flex flex-col justify-center gap-1 flex-grow border border-purple-200 p-2">
          <h2 className="font-medium text-lg">Chicken Fill-A Sandwich</h2>
          <div className="flex gap-2 mt-2">
            {/* Badges */}
            <span className="bg-pink-200 text-xs py-1 px-2 rounded-md">
              Badge 1
            </span>
            <span className="bg-pink-200 text-xs py-1 px-2 rounded-md">
              Badge 2
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2 border border-orange-200 p-2">
          {/* Example tags */}
          <span className="bg-pink-200 text-xs py-1 px-2 rounded-md">
            Tag 1
          </span>
          <span className="bg-pink-200 text-xs py-1 px-2 rounded-md">
            Tag 2
          </span>
        </div>
      </div>

      {/* Instructions/Description */}
      <div className="border border-blue-200 p-2">
        <p className="text-gray-600">
          This is the recipe description or instructions. It will appear below
          the main content area and can span multiple lines if necessary.
        </p>
      </div>
    </div>
  );
}
