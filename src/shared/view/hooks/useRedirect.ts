import { useNavigate } from 'react-router-dom';

export function useRedirect(redirectTo?: string) {
  const navigate = useNavigate();

  function navigateToMain() {
    navigate('/');
  }

  function redirect() {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigateToMain();
    }
  }

  return { redirect, navigateToMain };
}
