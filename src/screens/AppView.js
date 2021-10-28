import React from 'react';

import Navigator from '../Navagation/navagator';

export default function AppView() {
  return <Navigator onNavigationStateChange={() => { }} uriPrefix="/app" />;
}
