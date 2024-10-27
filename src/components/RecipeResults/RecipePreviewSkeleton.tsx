import React from "react";

export default function RecipePreviewSkeleton(): React.ReactNode {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md animate-pulse">
      <button className="p-2 py-2 text-sm font-medium flex items-center justify-start bg-gray-50 group-hover:bg-blue-100 group-hover:text-blue-700 duration-300 ease-in-out">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </button>
      <div className="flex pt-1">
        <div className="rounded-lg p-1 object-cover">
          <div className="h-24 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col justify-center gap-1 flex-grow p-2">
          <h2 className="font-medium text-lg">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </h2>
          <div className="flex gap-2 mt-2">
            <div className="bg-gray-200 border border-gray-200 rounded-lg flex items-center justify-center flex-row p-1">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border-b pt-1 border-gray-200"></div>
        <div className="p-2 space-y-3">
          <div className="h-4 bg-gray-200 rounded mt-2"></div>
          <div className="h-16 bg-gray-200 rounded mt-2"></div>
        </div>
      </div>
    </div>
  );
}
