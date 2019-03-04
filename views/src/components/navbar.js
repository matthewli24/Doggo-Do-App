import React, {} from 'react';

const Navbar = (props) => {

  return (
    <div className='navbarContainer'>

      <div> Cat-Do App </div>

      <form onSubmit={props.handleLogin}>
        <input type="text" onChange={props.handleChangeForUsername}/>
        <button>Log In</button>
      </form>

      <button onClick={props.handleSignUp}>Sign Up</button>

    </div>
  )

}

export default Navbar;
