export const wait = (ms = 700) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export async function simulateAction<T>(result: T, delay = 700): Promise<T> {
  await wait(delay);
  return result;
}

export const formatKES = (amount: number) => `KES ${amount.toLocaleString("en-KE")}`;
