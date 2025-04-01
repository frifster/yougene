import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 