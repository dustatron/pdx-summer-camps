import React from "react";
import Image from "next/image";
import { Marker as MapboxMarker } from "react-map-gl";
import { GrLocation } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";

type Props = {
  lat: number;
  lng: number;
  placeId: string;
  selectedCamp: string;
  onSelect: (camp: string) => void;
};

const Marker = ({ lat, lng, onSelect, placeId, selectedCamp }: Props) => {
  const isSelectedCamp = selectedCamp === placeId;
  return (
    <Link href={`#${placeId}`} scroll={true}>
      <MapboxMarker longitude={lng} latitude={lat}>
        <button onClick={() => onSelect(placeId)}>
          {isSelectedCamp && <HiLocationMarker className="h-10 w-10" />}
          {!isSelectedCamp && <GrLocation className="h-10 w-10" />}
        </button>
      </MapboxMarker>
    </Link>
  );
};

export default Marker;
