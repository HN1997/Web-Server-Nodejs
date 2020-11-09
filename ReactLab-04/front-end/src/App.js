import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

//Importing components
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';


export default () => {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
