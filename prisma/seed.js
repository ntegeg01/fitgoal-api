import "dotenv/config";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = prismaPkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
  const adminHash = await bcrypt.hash("Password123!", 10);
  const userHash = await bcrypt.hash("Password123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", name: "Admin", passwordHash: adminHash, role: "ADMIN" }
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: { email: "user@example.com", name: "User", passwordHash: userHash, role: "USER" }
  });

  const g1 = await prisma.goal.create({ data: { title: "Lose 10 lbs", ownerId: user.id } });
  const g2 = await prisma.goal.create({ data: { title: "Run 5K", ownerId: admin.id } });

  await prisma.workout.createMany({
    data: [
      { title: "Leg Day", category: "Strength", durationMin: 45, ownerId: user.id },
      { title: "Cardio", category: "Cardio", durationMin: 30, ownerId: admin.id }
    ]
  });

  await prisma.progressLog.createMany({
    data: [
      { value: 2, note: "Down 2 lbs", ownerId: user.id, goalId: g1.id },
      { value: 1.5, note: "Ran 1.5 miles", ownerId: admin.id, goalId: g2.id }
    ]
  });
}

main().finally(() => prisma.$disconnect());
