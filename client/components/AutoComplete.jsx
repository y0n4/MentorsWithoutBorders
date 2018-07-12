import React from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import ChipsArray from './Chips';
import { occupations } from '../../database/dummyGen/occupations';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : occupations.filter(occupation =>
    occupation.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class AutoComplete extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      pickedCategories: [],
      deletedCategories: [],
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  componentDidMount() {
    axios.get('/getCategories')
     .then((data) => {
       this.setState({
         pickedCategories: data.data
       });
     })
  }

  componentWillUnmount() {
    axios.post('/addCategories', { categories: this.state.pickedCategories, deletedCategories: this.state.deletedCategories });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  handleDelete(data) {
    let chips = this.state.pickedCategories;
    let chipToDelete = chips.indexOf(data);
    chips.splice(chipToDelete, 1);

    this.setState({
      pickedCategories: chips,
      deletedCategories: [...this.state.deletedCategories, data]
    });
  }

  handleSubmit() {
    let category = this.state.value;
    
    this.setState({
      value: '',
      pickedCategories: [...this.state.pickedCategories, category]
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button onClick={() => this.handleSubmit()}>Add Topic</button>
        <ChipsArray chipData={this.state.pickedCategories} handleDelete={this.handleDelete}/>
      </div>
    );
  }
}

export default AutoComplete;