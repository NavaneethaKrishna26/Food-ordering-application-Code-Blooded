import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
    </>
  );
}
