import Modal from './MostPopularModal'
import ProductList from "./ProductList";

export default function ShopMain() {

    return (
        <div className="bg-black text-white min-h-screen flex justify-center">
            <aside className="w-2/12 p-9">
                <h3 className="font-family-aktiv-grotesk relative font-medium tracking-tight opacity-75 font-bold text-lg mb-4">
                    All Products
                </h3>
                <ul className="space-y-2">
                    <li className="font-family-aktiv-grotesk relative font-medium tracking-tight hover:opacity-75 cursor-pointer">
                        Mens
                    </li>
                    <li className="font-family-aktiv-grotesk relative font-medium tracking-tight hover:opacity-75 cursor-pointer">
                        Womens
                    </li>
                </ul>
            </aside>
            <main className="w-1/2 p-8">
                <div className="flex justify-between items-center mb-6 relative">
                    <h2 className="text-2xl font-bold font-family-aktiv-grotesk">
                        All Products
                    </h2>
                    <Modal />
                </div>
                <ProductList />
            </main>
        </div>
    );
}
