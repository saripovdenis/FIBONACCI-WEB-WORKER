import { useMemo } from 'react';

function useWorker(onMessage) {
  let worker;
  if (window.Worker) {
    worker = new Worker('worker.js');
    worker.onmessage = onMessage;
  }
  return useMemo(() => worker, []);
}

export default useWorker;
