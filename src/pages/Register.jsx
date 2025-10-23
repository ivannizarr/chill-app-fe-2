import AuthLayout from '../components/layout/AuthLayout';
import AuthForm from '../components/ui/AuthForm';

const Register = ({ onNavigate }) => {
  return (
    <AuthLayout
      backgroundImage="/Assets/img/daftar.jpg"
      title="Daftar"
      subtitle="Selamat datang!"
    >
      <AuthForm type="register" onNavigate={onNavigate} />
    </AuthLayout>
  );
};

export default Register;