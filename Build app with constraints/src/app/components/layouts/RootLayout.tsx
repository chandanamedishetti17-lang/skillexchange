import { Outlet } from 'react-router';
import { Header } from '../navigation/Header';
import { AuthProvider } from '../../context/AuthContext';
import { Chatbot } from '../chatbot/Chatbot';

export function RootLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Header />
        <main>
          <Outlet />
        </main>
        <Chatbot />
      </div>
    </AuthProvider>
  );
}