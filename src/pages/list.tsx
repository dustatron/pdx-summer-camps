import Map, { useMap } from "react-map-gl";
import Marker from "../components/Marker";
import tempData from "../temp-data.json";
import CampCard from "../components/CampCard";
import type { CardDetails } from "../components/CampCard";

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

  const onClick = (lat: number, lng: number) => {
    if (portlandMap) {
      portlandMap.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const selectCamp = (camp: string) => console.log("selectCamp", camp);

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
        {tempData.map((camp) => (
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
