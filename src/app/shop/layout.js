import { SHOPHEADERIMAGES } from '../../components/Shop/images';
import Image from 'next/image';

export default function ShopLayout({ children }) {
    return (
        <>
            <header className="w-full overflow-hidden">
                <div className="flex w-full h-[35vh]">
                    {SHOPHEADERIMAGES.map((item) => (
                        <div 
                            key={item.id} 
                            className="relative w-1/4 h-full transition-transform duration-300 hover:scale-110"
                        >
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
            </header>
            <main className='mt-[-200px]'>
                {children}
            </main>
        </>
    );
}
