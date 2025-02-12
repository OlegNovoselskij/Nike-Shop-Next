export default function ManAndWomanPart() {
    return (
      <div className="flex justify-center bg-[#1a1a1a] py-16">
        <div className="flex space-x-32">
          <div className="relative w-[30rem] h-[30rem] overflow-hidden group">
            <img
              src="/men.avif"
              alt="Men"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-3xl font-extrabold">MEN</span>
            </div>
          </div>
          <div className="relative w-[30rem] h-[30rem] overflow-hidden group">
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