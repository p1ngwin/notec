import { FilterQuery } from "mongoose";

type Lookup = {
  from: string;
  as: string;
};

// TODO: Proper default dynamic pipeline

export const createDefaultPipeline = <T>(
  lookups: Lookup[]
): FilterQuery<T>[] => {
  const pipeline = [];

  pipeline.push(
    lookups.map((lookup) => {
      return {
        $lookup: {
          from: lookup.from,
          localField: `${lookup.as}_id`,
          foreignField: "_id",
          as: lookup.as,
        },
        $unwind: `${lookup.as}`,
      };
    })
  );

  return pipeline;
};
