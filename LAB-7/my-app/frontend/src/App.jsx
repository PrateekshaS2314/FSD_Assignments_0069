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

export default function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Routes><Route element={<AppShell />}>
    <Route index element={<HomePage />} />
    <Route path="pets" element={<BrowsePets />} />
    <Route path="pets/new" element={<AddPet />} />
    <Route path="pets/:id" element={<PetDetails />} />
    <Route path="pets/:id/edit" element={<EditPet />} />
    <Route path="pets/:id/adopt" element={<AdoptionFormPage />} />
    <Route path="requests" element={<AdoptionRequests />} />
    <Route path="adopt" element={<Navigate to="/pets" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></BrowserRouter>;
}
