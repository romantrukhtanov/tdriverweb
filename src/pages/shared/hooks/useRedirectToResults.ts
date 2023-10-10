import { useNavigate } from 'react-router-dom';

import { useURLParams } from 'pages/shared/hooks/useURLParams';
import { routes } from 'pages/routes';

export function useRedirectToResults() {
  const navigate = useNavigate();

  const { ticketID, category } = useURLParams();

  return {
    redirectToResults() {
      navigate(getResultsPagePath());
    },
  };

  function getResultsPagePath() {
    if (ticketID) {
      return routes.tickets.ticket.results.getRedirectPath({ ticket: ticketID });
    }

    if (category) {
      return routes.categories.category.results.getRedirectPath({ category });
    }

    return routes.quiz.results.getRedirectPath();
  }
}
