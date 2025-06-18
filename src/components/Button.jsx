import className from 'classnames';

function Button({ children, onClick = null, type = "submit", color = "secondary", variant="normal", square}) {
  const classes = className("text-gray-500 font-medium text-sm px-2 py-2 text-center outline focus:outline-2",{
    "bg-teal-100 outline-teal-300 hover:bg-teal-200" : color==="primary",
    "bg-orange-100 outline-orange-300 hover:bg-orange-200" : color==="secondary",
    "bg-green-200 outline-green-400 hover:bg-green-300" : color==="success",
    "bg-red-200 outline-red-400 hover:bg-red-300" : color==="danger",
    "bg-yellow-200 outline-yellow-400 hover:bg-yellow-300" : color==="warning",
    "rounded-lg": variant === "normal",
    "rounded-lg bg-white": variant === "hollow",
    "rounded-full": variant === "pill",
    "rounded-full bg-white": variant === "pill-hollow",
    "aspect-square" : square
    
  })
  return (
    <button
    type={type}
    onClick={onClick}
    className={classes}
    >
      {children}
    </button>
  );
}

export default Button