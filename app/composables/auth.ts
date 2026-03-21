import { signIn, signOut } from "~~/lib/auth-client";
export const useAuth = () => {
  const loginGithub = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };
  const handleLogout = async () => {
    await signOut();
  };
  return {
    loginGithub,
    handleLogout,
  };
};
