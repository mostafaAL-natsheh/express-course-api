import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = bcrypt.hashSync("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@no.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@no.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.course.createMany({
    data: [
      { title: "Course 1", description: "First course", creatorId: "1" },
      { title: "Course 2", description: "Second course", creatorId: "1" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed finished.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
