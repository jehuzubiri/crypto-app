type Action<T = any> = {
  payload: T;
};

export function handleReducersPayload<T>(
  rootKey: keyof T,
  state: T,
  action: Action
): T[keyof T] {
  const payload = action.payload;
  const prevState = state[rootKey];

  try {
    if (payload === null || payload === undefined) {
      return payload as T[keyof T];
    }

    if (Array.isArray(prevState)) {
      return (Array.isArray(payload) ? payload : [...prevState]) as T[keyof T];
    }

    if (typeof prevState === "object" && prevState !== null) {
      const finalData = { ...prevState } as Record<string, any>;

      for (const key in payload) {
        const value = payload[key];

        if (
          typeof value === "object" &&
          value !== null &&
          typeof finalData[key] === "object"
        ) {
          finalData[key] = handleReducersPayload(
            key as keyof T,
            finalData as T,
            { payload: value }
          );
        } else {
          finalData[key] = value;
        }
      }

      return finalData as T[keyof T];
    }

    return payload as T[keyof T];
  } catch (error) {
    console.error("ERROR_REDUX_HELPERS_PAYLOAD_HANDLER", error);
    return state[rootKey];
  }
}
