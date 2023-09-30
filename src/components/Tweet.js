import { connect } from 'react-redux';
import { formatDate, formatTweet } from '../utils/helpers';
import { handleToggleTweet } from '../actions/tweets';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Tweet = (props) => {
  const handleLike = (event, id) => {
    event.preventDefault();

    // TODO: Save like
    const { dispatch, tweet, authedUser } = props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser: authedUser
      })
    );
  };

  const toParent = (event, id) => {
    event.preventDefault();
    props.history.push(`/tweet/${id}`);
  };

  if (props.tweet === null) {
    return <p>This Tweet doesn't exist</p>;
  }

  const {
    name,
    avatar,
    timestamp,
    text,
    hasLiked,
    likes,
    replies,
    id,
    parent
  } = props.tweet;

  return (
    <Link to={`/tweet/${id}`} className="tweet">
      <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(event) => toParent(event, parent.id)}
            >
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <TiArrowBackOutline className="tweet-icon" />
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
