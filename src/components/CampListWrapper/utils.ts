import type { Camp } from "@prisma/client";
import { Dispatch } from "react";
import type { MapRef } from "react-map-gl";
import type { Action, FilterState } from "./type";

const cleanTags = (values: string[]) => {
  return values.map((value) => value.replace(" ", ""));
};

export const getTagOptions = (campData?: Camp[]) => {
  let bigList: string[] = [];
  campData?.forEach(
    (camp) => (bigList = [...bigList, ...cleanTags(camp.tags)])
  );

  return new Set(bigList);
};

export const nextCamp = (direction: "up" | "down", filteredCampList: Camp[], filterState: FilterState, portlandMapMobile: MapRef | undefined, dispatch: Dispatch<Action>) => {
  let newIndex = 0;
  const indexOfSelected = filterState?.selectedCamp
    ? filteredCampList.indexOf(filterState?.selectedCamp)
    : filteredCampList.length;

  if (direction === "up") {
    const updatedIndex = indexOfSelected + 1;
    newIndex = filteredCampList[updatedIndex] ? updatedIndex : 0;
  }
  if (direction === "down") {
    const updatedIndex = indexOfSelected - 1;
    newIndex = filteredCampList[updatedIndex]
      ? updatedIndex
      : filteredCampList.length - 1;
  }

  const newCamp = filteredCampList[newIndex];

  if (newCamp) {
    portlandMapMobile?.flyTo({
      center: [newCamp.lng, newCamp.lat],
      zoom: 13,
    });
  }

  dispatch({
    type: "setSelectedCamp",
    payload: newCamp,
  });
  dispatch({
    type: "setSelectedCampId",
    payload: newCamp?.id,
  });
};