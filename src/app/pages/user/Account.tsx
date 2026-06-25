import { LoginModal } from "@/app/components/LoginModal";
import { useLogout } from "@/app/hooks/user/useLogout";
import { useUser } from "@/app/hooks/user/useUser";
import { Button } from "@material-tailwind/react";
import { Loader2, LogOut } from "lucide-react";

const AccountPage: React.FC = () => {
  const { fetchedUser, userLoading } = useUser();
  const { handleLogout } = useLogout();

  if (userLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin h-16 w-16 stroke-[2px]" />
      </div>
    );
  }

  if (!fetchedUser) {
    return (
      <LoginModal open={!fetchedUser} onClose={() => {}} context="account" />
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4">
      <div className="p-6 w-full max-w-sm text-center space-y-2">
        <img
          src={
            fetchedUser?.picture ||
            `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
          }
          alt={fetchedUser?.username || "User avatar"}
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />

        <h2 className="text-xl font-semibold">{fetchedUser.username}</h2>

        <p className="text-gray-600">{fetchedUser.email}</p>

        <Button
          isPill
          className="w-full mt-4"
          color="error"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default AccountPage;
