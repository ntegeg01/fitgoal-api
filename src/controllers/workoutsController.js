import { workoutsService } from "../services/workoutsService.js";

export const createWorkout = async (req, res) => {
  const { title, category, durationMin } = req.body;
  if (!title || !category || !durationMin) return res.status(400).json({ message: "title, category, durationMin are required" });
  return res.status(201).json(await workoutsService.create(req.body, req.user));
};

export const listWorkouts = async (req, res) => res.json(await workoutsService.list(req.user));

export const getWorkout = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await workoutsService.getById(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.item);
};

export const updateWorkout = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await workoutsService.update(id, req.body, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.json(result.updated);
};

export const deleteWorkout = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
  const result = await workoutsService.remove(id, req.user);
  if (result.error) return res.status(result.error).json({ message: result.message });
  return res.status(204).send();
};
