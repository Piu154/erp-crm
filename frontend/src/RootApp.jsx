import './style/app.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 

import store, { persistor } from '@/redux/store'; 
import PageLoader from '@/components/PageLoader';

const IdurarOs = lazy(() => import('./apps/IdurarOs'));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <Suspense fallback={<PageLoader />}>
            <IdurarOs />
          </Suspense>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
