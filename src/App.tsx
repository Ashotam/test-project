import { useEffect, useState } from 'react';
import './App.css'
import CustomAutocomplete from './components/autocomplate'
function App() {
  type data = {
    id: string;
    name: string;
  };
  const [data, setData] = useState<data[]|[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
     <CustomAutocomplete options = {data}/>
    </>
  )
}

export default App
