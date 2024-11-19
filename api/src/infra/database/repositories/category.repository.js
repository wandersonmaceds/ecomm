export const getCategoryRepository = (connection) => ({
  save: async (category) => {
    const result = await connection.run(
      "INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, ?)",
      [category.name, category.slug, category.parentId ?? null],
    );

    if (result.lastID) {
      category.id = result.lastID;
    }

    return category;
  },
  existsBySlug: async (slug) => {
    const result = await connection.get(
      "SELECT * FROM categories WHERE slug = ?",
      [slug],
    );
    return result !== undefined;
  },
});
