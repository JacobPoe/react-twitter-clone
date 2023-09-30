import { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import { RouterProvider } from 'react-router';

import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      <LoadingBar />
      {props.loading === true ? null : (
        <TweetPage
          match={{
            params: {
              id: '8xf0y6ziyjabvozdd253nd'
            }
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
});

export default connect(mapStateToProps)(App);
