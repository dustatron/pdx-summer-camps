import type { Camp } from "@prisma/client";
import type { FilterState } from "../components/CampListWrapper/CampListWrapper";

export function filterCampList(filterState: FilterState, campData?: Camp[]) {
  const { ageSelected, campNameFilter, quadrantSelected, tagsSelected } = filterState
  if (!campData) return []
  const results = campData
    ?.filter((camp) => {
      if (campNameFilter) {
        return camp.title.toLowerCase().includes(campNameFilter.toLowerCase());
      } else {
        return true;
      }
    })
    .filter((camp) => {
      if (tagsSelected && tagsSelected?.length > 0) {
        const selectedValues = tagsSelected.map((tag) => tag.value);
        return !!camp.tags.find((tag) => !!selectedValues.includes(tag));
      } else {
        return true;
      }
    })
    .filter((camp) => {
      if (quadrantSelected && quadrantSelected?.length > 0) {
        const selectedQuads = quadrantSelected.map((tag) => tag.value);
        return !!camp.quadrant.find((tag) => !!selectedQuads.includes(tag));
      } else {
        return true;
      }
    })
    .filter((camp) => {
      if (ageSelected && ageSelected?.length > 0) {
        const selectedQuads = ageSelected.map((tag) => tag.value);
        return !!camp.ages.find((tag) => !!selectedQuads.includes(tag));
      } else {
        return true;
      }
    });

  return results
}