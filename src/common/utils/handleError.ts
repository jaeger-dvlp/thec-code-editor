const handleError = (error: any, t: any) => {
  if (error instanceof Error) {
    return error.message;
  }

  return t("errors.generic");
};

export default handleError;
