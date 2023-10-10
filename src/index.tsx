import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from 'core/App';
import { fixIOsVh } from 'core/vh';
import { initServiceWorker } from 'shared/helpers/serviceWorker/initServiceWorker';
import { InstallationStore } from 'services/installation/mobx/InstallationStore';

import 'shared/view/styles/index.scss';

InstallationStore.listenEvents();

fixIOsVh();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

initServiceWorker();
