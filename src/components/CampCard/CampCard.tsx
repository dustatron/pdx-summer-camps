import React from "react";
import Image from "next/image";

export type CardDetails = {
  title: string;
  address: string;
  link: string;
  website: string;
  facebook?: string;
  instagram?: string;
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
    facebook,
    instagram,
    location: { lat, lng },
  } = details;
  return (
    <div className="w-3/6 rounded p-2">
      <div
        className="cursor-pointer border-2"
        onClick={() => onSelect(lat, lng)}
      >
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
        <div className="m-2 grid gap-2 text-sm">
          <div>{address}</div>
          <div>
            <a className="text-blue-500" href={website}>
              {website?.replace("http://", "").replace("https://", "")}
            </a>
          </div>
          <div>
            {description.slice(0, 255)} {description.length > 255 ? "..." : ""}
          </div>
          <div className="grid grid-flow-col gap-1">
            {facebook && (
              <a className="text-blue-500" href={facebook}>
                Facebook
              </a>
            )}
            {instagram && (
              <a className="text-blue-500" href={instagram}>
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
