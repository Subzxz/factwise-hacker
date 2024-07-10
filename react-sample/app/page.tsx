import Card from "@/components/Card";
import { data } from "@/data";

export default function Home() {
  return (
    <main className="grid grid-cols-3">
      {data.map((c, index) => {
        return <Card key={index} data={c} />;
      })}
    </main>
  );
}
