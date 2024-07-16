import TextInput from "@/app/_components/inputs/TextInput";

export default function OutletsGeneralInput({ name, setName, error, disable }) {
  return (
    <div className="px-7">
      <div className="w-full border-gray-300 border-dashed border-[3px] px-5 py-5 space-y-5">
        <p className="text-xl font-semibold">General</p>
        <div className="space-y-3">
          <TextInput
            label="Name"
            value={name}
            setValue={setName}
            error={error?.name}
            disable={disable}
          />
        </div>
      </div>
    </div>
  );
}
