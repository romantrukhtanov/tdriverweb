import { useParams } from 'react-router-dom';

import type { URLParams } from 'pages/shared/types';

export function useURLParams() {
  const { ticketID = '', category = '' } = useParams<URLParams>();

  return {
    ticketID,
    category,
  };
}
