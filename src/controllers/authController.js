import { authService } from "../services/authService.js";

export const signup = async (req, res) => {
  const { email, name, password, role } = req.body;
  if (!email || !name || !password) return res.status(400).json({ message: "Missing required fields" });

  const result = await authService.signup({ email, name, password, role });
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.status(201).json(result.user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

  const result = await authService.login({ email, password });
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json({ token: result.token });
};
