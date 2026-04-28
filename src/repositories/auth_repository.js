import db from "../config/db.js";

const authRepo = {
  findUserByEmail: (email) => db.user.findUnique({ where: { email } }),
  createUser: (data) => db.user.create({ data })
};

export default authRepo;


