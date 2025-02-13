'use client'
import { useRouter } from 'next/navigation';

export default function ManAndWomanPart() {
    const router = useRouter();

    return (
        <div className="flex justify-center bg-[#1a1a1a] py-16">
            <div className="flex space-x-32">
                {/* MEN */}
                <div 
                    className="relative w-[30rem] h-[30rem] overflow-hidden group cursor-pointer" 
                    onClick={() => router.push('/shop?category=mens')}
                >
                    <img
                        src="/men.avif"
                        alt="Men"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-3xl font-extrabold">MEN</span>
                    </div>
                </div>

                {/* WOMEN */}
                <div 
                    className="relative w-[30rem] h-[30rem] overflow-hidden group cursor-pointer"
                    onClick={() => router.push('/shop?category=womens')}
                >
                    <img
                        src="/woman.webp"
                        alt="Women"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-3xl font-extrabold">WOMEN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
