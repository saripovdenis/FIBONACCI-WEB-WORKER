import React, { useState } from 'react';
import useWorker from './hooks/useWorker';
import fibonacci, { fibonacciArgs, fibonacciString } from './service/fibonacci';
import Loader from './Loader';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('worker');

  const onMessage = ({ data }) => {
    setResult('' + data);
    setIsLoading(false);
  };

  const worker = useWorker(onMessage);

  const onClickHandler = async () => {
    await setIsLoading(true);
    if (mode === 'worker') {
      worker.postMessage({
        payload: +order,
        args: fibonacciArgs,
        action: fibonacciString,
      });
    } else {
      setResult(fibonacci(+order, fibonacci));
      setIsLoading(false);
    }
  };

  const handleRadioChange = (e) => {
    setMode(e.target.value);
    setResult('');
  };

  return (
    <div
      className="App"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'linear-gradient(to right, #ff6e7f, #bfe9ff)',
      }}>
      <div
        style={{
          display: 'grid',
          gap: '20px',
          width: '80vw',
          maxWidth: '400px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Loader />
        <div style={{ margin: 'auto' }}>Fiboncacci number calculator</div>
        <div
          style={{
            width: '75%',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <input
              type="radio"
              name="mode"
              value={'worker'}
              defaultChecked={mode === 'worker'}
              onChange={handleRadioChange}
              style={{ cursor: 'pointer' }}
            />
            <label>worker</label>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <input
              type="radio"
              name="mode"
              value={'monothread'}
              defaultChecked={mode === 'monothread'}
              onChange={handleRadioChange}
              style={{ cursor: 'pointer' }}
            />
            <label>monothread</label>
          </div>
        </div>
        <input
          placeholder="finonacci order number (42 for example)"
          onChange={(e) => setOrder(e.target.value)}
          value={order}
        />
        <input
          placeholder="result"
          onChange={(e) => setResult(e.target.value)}
          value={result}
          disabled
        />
        {isLoading ? (
          <div style={{ margin: 'auto' }}>loading...</div>
        ) : (
          <button onClick={onClickHandler} style={{ cursor: 'pointer' }}>
            calculate
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
