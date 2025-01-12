import { PrismaClient } from "@prisma/client";

// Creating new instance of Prisma Client
const db = new PrismaClient();

// Exporting Links Table and Users Table
export const Links = db.link;
export const Users = db.user;
