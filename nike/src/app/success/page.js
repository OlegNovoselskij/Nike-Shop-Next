"use client"
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import  Button  from "../../components/ui/Button"

export default function SuccessPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <CheckCircle size={50} className="text-green-500 mb-4" />
      <h1 className="text-2xl font-bold">Thank you for your inquiry!</h1>
      <p className="text-gray-400 mt-2">We will get back to you within 48 hours.</p>
      <Button className="bg-[#484444] text-white font-semibold text-sm uppercase px-8 py-4 tracking-wide transition hover:bg-[#5a5a5a] mt-4" onClick={() => router.push("/")}>Home</Button>
    </div>
  );
}
