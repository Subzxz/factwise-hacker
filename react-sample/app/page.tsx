"use client";

import Card from "@/components/Card";
import { data } from "@/data";
import { useState } from "react";

export default function Home() {
  const [mainData, setMainData] = useState(data);
  return (
    <main className="p-16 flex flex-col gap-4">
      {mainData.map((c, index) => {
        return (
          <Card
            setMainData={setMainData}
            mainData={mainData}
            key={index}
            data={c}
          />
        );
      })}
    </main>
  );
}
