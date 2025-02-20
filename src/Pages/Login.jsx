// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { useTheme } from "../Contexts/ThemeContext";

// export function Login() {
//   return (
//     <GoogleOAuthProvider clientId="174033130955-39h0ei41fhpdofvsg3iqb6jqbdch05d1.apps.googleusercontent.com">
//       <div>
//         <GoogleLoginButton />
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             const decoded = jwtDecode(credentialResponse.credential);
//             console.log("User Info:", decoded);
//             localStorage.setItem(decoded);
//           }}
//           onError={() => console.log("Login Failed")}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default Login;
