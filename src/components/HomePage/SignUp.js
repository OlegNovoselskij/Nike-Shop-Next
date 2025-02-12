"use client"
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export default function SubscribeSection() {
    const router = useRouter();
    
    return (
      <div className="bg-black text-white py-20 px-6 flex flex-col items-center w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-center tracking-wide">
          Subscribe for 15% Off
        </h2>
        <p className="text-gray-400 text-xl mt-3 text-center max-w-2xl">
          Get 15% off your first purchase when you sign up for our newsletter!
        </p>
        <div className="mt-8 gap-6 w-full max-w-3xl flex justify-center">
          <Button onClick={() => router.push(`/register`)} style={"h-20 w-40 bg-[#484444] hover:bg-gray-600 text-white font-semibold px-6 transition-all duration-200 text-lg whitespace-nowrap"}>Sign Up</Button>
        </div>
      </div>
    );
  }

  