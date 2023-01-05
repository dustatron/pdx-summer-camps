import type { Camp } from "@prisma/client";
import type { MultiSelectOption } from "../types/camp";

export function filterCampList(options: { campData?: Camp[], campName?: string, tagsSelected?: MultiSelectOption[], quadrantSelected?: MultiSelectOption[], ageSelected?: MultiSelectOption[] }) {
  const { ageSelected, campName, quadrantSelected, tagsSelected, campData } = options
  if (!campData) return []
  const results = campData
    ?.filter((camp) => {
      if (campName) {
        return camp.title.toLowerCase().includes(campName.toLowerCase());
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