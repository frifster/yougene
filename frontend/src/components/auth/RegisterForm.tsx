import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authService.register(username, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center glass p-8 rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">
              Registration Successful!
            </h2>
            <p className="mt-2 text-center text-sm text-text/80">
              Your account has been created successfully. You can now log in to your account.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/login')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-white/10 bg-white/5 placeholder-text/50 text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent sm:text-sm transition-colors duration-200"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-white/10 bg-white/5 placeholder-text/50 text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent sm:text-sm transition-colors duration-200"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-white/10 bg-white/5 placeholder-text/50 text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent sm:text-sm transition-colors duration-200"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-sm text-center">
            <span className="text-text/70">Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-primary/90 transition-colors duration-200">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}; 