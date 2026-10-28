import RequireAuth from "@/components/auth/RequireAuth";
import SignInPage from "@/components/auth/SignInPage";
import ProfilePage from "@/components/profile/ProfilePage";

export const metadata = {
  title: "Your profile",
};

export default function ProfileRoute() {
  return (
    <RequireAuth fallback={<SignInPage />}>
      <ProfilePage />
    </RequireAuth>
  );
}
