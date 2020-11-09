import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

//Importing components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';


export default () => {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
