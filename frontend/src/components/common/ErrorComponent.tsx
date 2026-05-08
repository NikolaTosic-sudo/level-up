import { Result } from "antd";

type ErrorComponentProps = {
  error: Error;
};

function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <Result
      status={"404"}
      title={"Not found"}
      subTitle={error.message}
      styles={{ title: { color: "white" }, subTitle: { color: "white" } }}
    />
  );
}

export default ErrorComponent;
