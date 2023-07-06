import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <GoogleLogin
  clientId={import.meta.env.VITE_CLIENT_ID}
  onSuccess={onSuccess}
  onFailure={onFailure}
  className="google-auth-button"
  />
);

export default GoogleAuthButton;
