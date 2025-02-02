import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button';

const App = () => {
  return <>
    <h1 className="text-2xl font-bold">Search Github Users</h1>
    <Button>Click me</Button>
    <Button variant='outline' size='lg'>
      Click me
    </Button>
    <Button variant='destructive' size='sm'>
      Click me
    </Button>
  </>;
};
export default App;
