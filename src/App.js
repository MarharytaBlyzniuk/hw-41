import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null); // Состояние для данных
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок
    const [id, setId] = useState(1); // Параметр для рефетча

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                setData(response.data);
                setError(null);
            } catch (err) {
                setError('Ошибка загрузки данных');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // useEffect теперь зависит от id

    return (
        <div>
            <h1>Данные с сервера</h1>
            {loading && <p>Завантаження даних...</p>}
            {error && <p>{error}</p>}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.body}</p>
                </div>
            )}
            {/* Кнопка для изменения id */}
            <button onClick={() => setId((prevId) => prevId + 1)}>Загрузить следующий</button>
        </div>
    );
}

export default App;
