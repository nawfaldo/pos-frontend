export default function SecondaryButton({ text, action, disabled }) {
  return (
    <button
      className="h-full items-center flex bg-gray-200 hover:bg-gray-600 hover:text-white w-full justify-center border-b-[4px] border-r hover:border-r-0 border-t hover:border-t-0 border-l hover:border-l-0 border-gray-400 hover:border-black rounded-md cursor-pointer font-light"
      onClick={action}
      disabled={disabled}
    >
      <p>{text}</p>
    </button>
  );
}
