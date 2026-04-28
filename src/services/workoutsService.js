import { workoutsRepo } from "../repositories/workoutsRepo.js";
import { canAccess } from "../middleware/auth.js";

export const workoutsService = {
  create: (body, user) =>
    workoutsRepo.create({
      title: body.title,
      category: body.category,
      durationMin: Number(body.durationMin),
      ownerId: user.id
    }),

  list: (user) => workoutsRepo.list(user.role === "ADMIN" ? {} : { ownerId: user.id }),

  async getById(id, user) {
    const item = await workoutsRepo.getById(id);
    if (!item) return { error: 404, message: "Not found" };
    if (!canAccess(item.ownerId, user)) return { error: 403, message: "Forbidden" };
    return { item };
  },

  async update(id, body, user) {
    const current = await workoutsRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };

    const updated = await workoutsRepo.update(id, {
      title: body.title ?? current.title,
      category: body.category ?? current.category,
      durationMin: body.durationMin ? Number(body.durationMin) : current.durationMin
    });
    return { updated };
  },

  async remove(id, user) {
    const current = await workoutsRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };
    await workoutsRepo.remove(id);
    return { ok: true };
  }
};
