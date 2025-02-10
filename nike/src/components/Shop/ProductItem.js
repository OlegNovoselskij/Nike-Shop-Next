
// Компонент окремого продукту
function ProductItem({ image, title, price }) {
    return (
        <div className="p-4 text-white text-left">
            <div className="relative h-[200px] w-[200px] overflow-hidden group">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-sm">{price}</p>
        </div>
    );
    
}

export default ProductItem;