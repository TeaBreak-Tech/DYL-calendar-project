import React from 'react'
import logo from './logo.svg';
import './App.css';
import Test from './components/calendar';

function App() {

  const [ day_of_month, setDayOfMonth ] = React.useState(0)

  return (
    <div className="App">
      <Test day_of_month={day_of_month} setDayOfMonth={setDayOfMonth}/>
      <p>{day_of_month}</p>
    </div>
  );
}

export default App;
