import { Camp } from "@prisma/client";

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
