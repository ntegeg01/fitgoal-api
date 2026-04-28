import db from "../config/db.js";

export const goalsRepo = {
  create: (data) => db.goal.create({ data }),
  list: (where) => db.goal.findMany({ where }),
  getById: (id) => db.goal.findUnique({ where: { id } }),
  update: (id, data) => db.goal.update({ where: { id }, data }),
  remove: (id) => db.goal.delete({ where: { id } })
};
