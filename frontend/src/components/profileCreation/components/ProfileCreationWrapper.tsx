import type { ReactNode } from "react";

type ProfileCreationWrapperProps = {
  children: ReactNode;
};

export const ProfileCreationWrapper = ({
  children,
}: ProfileCreationWrapperProps) => {
  return <div className="profile-creation-wrapper">{children}</div>;
};
