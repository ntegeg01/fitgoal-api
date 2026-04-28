import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepo from "../repositories/auth_repository.js";


export const authService = {
  async signup({ email, name, password, role }) {
    const existing = await authRepo.findUserByEmail(email);
    if (existing) return { error: 409, message: "Email already in use" };

    const user = await authRepo.createUser({
      email,
      name,
      passwordHash: await bcrypt.hash(password, 10),
      role: role === "ADMIN" ? "ADMIN" : "USER"
    });

    return { user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  },

  async login({ email, password }) {
    const user = await authRepo.findUserByEmail(email);
    if (!user) return { error: 401, message: "Invalid credentials" };

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return { error: 401, message: "Invalid credentials" };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return { token };
  }
};
