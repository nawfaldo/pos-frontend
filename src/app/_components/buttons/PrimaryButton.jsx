export default function PrimaryButton({ text, action, disabled }) {
  return (
    <button
      className="h-full font-semibold text-white items-center flex bg-blue-400 hover:bg-blue-500 w-full justify-center border-b-[4px] border-blue-600 hover:border-blue-700 rounded-md cursor-pointer"
      onClick={action}
      disabled={disabled}
    >
      <p className="text-white text-lg">{text}</p>
    </button>
  );
}
