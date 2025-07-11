import React from 'react';
import 'antd/dist/reset.css'; // Для Ant Design 5.x
import Menu from './components/menu-levels'
import Initiative from './components/initiative';
import Monsters from './components/monsters'
import Avernus from './components/Avernus'

import styles from "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <div className='Content'>
        <Monsters />
        <Avernus />
        <Initiative />
        
      </div>
      
    </div>
  );
}

export default App;
