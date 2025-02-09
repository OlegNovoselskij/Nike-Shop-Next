export default function Search({handleClickSearch}) {
    return (
        <img onClick={handleClickSearch} className="hover:opacity-75" src="/search.jpg" />
    )
}