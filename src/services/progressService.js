import { progressRepo } from "../repositories/progressRepo.js";
import { canAccess } from "../middleware/auth.js";

export const progressService = {
  async create(body, user) {
    const goal = await progressRepo.getGoalById(Number(body.goalId));
    if (!goal) return { error: 404, message: "Goal not found" };
    if (!canAccess(goal.ownerId, user)) return { error: 403, message: "Forbidden" };

    const created = await progressRepo.create({
      goalId: Number(body.goalId),
      value: Number(body.value),
      note: body.note || null,
      loggedAt: body.loggedAt ? new Date(body.loggedAt) : new Date(),
      ownerId: user.id
    });
    return { created };
  },

  list: (user) => progressRepo.list(user.role === "ADMIN" ? {} : { ownerId: user.id }),

  async getById(id, user) {
    const item = await progressRepo.getById(id);
    if (!item) return { error: 404, message: "Not found" };
    if (!canAccess(item.ownerId, user)) return { error: 403, message: "Forbidden" };
    return { item };
  },

  async update(id, body, user) {
    const current = await progressRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };

    const updated = await progressRepo.update(id, {
      value: body.value !== undefined ? Number(body.value) : current.value,
      note: body.note ?? current.note,
      loggedAt: body.loggedAt ? new Date(body.loggedAt) : current.loggedAt
    });
    return { updated };
  },

  async remove(id, user) {
    const current = await progressRepo.getById(id);
    if (!current) return { error: 404, message: "Not found" };
    if (!canAccess(current.ownerId, user)) return { error: 403, message: "Forbidden" };
    await progressRepo.remove(id);
    return { ok: true };
  }
};
