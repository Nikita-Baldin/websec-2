const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.YANDEX_API_KEY;

app.use(cors());
app.use(express.static('src'));


function handleApiError(error, res) {
    if (error.response) {
        console.error('Ошибка API:', error.response.data);
        res.status(error.response.status).json({ error: error.response.data.message || 'Ошибка API' });
    } else if (error.request) {
        console.error('Нет ответа от API:', error.request);
        res.status(503).json({ error: 'Сервис временно недоступен' });
    } else {
        console.error('Ошибка сервера:', error.message);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}


function processStationsData(data) {
    return {
        stations: data.countries?.flatMap(country =>
            country.regions?.flatMap(region =>
                region.settlements?.flatMap(settlement =>
                    settlement.stations?.map(station => ({
                        title: station.title,
                        code: station.codes.yandex_code,
                        lat: station.lat,
                        lng: station.lng,
                        transport_type: station.transport_type
                    }))
                )
            )
        ) || []
    };
}

app.get('/allStations', async (req, res) => {
    try {
        const response = await axios.get('https://api.rasp.yandex.net/v3.0/stations_list/', {
            params: {
                apikey: API_KEY,
                format: 'json',
                lang: 'ru_RU'
            }
        });
        const processedData = processStationsData(response.data);
        res.json(processedData);
    } catch (error) {
        handleApiError(error, res);
    }
});


app.get('/schedule', async (req, res) => {
    const station = req.query.station?.trim();
    if (!station) {
        return res.status(400).json({ error: 'Нужен код станции' });
    }
    try {
        const response = await axios.get('https://api.rasp.yandex.net/v3.0/schedule', {
            params: {
                apikey: API_KEY,
                station: station,
                transport_types: 'train, suburban',
                lang: 'ru_RU',
                format: 'json'
            }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(error, res);
    }
});

app.get('/nearestStations', async (req, res) => {
    const { lat, lng , distance = 50 } = req.query;
    try {
        const response = await axios.get('https://api.rasp.yandex.net/v3.0/nearest_stations/', {
            params: {
                apikey: API_KEY,
                lat: lat,
                lng: lng,
                distance: distance,
                transport_type: 'train, suburban',
                lang: 'ru_RU',
                format: 'json'
            }
        });
        res.json(response.data);
    } catch (error) {
        handleApiError(error, res);
    }
});

app.get('/searchRoutes', async (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ error: 'Нужно ввести все поля' });
    try {
        const response = await axios.get('https://api.rasp.yandex.net/v3.0/search/', {
            params: {
                apikey: API_KEY,
                from: from,
                to: to,
                transport_types: 'train, suburban',
                lang: 'ru_RU'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при поиске маршрутов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});