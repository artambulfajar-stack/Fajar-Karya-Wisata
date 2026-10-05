import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { DEFAULT_ADMIN_CREDENTIALS } from '../../data/dashboardData';
import { AdminUser } from '../../types/dashboard';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Check credentials against admin account
    const cleanUsername = username.trim().toLowerCase();
    const cleanExpectedUsername = DEFAULT_ADMIN_CREDENTIALS.username.toLowerCase();

    if (
      (cleanUsername === cleanExpectedUsername || cleanUsername === 'admin@fajarkaryawisata.my.id') &&
      password === DEFAULT_ADMIN_CREDENTIALS.password
    ) {
      if (rememberMe) {
        localStorage.setItem('fkw_admin_session', JSON.stringify(DEFAULT_ADMIN_CREDENTIALS.user));
      }
      onLoginSuccess(DEFAULT_ADMIN_CREDENTIALS.user);
      onClose();
    } else {
      setErrorMsg('Username atau kata sandi tidak sesuai. Silakan periksa kembali kredensial Anda.');
    }
  };

  const handleFillDemo = () => {
    setUsername(DEFAULT_ADMIN_CREDENTIALS.username);
    setPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={onClose}
            aria-label="Tutup dialog masuk"
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>PORTAL KEAMANAN OPERASIONAL</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Masuk Admin PT Fajar Karya Wisata
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Akses khusus manajemen untuk mengelola reservasi, armada bus, jadwal, dan konfigurasi sistem.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Username / ID Admin
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="Masukkan username admin..."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              <span>Ingat sesi masuk</span>
            </label>

            <button
              type="button"
              onClick={handleFillDemo}
              className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Isi Kredensial Demo</span>
            </button>
          </div>

          {/* Demo Hint Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-500 space-y-0.5 font-mono">
            <div><span className="font-semibold text-slate-700">Username:</span> admin</div>
            <div><span className="font-semibold text-slate-700">Password:</span> fajarkaryawisata</div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-2/3 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Masuk Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
