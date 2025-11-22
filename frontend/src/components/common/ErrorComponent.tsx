import { Result } from "antd";

type ErrorComponentProps = {
	error: Error;
};

function ErrorComponent({ error }: ErrorComponentProps) {
	return <Result status={"404"} title={"Not found"} subTitle={error.message} />;
}

export default ErrorComponent;
