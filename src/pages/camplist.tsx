import React, { useRef, useEffect, useState, MutableRefObject } from "react";

import mapboxgl from "mapbox-gl";
import CampListWrapper from "../components/CampListWrapper";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN as string;

function CampList() {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.6, 45.5],
      zoom: 10,
    });

    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-6/12">
        <div ref={mapNode} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="w-6/12">
        <CampListWrapper />
      </div>
    </div>
  );
}

export default CampList;
