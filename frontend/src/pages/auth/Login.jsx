import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../services/api.js';
import { useAuthStore } from '../../store/authStore.js';
import Button from '../../components/ui/Button.jsx';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/auth/login', values);
      setSession(data);
      navigate(data.user.role === 'candidate' ? '/candidate' : '/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Login</h1>
        <label className="mt-6 block text-sm font-medium text-slate-700">Email</label>
        <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="email" {...register('email', { required: true })} />
        <label className="mt-4 block text-sm font-medium text-slate-700">Password</label>
        <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="password" {...register('password', { required: true })} />
        <Button className="mt-6 w-full">Sign In</Button>
      </form>
    </main>
  );
}
