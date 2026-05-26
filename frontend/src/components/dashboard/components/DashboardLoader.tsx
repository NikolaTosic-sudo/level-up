import LoadingComponent from "../../common/LoadingComponents";
import { useGetUser } from "../hooks/useGetUser";
import DashboardWrapper from "./DashboardWrapper";

function DashboardLoader() {
  const { data, isLoading } = useGetUser();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data) {
    return null;
  }

  return <DashboardWrapper user={data} />;
}

export default DashboardLoader;
