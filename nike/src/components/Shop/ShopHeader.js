import { SHOPHEADERIMAGES } from './images'
import Image from 'next/image';

export default function ShopHeader() {
    return (
        <div className="w-full overflow-hidden">
            <div className="flex w-full h-[35vh]">
                {SHOPHEADERIMAGES.map((item) => (
                    <div key={item.id} className="relative w-1/4 h-full transition-transform duration-300 hover:scale-110">
                        <Image 
                            src={item.image} 
                            alt={item.title} 
                            layout="fill" 
                            objectFit="cover" 
                            objectPosition="top"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}