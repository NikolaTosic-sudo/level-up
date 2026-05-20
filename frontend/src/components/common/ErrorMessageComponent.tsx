export type ApiError = Error & { response?: Response };

export const getTheError = async (error: ApiError) => {
  let errBody;

  try {
    errBody = await error.response?.json?.();
  } catch {
    return "error";
  }

  return errBody?.message ?? "error";
};
