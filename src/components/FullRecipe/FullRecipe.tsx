import Image from "next/image";

export default function FullRecipe(): React.ReactNode {
  return (
    <div className="mt-72 w-full flex justify-center items-center flex-col flex-wrap gap-6">
      <Image
        src={"/chef-clipart.svg"}
        width={200}
        height={200}
        alt="clipart of a chef"
        className="opacity-25 hidden lg:block"
        priority={true}
      />
      <p className="hidden lg:block text-gray-400 max-w-80 text-center text-sm leading-relaxed">
        Once you have searched for a recipe in the left-hand panel, select it
        view it to view it here in greater detail
      </p>
    </div>
  );
}
