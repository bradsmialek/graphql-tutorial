import React from 'react';
import Booklist from './components/booklist'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <header>
        <h1>React Front End</h1>
      </header>
      
      <Booklist/>
      <AmplifySignOut />
    </div>
  );
}

// export default App;
export default withAuthenticator(App);
