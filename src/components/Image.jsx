import { useRef } from 'react';
import className from 'classnames';
import { FiCamera, FiCameraOff } from "react-icons/fi";

function Image({ src, onChange=null, input=false}) {
  
  const classes = className("w-full h-full bg-cover bg-center bg-orange-100 rounded border border-orange-300", {
    "hover:bg-orange-200": input,
  })

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-32 h-32 p-3 shrink-0">
      <button
        type="button"
        onClick={input ? handleClick : undefined}
        className={classes}
        style={{ backgroundImage: `url(${src})` }}
        aria-label="Upload image"
      >
        {!src && <div className="flex items-center justify-center h-full w-full text-center text-sm text-gray-500">
          {input ? <FiCamera size={50}/> : <FiCameraOff size={50}/>}
          </div>}
      </button>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default Image;
