import React from "react";
import Image from "next/image";
import { Marker as MapboxMarker } from "react-map-gl";
import Link from "next/link";

type Props = {
  lat: number;
  lng: number;
  placeId: string;
  onSelect: (camp: string) => void;
};

const Marker = ({ lat, lng, onSelect, placeId }: Props) => {
  return (
    <Link href={`#${placeId}`} scroll={true}>
      <MapboxMarker longitude={lng} latitude={lat}>
        <button onClick={() => onSelect(placeId)}>
          <Image
            src="/marker.png"
            alt="location marker"
            width={54}
            height={54}
          />
        </button>
      </MapboxMarker>
    </Link>
  );
};

export default Marker;
