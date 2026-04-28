import db from "../config/db.js";

export const workoutsRepo = {
  create: (data) => db.workout.create({ data }),
  list: (where) => db.workout.findMany({ where }),
  getById: (id) => db.workout.findUnique({ where: { id } }),
  update: (id, data) => db.workout.update({ where: { id }, data }),
  remove: (id) => db.workout.delete({ where: { id } })
};
