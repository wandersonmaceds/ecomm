import joi from "joi";
import slugify from "slugify";
import { validate } from "../../lib/validator.js";

const categorySchema = joi.object({
  name: joi.string().trim().required(),
  parentId: joi.number().optional(),
});

export const createCategory = async (data, categoryRepository) => {
  const {
    isValid,
    errors,
    value: category,
  } = await validate(
    categorySchema,
    data,
    [
      {
        validate: async (value) => {
          return categoryRepository.existsBySlug(slugify(value.name));
        },
        name: "name",
        message: '"Name" already used',
      },
    ],
    (value) => ({ ...value, slug: slugify(value.name) }),
  );

  if (isValid) {
    const categoryWithID = await categoryRepository.save(category);
    category.id = categoryWithID.id;
  }

  return {
    error: !isValid ? errors : null,
    category: category,
  };
};
