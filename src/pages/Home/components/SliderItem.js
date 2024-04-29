const SliderItem = ({ imageUrl }) => (
    <div className="rounded-lg overflow-hidden mx-1 transition-transform ease-in-out duration-300 hover:scale-110 cursor-pointer">
      <img src={imageUrl} alt="Item cover" className="w-40 h-60 rounded-lg" />
    </div>
  );


export default SliderItem;