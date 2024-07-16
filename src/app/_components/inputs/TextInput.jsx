import ErrorInfo from "../ErrorInfo";

export default function TextInput({ value, setValue, label, error, disable }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-light">{label}</label>
      <input
        className={`border-[1.5px] border-gray-400 px-3 py-2 rounded-lg text-xl font-light focus:outline-none ${
          disable ? "bg-gray-200 " : "bg-transparent"
        }`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="..."
        disabled={disable}
      />
      {error && <ErrorInfo error={error} />}
    </div>
  );
}
