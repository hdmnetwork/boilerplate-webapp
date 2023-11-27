import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  config: {
    attributes: false, childList: true, subtree: true, characterData: true,
  },
};

export function useMutationObservable(targetElement: any, callback: any, options = DEFAULT_OPTIONS) {
  const [ observer, setObserver ] = useState<null|MutationObserver>(null);

  useEffect(() => {
    setObserver(new MutationObserver(callback));
  }, [ callback, options ]);

  useEffect(() => {
    if (!observer || !targetElement) {
      return () => {};
    }

    const { config } = options;

    observer.observe(targetElement, config);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ observer, targetElement, options ]);
}
