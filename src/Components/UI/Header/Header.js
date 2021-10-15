import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";

export default function Header(props) {
  return (
    <>
      <section className="w-screen px-2 pt-4">
        <h1 className="text-2xl font-ele">
          Status al{" "}
          {props.dateUpdate &&
            new Intl.DateTimeFormat("it", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(props.dateUpdate))}
        </h1>
        {props.regions && <Dropdown regions={props.regions} />}
      </section>
      <section className="w-screen  mt-10">
        <div className="flex flex-wrap justify-between ">
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
