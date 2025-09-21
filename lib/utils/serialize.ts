// lib/utils/serialize.ts
export function serializeDoc<T extends Record<string, any>>(doc: T): T {
    return {
      ...doc,
      _id: doc._id?.toString?.() ?? doc._id,
      createdAt: doc.createdAt?.toISOString?.() ?? null,
      updatedAt: doc.updatedAt?.toISOString?.() ?? null,
      category:
        typeof doc.category === "object" && doc.category !== null
          ? {
              ...doc.category,
              _id: doc.category._id?.toString?.() ?? doc.category._id,
            }
          : doc.category?.toString?.() ?? doc.category,
    }
  }
  