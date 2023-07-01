import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <GoogleLogin
  clientId="3617139942-q2tpaatkgh80vuenj239u3i5vgm5v1ad.apps.googleusercontent.com"
  redirectUri="https://devquiz-taupe.vercel.app/auth/google/callback"
  onSuccess={onSuccess}
  onFailure={onFailure}
  className="google-auth-button"
  />
);

export default GoogleAuthButton;
