import { Request, Response } from "express";
import coursesService from "./courses.service";
import { AuthRequest, authorizeRoles } from "../shared/middlewares";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export function createCourse(req: AuthRequest, res: Response) {
  try {
    const data = courseSchema.parse(req.body);
    const course = coursesService.createCourse(data, req.user!.id);
    res.json(course);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export function getAllCourses(req: Request, res: Response) {
  res.json(coursesService.findAll());
}

export function getCourseById(req: Request, res: Response) {
  const course = coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
}

export function updateCourse(req: AuthRequest, res: Response) {
  const course = coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (req.user!.role !== "ADMIN" && req.user!.id !== course.creatorId)
    return res.status(403).json({ message: "Forbidden" });

  try {
    const data = courseSchema.partial().parse(req.body);
    const updated = coursesService.update(req.params.id, data);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export function deleteCourse(req: AuthRequest, res: Response) {
  const course = coursesService.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (req.user!.role !== "ADMIN" && req.user!.id !== course.creatorId)
    return res.status(403).json({ message: "Forbidden" });

  coursesService.delete(req.params.id);
  res.json({ message: "Deleted successfully" });
}