import AuthLayout from '../components/layout/AuthLayout';
import AuthForm from '../components/ui/AuthForm';

const Login = ({ onNavigate }) => {
  return (
    <AuthLayout
      backgroundImage="/Assets/img/masuk.jpg"
      title="Masuk"
      subtitle="Selamat datang kembali!"
    >
      <AuthForm type="login" onNavigate={onNavigate} />
    </AuthLayout>
  );
};

export default Login;