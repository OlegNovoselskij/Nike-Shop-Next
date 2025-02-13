import { useState } from "react";
import { Search } from "lucide-react";
import { search } from "../../services/product"
import Link from "next/link";

export default function SearchBar({ onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setIsLoading] = useState(false)

    const handleSearch = async () => {
        if (query.trim()) {
            try {
                setIsLoading(true)
                const data = await search(query);
                setResults(data);
                setIsLoading(false)
            } catch (error) {
                console.error("Помилка пошуку:", error);
                setResults([]);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="bg-[#1a1a1a] h-10 flex items-center w-full max-w-3xl mx-auto rounded relative">
            <Search />
            <input
                type="text"
                placeholder="Search Products"
                value={loading ? "Loading..." : query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent tracking-tight opacity-75 w-full px-2 text-sm outline-none border-none placeholder-gray-400"
            />
            <button onClick={onClose} className="hover:text-gray-400 text-gray-100 text-lg px-3">✖</button>

            {results && (
                <div className="absolute top-full left-0 w-full bg-black text-white mt-1 p-2 rounded shadow-lg max-h-60 overflow-auto">
                    {results.map(product => (
                        <Link key={product.id} href={`/shop/${product.id}`} className="block px-2 py-1 hover:bg-gray-800">
                            {product.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
