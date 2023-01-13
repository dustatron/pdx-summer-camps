import type { Action, FilterState } from "./type";

export const initialState: FilterState = {
  selectedCampId: "",
  campNameFilter: "",
  ageSelected: [],
  quadrantSelected: [],
  tagsSelected: [],
  isShowingDetails: false,
  isShowingMobileList: false,
  isFilterShowing: false,
};

const reducer = (prevState: FilterState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "setSelectedCampId":
      return { ...prevState, selectedCampId: payload } as FilterState;
    case "unsetCampId":
      return { ...prevState, selectedCampId: "" } as FilterState;
    case "setSelectedCamp":
      return { ...prevState, selectedCamp: payload } as FilterState;

    case "showingDetailsFalse":
      return {
        ...prevState,
        isShowingDetails: false,
      } as FilterState;
    case "showingDetailsTrue":
      return {
        ...prevState,
        isShowingDetails: true,
      } as FilterState;

    case "setCampNameFilter":
      return { ...prevState, campNameFilter: payload } as FilterState;
    case "setAgeSelected":
      return { ...prevState, ageSelected: payload } as FilterState;
    case "setQuadrantSelected":
      return { ...prevState, quadrantSelected: payload } as FilterState;
    case "setTagsSelected":
      return { ...prevState, tagsSelected: payload } as FilterState;

    case "toggleFilterShow":
      return {
        ...prevState,
        isFilterShowing: !prevState.isFilterShowing,
      } as FilterState;

    case "toggleMobileList":
      return {
        ...prevState,
        isShowingMobileList: !prevState.isShowingMobileList,
      } as FilterState;

    case "clearAllFilters":
      return {
        ...prevState,
        tagsSelected: [],
        quadrantSelected: [],
        ageSelected: [],
      } as FilterState;

    default:
      return prevState;
  }
};

export default reducer