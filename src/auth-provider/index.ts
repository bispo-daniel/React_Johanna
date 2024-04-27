class ServerError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);

    this.code = code;
    this.name = "ServerError";
  }
}

export const responseOk = async (response: Response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new ServerError(message, response.status);
  }
}
