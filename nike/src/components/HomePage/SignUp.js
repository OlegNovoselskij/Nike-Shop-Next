import Button from "../ui/Button";

export default function SubscribeSection() {
    return (
      <div className="bg-black text-white py-20 px-6 flex flex-col items-center w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-center tracking-wide">
          Subscribe for 15% Off
        </h2>
        <p className="text-gray-400 text-xl mt-3 text-center max-w-2xl">
          Get 15% off your first purchase when you sign up for our newsletter!
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-6 w-full max-w-3xl">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-[#161616] px-6 py-4 w-full  border border-gray-900 focus:border-gray-500 outline-none transition-all duration-200 text-lg"
          />
          <Button style={"bg-[#484444] hover:bg-gray-600 text-white font-semibold px-6 transition-all duration-200 text-lg whitespace-nowrap"}>Sign Up</Button>
        </div>
      </div>
    );
  }

  