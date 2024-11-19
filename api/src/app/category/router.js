import { Router } from "express";
import { createCategory } from "./create-category.js";
import { categoryRepository } from "./category.repository.js";
import { HTTP_STATUSES } from "../../lib/http.js";

const router = Router();

router.post("/categories", async (request, response) => {
  const { error, category } = await createCategory(
    request.body,
    categoryRepository,
  );

  if (error) {
    return response.status(HTTP_STATUSES.BAD_REQUEST).json(error);
  }

  return response.status(HTTP_STATUSES.CREATED).json(category);
});

export default router;
