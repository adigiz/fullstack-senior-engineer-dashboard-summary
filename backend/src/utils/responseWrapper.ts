export const wrapResponse = (data: any, message: string = "Success") => {
  return {
    message,
    data,
  };
};
