import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type ApiError = Error & { response?: Response };

type ErrorMessageProps = {
  error: ApiError | string;
  notApiError?: boolean;
};

const ErrorMessageComponent = ({ error, notApiError }: ErrorMessageProps) => {
  const { t } = useTranslation("errors");
  const [errMess, setErrMess] = useState("error");

  useEffect(() => {
    if (error && !notApiError && typeof error !== "string") {
      const getError = async () => {
        try {
          const errBody = await error.response?.json?.();
          setErrMess(t(errBody?.message ?? "error"));
        } catch {
          setErrMess(t("error"));
        }
      };

      getError();
    }
  }, [t, error, notApiError]);

  if (notApiError) {
    return <>{error}</>;
  }

  return errMess;
};

export default ErrorMessageComponent;
