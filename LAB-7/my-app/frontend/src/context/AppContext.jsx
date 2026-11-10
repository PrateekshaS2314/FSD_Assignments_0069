import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getErrorMessage, petApi } from '../services/api.js';

const PetContext = createContext(null);

export function AppProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(null);

  const refreshPets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setPets(await petApi.list());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshPets(); }, [refreshPets]);

  const createPet = useCallback(async (values) => {
    const pet = await petApi.create(values);
    setPets((current) => [pet, ...current]);
    return pet;
  }, []);

  const updatePet = useCallback(async (id, values) => {
    const pet = await petApi.update(id, values);
    setPets((current) => current.map((entry) => entry._id === id ? pet : entry));
    return pet;
  }, []);

  const deletePet = useCallback(async (id) => {
    await petApi.remove(id);
    setPets((current) => current.filter((entry) => entry._id !== id));
  }, []);

  const notify = useCallback((message, type = 'success') => {
    setNotice({ message, type, id: Date.now() });
    window.setTimeout(() => setNotice((current) => current?.message === message ? null : current), 3800);
  }, []);

  const value = useMemo(() => ({
    pets, loading, error, refreshPets, createPet, updatePet, deletePet,
    notify, notice, dismissNotice: () => setNotice(null)
  }), [pets, loading, error, refreshPets, createPet, updatePet, deletePet, notify, notice]);

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function useApp() {
  const context = useContext(PetContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
