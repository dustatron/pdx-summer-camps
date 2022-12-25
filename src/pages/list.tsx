import { useState } from "react";
import Map, { useMap } from "react-map-gl";
import Marker from "../components/Marker";
import tempData from "../temp-data.json";
import CampCard from "../components/CampCard";
import type { CardDetails } from "../components/CampCard";
import Button from "../components/Styled/Button";

type CampData = {
  lat: number;
  long: number;
  title: string;
};

const campList: CampData[] = [];
tempData.forEach((camp) => {
  if (camp.location) {
    campList.push({
      lat: camp.location.lat,
      long: camp.location.lng,
      title: camp.title,
    });
  }
});

function List() {
  const { portlandMap } = useMap();
  const [campFilter, setCampFilter] = useState("");
  const onClick = (lat: number, lng: number) => {
    if (portlandMap) {
      portlandMap.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const selectCamp = (camp: string) => console.log("selectCamp", camp);

  const filteredCampList = tempData.filter((camp) => {
    if (campFilter) {
      return !!camp.title.toLowerCase().includes(campFilter.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <div className="flex h-screen w-screen border-red-200">
      <div className="w-6/12">
        <Map
          id="portlandMap"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          initialViewState={{
            longitude: -122.68294,
            latitude: 45.56627,
            zoom: 10,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          boxZoom
        >
          {campList.map((camp) => (
            <Marker
              key={camp.title}
              lat={camp.lat}
              long={camp.long}
              name={camp.title}
              onSelect={selectCamp}
            />
          ))}
        </Map>
      </div>

      <div className="flex w-6/12 flex-wrap overflow-scroll p-3">
        <div className="w-full p-2">
          <input
            value={campFilter}
            onChange={(e) => setCampFilter(e.target.value)}
            type="text"
            className="focus:shadow-outline mr-2 h-12 w-3/6 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="camp name"
          />
          <Button onClick={() => setCampFilter("")}>Clear</Button>
        </div>
        {filteredCampList.map((camp) => (
          <CampCard
            details={camp as unknown as CardDetails}
            key={`${camp.title}-btn`}
            onSelect={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
