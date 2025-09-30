import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CoursesService {
  async createCourse(data: { title: string; description: string; image?: string }, creatorId: string) {
    return prisma.course.create({ data: { ...data, creatorId } });
  }

  async findAll() {
    return prisma.course.findMany();
  }

  async findById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<{ title: string; description: string; image?: string }>) {
    return prisma.course.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.course.delete({ where: { id } });
  }
}

export default new CoursesService();
