function Input({ value, type="text", onChange, label="" }) {
  return (
    <div className="flex flex-col p-1">
      {label && <label>{label}</label>}
      <input
        type={type}
        className="bg-white w-full text-[#495057] max-w-xs border border-[#ccc] h-[38px] rounded-sm px-3 py-2 focus:border-[#80bdff] focus:outline-none focus:ring-3 focus:ring-[rgba(0,123,255,0.25)]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}


export default Input