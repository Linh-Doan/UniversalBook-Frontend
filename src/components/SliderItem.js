export const SliderItem = ({ imageUrl, heading }) => (
    <div  style={{display:"flex", flexDirection:"column", alignItems: "center"}} className="justify-center rounded-lg overflow-hidden mx-1 transition-transform ease-in-out duration-300 hover:scale-110 cursor-pointer">
      <img src={imageUrl} alt="Item cover" className="w-40 h-60 rounded-lg" />
        {heading != null &&
            <h2 className="my-4 text-white" style={{flexBasis: "100%"}}>{heading}</h2>
        }

    </div>
  );


export default SliderItem;