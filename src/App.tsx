import { useState, useEffect } from 'react';
import { Input, Card, Row, Col, Spin } from 'antd';
import { getWeatherForecast } from './services/weatherApi';
import { WeatherResponse } from './types/weather';
import './App.css';

function App() {
  const [location, setLocation] = useState('上海');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (searchLocation: string) => {
    setLoading(true);
    try {
      const data = await getWeatherForecast(searchLocation);
      setWeatherData(data);
    } catch (error) {
      console.error('获取天气数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const handleSearch = (value: string) => {
    const newLoc = value.trim();
    if (newLoc !== location) {
      setLocation(value);
      fetchWeatherData(value);
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <Input.Search
          placeholder="输入城市名称"
          onSearch={handleSearch}
          style={{ width: 300 }}
          size="large"
          defaultValue={location}
        />
      </div>
      
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : weatherData ? (
        <div className="weather-container">
          <h2>{weatherData.city}未来5天天气预报</h2>
          <Row gutter={[16, 16]}>
            {weatherData.future.map((day) => (
              <Col key={day.date} xs={24} sm={12} md={8} lg={6}>
                <Card title={day.date}>
                  <p>天气状况：{day.weather}</p>
                  <p>温度：{day.temperature}</p>
                  <p>风向：{day.direct} km/h</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </div>
  );
}

export default App;
