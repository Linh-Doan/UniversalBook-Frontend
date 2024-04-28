export const CarouselItem = ({title, imageUrl}) => (
    <div className="hover:scale-105 flex justify-center">
        <div className="justify-center">
            <img src={imageUrl} alt={title} className="w-40 h-60 rounded-lg overflow-hidden transition-transform duration-300" />
            <div className="">{title}</div>
        </div>
        
    </div>
);