import { useState, useEffect } from "react";
import axios, { AxiosError, isAxiosError } from 'axios';

interface Entry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  });
  const [error, setError] = useState('');
  
  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          setError(String(error.response?.data));
          setTimeout(() => {
            setError('')
          }, 5000);

          console.log(error.response?.status);
          console.error(error.response?.data);
        } else {
          console.error('Error fetching diary entries:', error);
        }
      });
  }, []);
  
  const addEntry = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post<Entry>('http://localhost:3000/api/diaries', newEntry)
      .then(response => {
        setEntries(entries.concat(response.data));
        setNewEntry({
          date: '',
          visibility: '',
          weather: '',
          comment: ''
        });
      })
      .catch(error => {
        if (isAxiosError(error)) {
          setError(String(error.response?.data));
          setTimeout(() => {
            setError('')
          }, 5000);
          console.log(error.response?.status);
          console.error(error.response?.data);
        } else {
          console.error('Error fetching diary entries:', error);
        }
      });
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={addEntry}>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={(event) => setNewEntry({ ...newEntry, date: event.target.value })}
          />
        </div>
        <div>
          <label>Visibility</label>
          <div>
            {['great', 'good', 'ok', 'poor'].map((visibility) => (
              <label key={visibility}>
          <input
            type="radio"
            name="visibility"
            value={visibility}
            checked={newEntry.visibility === visibility}
            onChange={(event) => setNewEntry({ ...newEntry, visibility: event.target.value })}
          />
          {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Weather</label>
          <div>
            {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((weather) => (
              <label key={weather}>
          <input
            type="radio"
            name="weather"
            value={weather}
            checked={newEntry.weather === weather}
            onChange={(event) => setNewEntry({ ...newEntry, weather: event.target.value })}
          />
          {weather.charAt(0).toUpperCase() + weather.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Comment</label>
          <input
            type="text"
            value={newEntry.comment}
            onChange={(event) => setNewEntry({ ...newEntry, comment: event.target.value })}
          />
        </div>
        <button type='submit'>Add</button>
      </form>

      <h1>Diary entries</h1>
      
        {entries.map(entry => 
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>{entry.comment}</p>
        </div>
        )}
      
    </div>
  )
};

export default App;
