import { hooked, useState, useEffect, useRef } from './lib/uhooks/esm.js';
import IdleTimer from './lib/IdleTimer.js';

const useElement = (name, attributes = {}) => {
  const ref = useRef(null);
  return (
    ref.current ||
    (ref.current = Object.assign(document.createElement(name), attributes))
  );
};

const Link = (text, attributes) => {
  const elm = document.createElement('a');
  Object.assign(elm, attributes);
  elm.textContent = text;

  return elm;
};

const pendChild = (params, elements) => {
  const { targetId, query } = params;

  const target = targetId
    ? document.getElementById(targetId)
    : query
    ? document.querySelector(query)
    : null;

  if (!target) throw error;
  if (elements?.length) {
    for (const element of elements) {
      target.appendChild(element);
    }
  } else target.appendChild(elements);
};

const effect = () => {
  const [isTimeout, setIsTimeout] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('render');
    const timer = new IdleTimer({
      timeout: 60 * 15, //expire after 10 seconds
      onTimeout: () => {
        console.log('timed_out');
        setIsTimeout(true);
      },
      onExpired: () => {
        // do something if expired on load
        console.log('expired');
        setIsTimeout(true);
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, [isTimeout]);
};

// hooked(effect)();

const timer = new IdleTimer({
  timeout: 60 * 15, //expire after 10 seconds
  onTimeout: () => {
    console.log('timed_out');
  },
  onExpired: () => {
    // do something if expired on load

    console.log('expired');

  },
});

pendChild({ targetId: 'test' }, [
  Link('link4', { href: '/' }),
  Link('link3', { href: 'http://localhost:5500' }),
]);
