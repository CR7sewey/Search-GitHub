import { useState } from 'react'
import './App.css'
import { SearchForm } from './components/SearchForm';
import { UserProfile } from './components/UserProfile';


const App = () => {
  const [userName, setUserName] = useState("CR7sewey");
  return <main className='mx-auto max-w-6xl px-8 py-20'>

    <SearchForm userName={userName} setUserName={setUserName} />
    <UserProfile userName={userName} />
  </main>;
};
export default App;
