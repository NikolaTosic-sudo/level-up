import ErrorComponent from "../../common/ErrorComponent";
import LoadingComponent from "../../common/LoadingComponents";
import { useGetUser } from "../hooks/useGetUser";
import DashboardWrapper from "./DashboardWrapper";

function DashboardLoader() {
  const { data, isLoading, error, isError } = useGetUser();

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data) {
    return null;
  }

  return <DashboardWrapper user={data} />;
}

export default DashboardLoader;
