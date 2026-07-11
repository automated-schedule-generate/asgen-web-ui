'use client';

import { Suspense, useState } from 'react';
import { AuthForm } from '@/app/(auth)/auth/_components/auth-form.component';
import { SessionErrorToast } from './_components/session-error-toast.component';
import { RegisterForm } from '@/app/(auth)/users/_components/register-form.component';
import { Zap } from 'lucide-react';
import { About } from './_components/about.component';
import { Features } from './_components/features.component';
import { Footer } from './_components/footer.component';
import { Hero } from './_components/hero.component';
import { HowItWorks } from './_components/how-it-works.component';
import { ProjectStatus } from './_components/project-status.component';
import { UseCases } from './_components/use-cases.component';

// Simulação simplificada do Toast
const Toast = ({
  message,
  visible,
  onClose,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-cyan-500 text-black font-bold px-6 py-3 rounded-lg shadow-2xl animate-bounce flex items-center space-x-2">
      <Zap size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 text-black">
        ✕
      </button>
    </div>
  );
};

export default function App() {
  const [showToast, setShowToast] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-200">
      <Suspense>
        <SessionErrorToast />
      </Suspense>

      <Toast
        message="🚀 A redirecionar..."
        visible={showToast}
        onClose={() => setShowToast(false)}
      />

      <Hero onRegisterClick={() => setOpenRegisterDialog(true)} />

      <About />

      <Features />

      <HowItWorks />

      <UseCases />

      <ProjectStatus />

      <Footer />

      <RegisterForm
        open={openRegisterDialog}
        onClose={() => setOpenRegisterDialog(false)}
        openAuthDialog={() => {
          setOpenRegisterDialog(false);
          setOpenAuthDialog(true);
        }}
      />
      <AuthForm
        open={openAuthDialog}
        onClose={() => setOpenAuthDialog(false)}
        openRegisterDialog={() => {
          setOpenAuthDialog(false);
          setOpenRegisterDialog(true);
        }}
      />
    </div>
  );
}
