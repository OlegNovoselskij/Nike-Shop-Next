function ProductItem({handleClickOnProduct, id, image, title, price }) {
    return (
        <div onClick={() => handleClickOnProduct(id)} className="p-4 text-white text-left cursor-pointer">
            <div className="relative h-[200px] w-[200px] overflow-hidden group">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-sm">${parseFloat(price.toFixed(2))}</p>
        </div>
    );
    
}

export default ProductItem;