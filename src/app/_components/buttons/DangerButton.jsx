export default function DangerButton({ action, text, disable }) {
  return (
    <button
      className="h-full text-red-500 hover:text-white items-center flex bg-gray-200 hover:bg-red-400 w-full justify-center border-b-[4px] border-r hover:border-r-0 hover:border-t-0 hover:border-l-0 border-t border-l border-gray-400 hover:border-red-600 rounded-md cursor-pointer font-light"
      onClick={action}
      disabled={disable}
    >
      <p>{text}</p>
    </button>
  );
}
