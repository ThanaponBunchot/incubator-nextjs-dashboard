import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.conf";
import { z } from "zod";
import { sql } from "@vercel/postgres";

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`
          SELECT * FROM users WHERE email = ${email}`;
      return user.rows[0];
    } catch (err) {
      console.error("Failed to get user", err);
      throw new Error("Failed to get user");
    }
  }

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;
        }
        return null;
      },
    }),
  ],
});