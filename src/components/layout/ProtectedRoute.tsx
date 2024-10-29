import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../utils/tokenVerify";
import { logout } from "../../redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const user = token ? tokenVerify(token) : null;

  if (!token || (role && user?.role !== role)) {
    if (token && role && user?.role !== role) {
      dispatch(logout());
    }
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
