import Card from "../Card/Card";

export default function Header(props) {
  return (
    <>
      <section className="w-screen px-5 lg:px-20 pt-4">
        <div className="">
          <h1 className="text-3xl font-ele">
            Status al{" "}
            {props.dateUpdate &&
              new Intl.DateTimeFormat("it", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(props.dateUpdate))}
          </h1>
        </div>
      </section>
      <section className="w-screen px-5 lg:px-20 mt-10 mx-auto">
        <div className="flex flex-wrap justify-between -m-4 ">
          {props.latest
            ? Object.entries(props.latest).map((el) => {
                return <Card key={el[0]} label={el[0]} value={el[1]} />;
              })
            : "loading"}
        </div>
      </section>
    </>
  );
}
