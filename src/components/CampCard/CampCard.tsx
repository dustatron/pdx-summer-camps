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
  onSelect: (lat: number, lng: number, place_id: string) => void;
  selectedCampId: string;
};

const CampCard = ({ details, onSelect, selectedCampId }: Props) => {
  const {
    title,
    description,
    images,
    address,
    website,
    facebook,
    instagram,
    place_id,
    location: { lat, lng },
  } = details;
  const isSelectedCamp = selectedCampId === place_id;
  return (
    <div
      className={`${isSelectedCamp ? "w-full" : "w-3/6"} rounded p-2`}
      id={place_id}
    >
      <div
        className={`cursor-pointer border-2 ${
          isSelectedCamp ? "bg-green-100" : ""
        }`}
        onClick={() => onSelect(lat, lng, place_id)}
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
        <div
          className={`m-2 grid gap-2 ${isSelectedCamp ? "text-lg" : "text-sm"}`}
        >
          <div>{address}</div>
          <div>
            <a
              className="text-blue-500"
              href={website}
              target="_blank"
              rel="noreferrer"
            >
              {website?.replace("http://", "").replace("https://", "")}
            </a>
          </div>
          {isSelectedCamp && <div>{description}</div>}

          {!isSelectedCamp && (
            <div>
              {description.slice(0, 255)}{" "}
              {description.length > 255 ? "..." : ""}
            </div>
          )}
          <div className="grid grid-flow-col gap-1">
            {facebook && (
              <a
                className="text-blue-500"
                href={facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            )}
            {instagram && (
              <a
                className="text-blue-500"
                href={instagram}
                target="_blank"
                rel="noreferrer"
              >
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
