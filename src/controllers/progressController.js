import { progressService } from "../services/progressService.js";

export const createProgress = async (req, res) => {
  if (!req.body.goalId || req.body.value === undefined) return res.status(400).json({ message: "goalId and value are required" });
  const result = await progressService.create(req.body, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.status(201).json(result.created);
};

export const listProgress = async (req, res) => res.json(await progressService.list(req.user));

export const getProgress = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await progressService.getById(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.item);
};

export const updateProgress = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await progressService.update(id, req.body, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.updated);
};

export const deleteProgress = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await progressService.remove(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.status(204).send();
};
