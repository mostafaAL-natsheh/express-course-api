import { Course } from "../shared/types";
import { GenericRepository } from "../shared/generic.repository";
import { v4 as uuid } from "uuid";

class CoursesService extends GenericRepository<Course> {
  createCourse(data: Partial<Course>, creatorId: string) {
    const now = new Date();
    const course: Course = {
      id: uuid(),
      title: data.title!,
      description: data.description!,
      image: data.image,
      creatorId,
      createdAt: now,
      updatedAt: now,
    };
    return this.create(course);
  }
}

export default new CoursesService();