import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 