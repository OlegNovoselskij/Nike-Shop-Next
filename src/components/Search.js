import { Search } from "lucide-react";

export default function SearchButton({ handleClickSearch }) {
    return (
        <Search 
            onClick={handleClickSearch} 
            className="hover:opacity-75 cursor-pointer w-6 h-6 text-white" 
        />
    );
}
