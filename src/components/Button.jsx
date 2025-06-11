function Button({ children, onClick = null, type = "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
    >
      {children}
    </button>
  );
}

export default Button