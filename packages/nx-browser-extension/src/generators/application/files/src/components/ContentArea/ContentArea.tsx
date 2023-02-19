import { useEffect } from 'react';

export default function ContentArea() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <div className="content-view">content view</div>;
}
