import { useParams } from "react-router";

export default function Region() {
  const { region } = useParams();

  return <p> {region}</p>;
}
