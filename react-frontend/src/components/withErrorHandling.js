import React from 'react';

const withErrorHandling = WrappedComponent => {
  return (props) => (
    <div>
      <div>
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      </div>
      <WrappedComponent {...props}/>
    </div>
  )
}

export default withErrorHandling;
