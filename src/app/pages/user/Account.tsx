import { useLogout } from "@/app/hooks/user/useLogout";
import { useUser } from "@/app/hooks/user/useUser";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomBtn from "@/app/components/ui/CustomBtn";

const AccountPage: React.FC = () => {
  const { fetchedUser, userLoading } = useUser();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  if (userLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 stroke-[2px] text-gray-400" />
      </div>
    );
  }

  if (!fetchedUser) {
    return (
      <div className="h-screen flex flex-col gap-4 w-full justify-center items-center text-center px-4">
        <h1 className="text-2xl md:text-3xl font-semibold">
          You're not logged in
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Log in to view your account details.
        </p>
        <CustomBtn
          size="xl"
          onClick={() => navigate("/login")}
          icon={ArrowRightIcon}
          className="mt-2 rounded-full px-8"
        >
          Log In
        </CustomBtn>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-8 text-center">
        <img
          src={
            fetchedUser?.profilePic ||
            `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
          }
          alt={fetchedUser?.username || "User avatar"}
          className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-black/5 dark:ring-white/10"
        />

        <h2 className="text-xl font-semibold mt-4">{fetchedUser.username}</h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {fetchedUser.email}
        </p>

        <CustomBtn
          className="w-full mt-6 rounded-full"
          color="error"
          onClick={handleLogout}
          icon={LogOut}
        >
          Log out
        </CustomBtn>
      </div>
    </div>
  );
};

export default AccountPage;
