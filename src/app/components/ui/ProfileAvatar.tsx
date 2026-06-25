import { useUser } from "@/app/hooks/user/useUser";
import { Avatar, IconButton } from "@material-tailwind/react";

const ProfileAvatar = () => {
  const { fetchedUser, userLoading: isUserLoading } = useUser();

  return (
    <div>
      {isUserLoading ? (
        <IconButton
          className="flex items-center  animate-pulse justify-center "
          disabled
          color="secondary"
          isCircular
          size="lg"
        ></IconButton>
      ) : (
        fetchedUser && (
          <Avatar
            src={
              fetchedUser?.picture ||
              `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
            }
            className="mt-3 cursor-pointer"
          />
        )
      )}
    </div>
  );
};

export default ProfileAvatar;
