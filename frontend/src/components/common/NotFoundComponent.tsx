type NotFoundComponentProps = {
  message?: string;
};

function NotFoundComponent({ message }: NotFoundComponentProps) {
  return <div>{message ?? ""}</div>;
}

export type { NotFoundComponentProps };
export default NotFoundComponent;
