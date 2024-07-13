import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../third-party/redux/reducers/authReducer';
import { useLoginMutation } from '../third-party/redux/fakestoreApi';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../third-party/redux/store';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [login, { isLoading, isError }] = useLoginMutation();

  const loginUser = async (username: string, password: string) => {
    try {
      const result = await login({ username, password }).unwrap();
      dispatch(loginSuccess({ token: result.token }));
      enqueueSnackbar({
        message: 'Login successful!',
        variant: 'success',
        persist: false,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to login:', error);
      enqueueSnackbar({
        message: 'Login failed!',
        variant: 'error',
        persist: false,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    enqueueSnackbar({
      message: 'Logout successful!',
      variant: 'success',
      persist: false,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
    navigate('/login');
  };

  const isAuthenticated = !!token;

  return {
    token,
    isAuthenticated,
    isLoading,
    isError,
    loginUser,
    logoutUser,
  };
};
export default useAuth;
