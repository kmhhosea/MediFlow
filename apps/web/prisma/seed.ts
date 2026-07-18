
import { PrismaClient } from '../src/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const clinic = await prisma.clinic.create({ data: { name: 'Riverside Family Health', slug: 'riverside' } });
  // ... locations, staff, patients, appointments
}

main().finally(() => prisma.$disconnect());
