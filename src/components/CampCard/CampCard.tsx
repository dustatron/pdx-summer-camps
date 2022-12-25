import React from "react";
import Image from "next/image";

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook: string;
  instagram: string;
  description: string;
  images: string[];
  location: { lat: number; lng: number };
  place_id: string;
};

type Props = {
  details: CardDetails;
  onSelect: (lat: number, lng: number) => void;
};

const CampCard = ({ details, onSelect }: Props) => {
  const {
    title,
    description,
    images,
    address,
    website,
    location: { lat, lng },
  } = details;
  return (
    <div className="w-3/6 rounded p-2">
      <div className=" border-2 p-2" onClick={() => onSelect(lat, lng)}>
        <div className="flex max-h-44 w-full justify-center">
          <Image
            className="object-center"
            width={250}
            height={50}
            src={images[0] || "/img-place-holder.png"}
            alt="Image provided by camp"
          />
        </div>
        <h2 className="bg-slate-500 p-2 text-left font-semibold text-white">
          {title}
        </h2>
        <div>{address}</div>
        <div>{website}</div>
        <div>
          {description.slice(0, 255)} {description.length > 255 ? "..." : ""}
        </div>
      </div>
    </div>
  );
};

export default CampCard;
