export default function Card(props) {
  return (
    <div className="w-1/2 md:w-1/3 xl:w-1/6 px-2 mb-4">
      <div className=" px-4 py-2 rounded-md shadow-xl border-l-4 border-blue-500 bg-white-50 hover:shadow-sm">
        <h2 className="font-bold font-ele text-lg  mb-2">{props.label}</h2>
        <h3 className="text-right font-semibold">
          {new Intl.NumberFormat("it").format(props.value)}
        </h3>
      </div>
    </div>
  );
}
