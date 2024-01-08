import { useState, useEffect } from 'react';
import axios from 'axios';

const useDogadjaji = (initialUrl) => {
    const [dogadjaji, setDogadjaji] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        const fetchDogadjaji = async () => {
            try {
                setLoading(true);
                const response = await axios.get(initialUrl);
                if (!ignore) setDogadjaji(response.data.data);
            } catch (err) {
                if (!ignore) setError(err);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchDogadjaji();
        return () => { ignore = true; };
    }, [initialUrl]);

    return { dogadjaji, loading, error, setDogadjaji };
};

export default useDogadjaji;
