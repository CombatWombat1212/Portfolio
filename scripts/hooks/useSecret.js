import { useState, useEffect, useCallback } from 'react';

function useSecret(secret = 'secret', timeLimit = 30 * 1000) {
  const [secretTyped, setSecretTyped] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  const resetKeySequence = useCallback(() => {
    setKeySequence('');
  }, []);

  useEffect(() => {
    if (keySequence === secret) {
      setSecretTyped(true);
    } else {
      const timer = setTimeout(resetKeySequence, timeLimit);
      return () => clearTimeout(timer);
    }
  }, [keySequence, secret, resetKeySequence, timeLimit]);

  const handleKeyDown = useCallback(
    (event) => {
      if (secretTyped) return;
      setKeySequence((prevKeySequence) => prevKeySequence + event.key.toLowerCase());
    },
    [secretTyped]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return secretTyped;
}


export default useSecret;