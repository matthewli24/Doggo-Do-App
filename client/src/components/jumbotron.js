import React from 'react';
import Dog from '../assets/dog.svg'
import Dog1 from '../assets/dog1.svg'
import './iconImgFormat.css'

const Jumbotron = ({username, accessToken}) => {
  const name = (username && accessToken) ? (<h1>Welcome {username}</h1>) : null
    
  return (
    <div className="jumbotron jumbotron-fluid bg-primary text-white text-center">
      <div className="d-flex flex-row justify-content-around">
        <img className="jumboImgFormat" src={Dog1}/>
        <div className="display-3"> Doggo-Do App </div>
        <img className="jumboImgFormat" src={Dog}/>
      </div>
      {name}
    </div>
  )

}

export default Jumbotron;
