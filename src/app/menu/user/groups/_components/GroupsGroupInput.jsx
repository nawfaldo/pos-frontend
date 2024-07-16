import TextInput from "@/app/_components/inputs/TextInput";

export default function GroupsGroupInput({
  name,
  setName,
  error,
  desc,
  setDesc,
  disable,
}) {
  return (
    <div className="px-7">
      <div className="w-full border-gray-300 border-dashed border-[3px] px-5 py-5 space-y-5">
        <p className="text-xl font-semibold">Group Information</p>
        <div className="space-y-3">
          <TextInput
            label="Name"
            value={name}
            setValue={setName}
            error={error.name}
            disable={disable}
          />
        </div>
      </div>
    </div>
  );
}
