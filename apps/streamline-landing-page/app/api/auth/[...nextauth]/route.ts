import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
      CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Email",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: credentials?.email, email: "jsmith@example.com" }
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          })
    ],
    pages: {
      signUp: "/signup", // Custom sign-in page
      signOut: "/signout", // Optional: if you want a custom sign-out page
      error: "/auth/error", // Optional: custom error page
    },
    callbacks: {
      async redirect() {
        return "/main"; // Always redirect to /chat after login
      },
    },
    secret: process.env.AUTH_SECRET
  }
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }