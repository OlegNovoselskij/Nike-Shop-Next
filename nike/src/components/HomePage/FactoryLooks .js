import { LookItem } from "./LookItem";

const CLASSFOROTERIMAGES = "w-[450px] h-[4050px]"
export const FactoryLooks = () => {
    const looks = [
      { id: 1, title: "Graphite Beanie", image: "/men.avif", className: "w-[600px] h-[660px]" },
      { id: 2, title: "Oversized Wool", image: "/wool.webp", className: "w-[450px] h-[320px]" },
      { id: 3, title: "Heavy Jacket", image: "/heavyJacket.jpg", className: "w-[450px] h-[320px]" },
      { id: 4, title: "Relaxed Trousers", image: "/relaxedTrousers.jpg", className: CLASSFOROTERIMAGES },
      { id: 5, title: "Striped Socks", image: "/socks.jpg", className: CLASSFOROTERIMAGES },
      { id: 6, title: "Energy Tee", image: "/tea.avif", className: CLASSFOROTERIMAGES },
      { id: 7, title: "Walker Jacket", image: "/walkerJacket.webp", className: CLASSFOROTERIMAGES },
    ];
  
    return (
        <section className="bg-[#161616] py-12 text-center">
            <h2 className="color-[HEX: #636363] opacity-45 font-family-aktiv-grotesk text-4xl font-bold mb-10">#FACTORYLOOKS</h2>

            {/* Верхній ряд */}
            <div className="grid grid-cols-2 gap-5 max-w-[1200px] mx-auto">
                <LookItem {...looks[0]} className="w-full h-[660px]" />
                <div className="flex flex-col gap-5">
                    <LookItem {...looks[1]} className="w-full h-[320px]" />
                    <LookItem {...looks[2]} className="w-full h-[320px]" />
                </div>
            </div>

            {/* Нижній ряд */}
            <div className="grid grid-cols-2 gap-5 max-w-[1200px] mx-auto mt-5">
                <LookItem {...looks[3]} className="w-full h-[500px]" />
                <LookItem {...looks[4]} className="w-full h-[500px]" />
                <LookItem {...looks[5]} className="w-full h-[500px]" />
                <LookItem {...looks[6]} className="w-full h-[500px]" />
            </div>
        </section>
      );
    };