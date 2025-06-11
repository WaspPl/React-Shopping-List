import { useRef } from 'react';

function Image({ src, alt = "", onChange=null, input=false}) {
  
  const fileInputRef = useRef(null);

  const handleClick = () => {
    
    if(input) fileInputRef.current.click();
  };

  return (
    <div className="w-32 h-32 p-3 shrink-0">
      <button
        type="button"
        onClick={handleClick}
        className="w-full h-full bg-cover bg-center border-2 bg-gray-200 border border-gray-300 rounded"
        style={{ backgroundImage: `url(${src})` }}
        aria-label="Upload image"
      >
        {!src && <span className="text-sm text-gray-500">{alt}</span>}
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
