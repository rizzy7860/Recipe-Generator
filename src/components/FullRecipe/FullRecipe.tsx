import Image from "next/image";

export default function FullRecipe(): React.ReactNode {
  return (
    <div className="col-span-3 col-start-3 border-l border-gray-200">
      <div className="mt-72 w-full flex justify-center items-center flex-col flex-wrap gap-6">
        <Image
          src={"/chef-clipart.svg"}
          width={200}
          height={200}
          alt="clipart of a chef"
          className="opacity-25"
          priority={true}
        />
        <p className="text-gray-400 max-w-80 text-center text-sm leading-relaxed">
          Once you've searched for a recipe in the left-hand panel, select it
          view it here in greater detail
        </p>
      </div>
    </div>
  );
}
