type ErrorComponentProps = {
	error: Error;
};

function ErrorComponent({ error }: ErrorComponentProps) {
	return <div>There was an error, {error.message}</div>;
}

export default ErrorComponent;
