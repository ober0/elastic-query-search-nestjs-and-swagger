import { PrismaClient } from "@prisma/client";
import { Faker, ru } from "@faker-js/faker";

export const faker = new Faker({
    locale: ru
});

async function createMockUsers(prisma: PrismaClient) {
    const roles = await prisma.role.findMany();
    if (roles.length === 0) {
        throw new Error("Нет ролей в БД");
    }
    const roleIds: number[] = roles.map((role) => role.id);

    const users: any[] = [];

    for (let i = 0; i < 1000; i++) {
        const roleId = faker.helpers.arrayElement(roleIds);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = faker.internet.username({ firstName, lastName });
        const email = faker.internet.email({ firstName, lastName });
        const telegram = `@${faker.internet.username({ firstName, lastName })}`;

        users.push({
            username,
            firstName,
            lastName,
            email,
            telegram,
            roleId: roleId
        });
    }

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });
}

export async function userSeed(prisma: PrismaClient) {
    const count = await prisma.user.count();

    if (count < 1000) {
        await createMockUsers(prisma);
    }
}
