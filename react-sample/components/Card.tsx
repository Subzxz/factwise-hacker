"use client";

import Image from "next/image";
import { useState } from "react";

interface CardProps {
  data: any;
  setMainData: any;
  mainData: any;
}

const Card = ({ data, setMainData, mainData }: CardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickEvent = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  function calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const deleteCard = () => {
    const removedCard = mainData.filter((card: any) => card.id !== data.id);
    setMainData(removedCard);
  };

  const editCard = () => {};

  return (
    <div className="w-full max-w-3xl mx-auto p-4 border rounded-md shadow-md">
      <div
        onClick={onClickEvent}
        className="flex cursor-pointer items-center gap-2 justify-between"
      >
        <div className="flex items-center gap-4">
          <Image
            alt="profile"
            src={data.picture}
            width={1080}
            height={1920}
            className="w-20 h-20"
          />
          <p className="text-xl font-medium">
            {data.first} {data.last}
          </p>
        </div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-gray-500">Age</h1>
              <p>{calculateAge(data.dob)}</p>
            </div>
            <div>
              <h1 className="font-bold text-gray-500">Gender</h1>
              <p className="uppercase">{data.gender}</p>
            </div>
            <div>
              <h1 className="font-bold text-gray-500">Country</h1>
              <p>{data.country}</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-gray-500">Description</h1>
            <p className="text-justify">{data.description}</p>
          </div>

          <div className="flex items-center justify-end gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 text-red-500 cursor-pointer active:scale-75 duration-300 ease-out"
              onClick={deleteCard}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 text-blue-500 cursor-pointer active:scale-75 duration-300 ease-out"
              onClick={editCard}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
