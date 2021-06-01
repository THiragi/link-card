export const fetcher = async <T>(url: string): Promise<T> =>
  await fetch(url)
    .then((data) => {
      if (!data.ok) {
        throw new Error(`${data.status}: ${data.statusText}`);
      }

      return data.json();
    })
    .catch(() => {});
