import { Router } from "express";
import { createCategory } from "../../app/category/create-category.js";
import { HTTP_STATUSES } from "../../lib/http.js";

export default function getCategoryRouter(categoryRepository) {
  const categoryRouter = Router();

  categoryRouter.post("/categories", async (request, response) => {
    const { error, category } = await createCategory(
      request.body,
      categoryRepository,
    );

    if (error) {
      return response.status(HTTP_STATUSES.BAD_REQUEST).json(error);
    }

    return response.status(HTTP_STATUSES.CREATED).json(category);
  });

  return categoryRouter;
}
