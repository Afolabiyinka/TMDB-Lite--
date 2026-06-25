import { useUser } from "@/app/hooks/user/useUser";
import { Avatar, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ProfileAvatar = () => {
  const { fetchedUser, userLoading: isUserLoading } = useUser();

  const navigate = useNavigate();

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
            onClick={() => navigate("/account")}
            src={
              fetchedUser?.picture ||
              `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
            }
            className="cursor-pointer"
          />
        )
      )}
    </div>
  );
};

export default ProfileAvatar;
