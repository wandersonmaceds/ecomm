import joi from "joi";
import slugify from "slugify";

const categorySchema = joi.object({
  name: joi.string().trim().required(),
  parentId: joi.number().optional(),
});

export const createCategory = async (data, categoryRepository) => {
  const errorMap = {};
  const { error, value: categoryData } = categorySchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) => {
      errorMap[err.path] = err.message;
    });
  }

  const slug = slugify(categoryData.name, { lower: true });

  const existsBySlug = await categoryRepository.existsBySlug(slug);
  if (existsBySlug) {
    errorMap.name = '"Name" already used';
  }

  const category = { ...categoryData, slug };

  const hasErrors = Object.keys(errorMap).length > 0;

  if (!hasErrors) {
    const categoryWithID = await categoryRepository.save(category);
    category.id = categoryWithID.id;
  }

  return {
    error: hasErrors ? errorMap : null,
    category: category,
  };
};
