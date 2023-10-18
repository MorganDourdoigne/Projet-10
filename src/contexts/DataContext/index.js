import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      // Triez les événements par date en ordre décroissant
      const sortedEvents = loadedData.events.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData({ ...loadedData, events: sortedEvents });
      // 'last' est maintenant l'événement avec la date la plus récente
      setLast(sortedEvents[0]);
    } catch (err) {
      setError(err);
    }
  }, []);
  

  useEffect(() => {
    if (data) return;
    getData();
  });

  // Utilisez useMemo pour mémoriser l'objet passé à value
  const value = useMemo(
    () => ({
      data,
      last,
      error,
    }),
    [data, last, error]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
