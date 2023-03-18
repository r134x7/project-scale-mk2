import { prisma } from "../src/server/db";

async function main() {
    const id = "nctsahc232394392cnsateihancesh";

    const ambitionId = "uvbwodl402978ubvwdvwud"

    const bondId1 = "0gfkmr0294822";
    const bondId2 = "gjfmkrfjkm08092483";

    await prisma.user.upsert({
        where: {
            id: id,
          },
          create: {
            id: id,
            name: "admin",
          },
          update: {},
    });

    await prisma.ambitions.upsert({
        where: {
            id: ambitionId,
        },
        create: {
            id: ambitionId,
            name: "Lose Weight",
            dailyPlan: "Something",
            endValue: 100,
            userId: id,
        },
        update: {}
    });

    await prisma.record.upsert({
        where: {
            id: bondId1,
        },
        create: {
            id: bondId1,
            ambitionId: ambitionId,
            value: 90,
            journal: "day 1",
        },
        update: {}
    });

    await prisma.record.upsert({
        where: {
            id: bondId2,
        },
        create: {
            id: bondId2,
            ambitionId: ambitionId,
            value: 80,
            journal: "day 2",
        },
        update: {}
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });