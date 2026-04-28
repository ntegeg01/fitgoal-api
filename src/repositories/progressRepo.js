import db from "../config/db.js";

export const progressRepo = {
  create: (data) => db.progressLog.create({ data }),
  list: (where) => db.progressLog.findMany({ where }),
  getById: (id) => db.progressLog.findUnique({ where: { id } }),
  update: (id, data) => db.progressLog.update({ where: { id }, data }),
  remove: (id) => db.progressLog.delete({ where: { id } }),
  getGoalById: (id) => db.goal.findUnique({ where: { id } })
};
