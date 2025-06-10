import * as React from "react";
import { ArrowBigLeft } from "lucide-react";
import { Account } from "@toolpad/core/Account";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useUser } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeContext";

export default function AccountCustomSlotProps() {
  const [session, setSession] = React.useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
  // const { theme } = useTheme();

  // ✅ Restore session from localStorage on first load
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("TmdbUser"));
    if (storedUser) {
      setSession({
        user: {
          name: storedUser.name,
          email: storedUser.email,
          image: storedUser.picture,
        },
      });
    }
  }, []);

  const authentication = React.useMemo(() => {
    function handleLogOut() {
      setTimeout(() => {
        localStorage.removeItem("TmdbUser");
        setSession(null);
        navigate("/");
      }, 1000); // 1-second delay for smoother UX
    }

    return {
      signIn: () => {
        const userData = {
          name: user.name,
          email: user.email,
          picture: user.picture,
        };
        setSession({ user: userData });
        localStorage.setItem("TmdbUser", JSON.stringify(userData));
      },
      signOut: () => {
        handleLogOut();
      },
    };
  }, [user, navigate]);

  return (
    <div className="h-screen">
      <AppProvider
        authentication={authentication}
        session={session}
        
      >
        <Account
          slotProps={{
            signInButton: {
              color: "success",
            },
            signOutButton: {
              color: "success",

              startIcon: <ArrowBigLeft />,
            },
            preview: {
              variant: "expanded",
              slotProps: {
                avatarIconButton: {
                  sx: {
                    width: "fit-content",
                    margin: "auto",
                  },
                },
                avatar: {
                  variant: "circular",
                },
              },
            },
          }}
        />
      </AppProvider>
    </div>
  );
}
