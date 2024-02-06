import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function StatisticsScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { information } = router.query;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      router.push('/');
    }, 7000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      {isVisible && (
        <div>
          <h1>This screen will close automatically after 7 seconds.</h1>
          <p>test</p>
        </div>
      )}
    </div>
  );
}

export default StatisticsScreen;
