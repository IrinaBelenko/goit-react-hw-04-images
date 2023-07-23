import { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchHeader,
} from './Searchbar.styled';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    // обнуление параметров
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>
              <FiSearch size="16px" />
            </SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
