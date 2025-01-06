import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const Links = db.link;
export const Users = db.user;
