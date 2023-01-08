import React from "react";
import { Marker as MapboxMarker } from "react-map-gl";
import { GrLocation } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import type { Camp } from "@prisma/client";

type Props = {
  lat: number;
  lng: number;
  placeId: string;
  selectedCampId?: string;
  setSelectCampId: (campId: string) => void;
};

const Marker = ({
  lat,
  lng,
  setSelectCampId,
  placeId,
  selectedCampId,
}: Props) => {
  const isSelectedCamp = selectedCampId === placeId;
  return (
    <Link href={`#${placeId}`} scroll={true}>
      <MapboxMarker longitude={lng} latitude={lat}>
        <button onClick={() => setSelectCampId(placeId)}>
          {isSelectedCamp && <HiLocationMarker className="h-10 w-10" />}
          {!isSelectedCamp && <GrLocation className="h-10 w-10" />}
        </button>
      </MapboxMarker>
    </Link>
  );
};

export default Marker;
