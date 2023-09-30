import { useState } from 'react';
import { handleAddTweet } from '../actions/tweets';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewTweet = ({ dispatch, id }) => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSetText = (event) => {
    const text = event.target.value;
    setText(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(handleAddTweet(text, id));
    setText('');

    if (!id) {
      navigate('/');
    }
  };

  const charactersRemaining = 280 - text.length;

  return (
    <div>
      <h3 className="center">Compose a Tweet</h3>
      <form className="new-tweet" onSubmit={handleSubmit}>
        {/** TODO: redirect to '/' on submit */}
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleSetText}
          className="textarea"
          maxLength={280}
        />
        {charactersRemaining <= 100 && (
          <div className="tweet-length">{charactersRemaining}</div>
        )}
        <button className="btn" type="submit" disabled={text === ''}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewTweet);
