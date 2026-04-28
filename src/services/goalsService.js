import { goalsRepo } from "../repositories/goalsRepo.js";
import { canAccess } from "../middleware/auth.js";

export const goalsService = {
  create: (body, user) =>
    goalsRepo.create({
      title: body.title,
      description: body.description,
      targetDate: body.targetDate ? new Date(body.targetDate) : null,
      status: body.status || "ACTIVE",
      ownerId: user.id
    }),

  list: (user) => goalsRepo.list(user.role === "ADMIN" ? {} : { ownerId: user.id }),

  async getById(id, user) {
    const goal = await goalsRepo.getById(id);
    if (!goal) return { error: 404, message: "Not found" };
    if (!canAccess(goal.ownerId, user)) return { error: 403, message: "Forbidden" };
    return { goal };
  },

  async update(id, body, user) {
    const current = await goalsRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };

    const updated = await goalsRepo.update(id, {
      title: body.title ?? current.title,
      description: body.description ?? current.description,
      targetDate: body.targetDate ? new Date(body.targetDate) : current.targetDate,
      status: body.status ?? current.status
    });
    return { updated };
  },

  async remove(id, user) {
    const current = await goalsRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };
    await goalsRepo.remove(id);
    return { ok: true };
  }
};
