import { useState } from 'react';
import Main from './Mycomponents/Main';
import './App.css';

function App() {

 const [img, setImg]=useState(null);
  const handleChange=(e)=>{
      if (e.target.files && e.target.files[0]) {
        setImg(URL.createObjectURL(e.target.files[0]))
      }
  }
    
  return (
    <div className="App"> 
    <form className='main-form'>
      <input type="file" onChange={handleChange} className="choose"/>
     
     </form>
     <Main src={img} />
     
    
    </div>
  );
}

export default App;
