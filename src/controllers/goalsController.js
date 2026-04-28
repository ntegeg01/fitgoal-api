import { goalsService } from "../services/goalsService.js";

export const createGoal = async (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: "title is required" });
  const goal = await goalsService.create(req.body, req.user);
  return res.status(201).json(goal);
};

export const listGoals = async (req, res) => res.json(await goalsService.list(req.user));

export const getGoal = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await goalsService.getById(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.goal);
};

export const updateGoal = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await goalsService.update(id, req.body, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.updated);
};

export const deleteGoal = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await goalsService.remove(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.status(204).send();
};
