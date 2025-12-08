import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding roles...");

    await prisma.roles.createMany({
        data: [
            {
                Role_Name: "Super User",
                Permissions: [
                    "create_user",
                    "edit_user",
                    "delete_user",
                    "view_terms",
                    "edit_term",
                    "create_term",
                    "view_grades"
                ]
            },
            {
                Role_Name: "HM",
                Permissions: [
                    "view_terms",
                    "edit_term",
                    "view_grades"
                ]
            },
            {
                Role_Name: "Passer",
                Permissions: [
                    "view_terms",
                    "view_grades"
                ]
            }
        ]
    });

    console.log("Roles seeded successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
