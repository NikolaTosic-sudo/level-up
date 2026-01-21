import ProfileCreationForm from "./components/ProfileCreationForm";
import { ProfileCreationSteps } from "./components/ProfileCreationSteps";
import { ProfileCreationWrapper } from "./components/ProfileCreationWrapper";

import "./styles/style.css";

function ProfileCreation() {
  return (
    <ProfileCreationWrapper>
      <ProfileCreationSteps />
      <ProfileCreationForm />
    </ProfileCreationWrapper>
  );
}

export default ProfileCreation;
