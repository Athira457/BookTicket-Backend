import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '../../config/database/dbConnection';
import User from '../../Modules/Model/userSchema';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          googleId:  account.id, 
          role: 'user', 
        });
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});