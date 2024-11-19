import slugBuilder from "slugify";

export const slugify = (string) => {
  return slugBuilder(string, { lower: true });
};
