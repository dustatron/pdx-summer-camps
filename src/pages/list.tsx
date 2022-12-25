import Map, { useMap } from "react-map-gl";
import Marker from "../components/Marker";
import Button from "../components/Styled/Button";
import tempData from "../temp-data.json";

type CampData = {
  lat: number;
  long: number;
  title: string;
};

// const campList: CampData[] = [
//   { lat: 45.56627, long: -122.68294, name: "north" },
//   { lat: 45.52, long: -122.68, name: "south" },
//   { lat: 45.5773382284855, long: -122.69765181806113, name: "walgreens" },
//   { lat: 45.53569308208691, long: -122.70055419214097, name: "food fight" },
// ];

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

  const onClick = (lat: number, long: number) => {
    if (portlandMap) {
      portlandMap.flyTo({ center: [long, lat], zoom: 14 });
    }
  };

  const selectCamp = (camp: string) => console.log("selectCamp", camp);

  return (
    <div className="flex h-screen w-screen">
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

      <div className="w-6/12 p-3">
        {campList.map((camp) => (
          <Button
            key={`${camp.title}-btn`}
            onClick={() => onClick(camp.lat, camp.long)}
          >
            {camp.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default List;
