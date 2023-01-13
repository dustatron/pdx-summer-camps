import type { Camp } from "@prisma/client";
import type { MultiSelectOption } from "../../types/camp";

export type FilterState = {
  selectedCamp?: Camp;
  selectedCampId: string;
  campNameFilter: string;
  ageSelected: MultiSelectOption[];
  quadrantSelected: MultiSelectOption[];
  isShowingDetails: boolean;
  tagsSelected: MultiSelectOption[];
  isShowingMobileList: boolean;
  isFilterShowing: boolean;
};

export type Action = {
  type:
  | "setSelectedCampId"
  | "unsetCampId"
  | "setSelectedCamp"
  | "showingDetailsFalse"
  | "showingDetailsTrue"
  | "setCampNameFilter"
  | "setAgeSelected"
  | "setQuadrantSelected"
  | "setTagsSelected"
  | "clearAllFilters"
  | "toggleFilterShow"
  | "toggleMobileList";
  payload?:
  | string
  | string[]
  | Camp
  | MultiSelectOption[]
  | boolean
  | undefined;
};

