import {useEffect, useState} from "react";
import {Alert} from "react-native";

const useFetch = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);
        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData().then();
    }, []);

    const reFetch = () => fetchData();

    return {data, isLoading, reFetch};
}

export default useFetch;