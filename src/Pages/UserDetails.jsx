export const UserDetails = ({ user }) => {
  const { theme } = useTheme();
  return (
    <div className={`h-[10vh] ${theme} text-black`}>
      <div>
        {user ? (
          <div>
            <h3>User Profile</h3>
            <p>First Name: {user.given_name}</p>
            <p>Email: {user.email}</p>
            <img src={user.picture} alt="Profile" width="50" />
          </div>
        ) : (
          <p>No user logged in.</p>
        )}
      </div>
    </div>
  );
};
