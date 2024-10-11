import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/authStore";

const GoogleLoginButton = () => {
  const { oauthSignIn } = useAuthStore();
  return (
    <GoogleLogin
      text="Continue with Google"
      onSuccess={async (credentialResponse) => {
        await oauthSignIn(
          credentialResponse.credential,
          credentialResponse.clientId
        );
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;
