import { useState } from 'react';
import { handleAddTweet } from '../actions/tweets';
import { connect } from 'react-redux';

const NewTweet = ({ dispatch, id }) => {
  const [text, setText] = useState('');

  const handleSetText = (event) => {
    const text = event.target.value;
    setText(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('New Tweet: ', text);
    setText('');

    dispatch(handleAddTweet(text, id));
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
