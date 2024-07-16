export default function TabList({ tab, setTab, tabList }) {
  return (
    <div className="border-b border-gray-400 flex items-center pl-7 space-x-8">
      {tabList?.map((t) => (
        <p
          className={`text-lg pb-2 ${
            tab === t.id
              ? "font-semibold border-b-[2px] border-black"
              : "font-light cursor-pointer"
          }`}
          onClick={() => tab !== t.id && setTab(t.id)}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
}
