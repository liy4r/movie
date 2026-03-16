import type { Restaurant } from "@/types/res";
const ResView = ({ res }: { res: Restaurant; onClick: () => void }) => {
  return (
    <a>
      {res.name} - - {res.borough}-- {res.cuisine} -- {res.address.building}{" "}
      {res.address.street} {res.address.zipcode}
    </a>
  );
};

export { ResView };
