/** TODO: we shouldn't import the connection like this, we need to use DIP here */
import db from "../../infra/database/connection.js";

const save = async (category) => {
  const result = await db.run(
    "INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, ?)",
    [category.name, category.slug, category.parentId ?? null],
  );

  if (result.lastID) {
    category.id = result.lastID;
  }

  return category;
};

const existsBySlug = async (slug) => {
  const result = await db.get("SELECT * FROM categories WHERE slug = ?", [
    slug,
  ]);
  return result !== undefined;
};

export const categoryRepository = {
  save,
  existsBySlug,
};
