import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";
import authConfig from "@/auth.config";
import {db} from "@/lib/db";


export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages : {
      signIn: '/auth/login',
      error: '/auth/error',
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
          // Permitir OAuth sin verificación de correo electrónico
            if (account?.provider !== "credentials") return true;


            // @ts-ignore
            const existingUser = await getUserById(user.id);

            // Prevenir inicio de sesión si el correo electrónico no está verificado
            if (!existingUser?.emailVerified) return false;

            //TODO: Añadir 2FA verificación

            return true;
        },

        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,
});