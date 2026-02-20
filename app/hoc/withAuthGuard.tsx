import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "~/context/AuthProvider";

/**
 * @param WrappedComponent
 * @param redirectTo
 */
export const withAuthGuard = (
  WrappedComponent: React.ComponentType,
  redirectTo = "/feedbacks",
) => {
  return (props: any) => {
    const { authenticated } = useContext(AuthContext);

    if (authenticated) return <Navigate to={redirectTo} replace />;
    
    return <WrappedComponent {...props} />;
  };
};
