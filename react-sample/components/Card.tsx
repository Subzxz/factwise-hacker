"use client";

import Image from "next/image";
import { useState } from "react";

interface CardProps {
  data: any;
}

const Card = ({ data }: CardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          alt="profile"
          src={data.picture}
          width={1080}
          height={1920}
          className="w-20 h-20"
        />
        <p>
          {data.first} {data.last}
        </p>
        <p>⬇️</p>
      </div>
    </div>
  );
};

export default Card;
