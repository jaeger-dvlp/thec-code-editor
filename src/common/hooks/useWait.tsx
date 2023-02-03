export default function useWait() {
  const wait = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return { wait };
}
