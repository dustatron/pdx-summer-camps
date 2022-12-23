import React from "react";
import Image from "next/image";
import { Marker as MapboxMarker } from "react-map-gl";

type Props = {
  lat: number;
  long: number;
  name: string;
  onSelect: (camp: string) => void;
};

const Marker = ({ lat, long, onSelect, name }: Props) => {
  return (
    <>
      <MapboxMarker longitude={long} latitude={lat}>
        <button onClick={() => onSelect(name)}>
          <Image
            src="/marker.png"
            alt="location marker"
            width={54}
            height={54}
          />
        </button>
      </MapboxMarker>
    </>
  );
};

export default Marker;
