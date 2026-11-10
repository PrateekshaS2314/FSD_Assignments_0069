import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import BrowsePets from './pages/BrowsePets.jsx';
import PetDetails from './pages/PetDetails.jsx';
import AddPet from './pages/AddPet.jsx';
import EditPet from './pages/EditPet.jsx';
import AdoptionFormPage from './pages/AdoptionFormPage.jsx';
import AdoptionRequests from './pages/AdoptionRequests.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { AdminRoute, ProtectedRoute } from './components/RouteGuards.jsx';

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Routes><Route element={<AppShell />}>
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}><Route path="profile" element={<ProfilePage />} /></Route>
    <Route element={<AdminRoute />}>
      <Route path="admin" element={<AdminPage />} />
      <Route path="pets/new" element={<AddPet />} />
      <Route path="pets/:id/edit" element={<EditPet />} />
      <Route path="requests" element={<AdoptionRequests />} />
    </Route>
    <Route path="pets" element={<BrowsePets />} />
    <Route path="pets/:id" element={<PetDetails />} />
    <Route path="pets/:id/adopt" element={<AdoptionFormPage />} />
    <Route path="adopt" element={<Navigate to="/pets" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></BrowserRouter>;
}
