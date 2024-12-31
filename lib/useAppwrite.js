import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { isLoading } from "expo-font";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } 
    catch (error) {
      Alert.alert("Error", error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  const refetchLatest = () => fetchData();
  

  return { data,isLoading,refetch,refetchLatest };
};

export default useAppwrite;