// SliderItem.js
import { Link } from 'react-router-dom';
import { apiBaseUrlRoot } from '../config.js';

export const SliderItem = ({ imageUrl, onClickUrl, onClick, heading }) => {
  const image = `${apiBaseUrlRoot}${imageUrl}`;
  const content = (
    <>
      <img src={image} alt="Item cover" className="w-40 h-60 rounded-lg" />
      {heading != null &&
        <h2 className="my-4 text-grey text-center" style={{ flexBasis: "100%" }}>{heading}</h2>
      }
    </>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="justify-center rounded-lg overflow-hidden mx-1 transition-transform ease-in-out duration-300 hover:scale-110 cursor-pointer"
      onClick={onClick}
    >
      {onClickUrl ? (
        <Link to={onClickUrl}>
          {content}
        </Link>
      ) : (
        <div>
          {content}
        </div>
      )}
    </div>
  )
};

export default SliderItem;
