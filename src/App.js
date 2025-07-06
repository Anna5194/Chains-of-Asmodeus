import React from 'react';
import 'antd/dist/reset.css'; // Для Ant Design 5.x
import Menu from './components/menu-levels'
import Initiative from './components/initiative';

function App() {
  return (
    <div className="App">
      <Menu />
      <Initiative />
    </div>
  );
}

export default App;
