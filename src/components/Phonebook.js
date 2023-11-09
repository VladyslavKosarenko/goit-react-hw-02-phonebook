import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
export class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  handleChangeName = event => {
    const value = event.target.value;
    this.setState({ name: value });
  };
  handleChangePhone = event => {
    const valueNumber = event.target.value;
    this.setState({ number: valueNumber });
  };
  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
      )
    ) {
      alert(`${this.state.name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.setState(precState => ({
      contacts: [...precState.contacts, newContact],
      name: '',
      number: '',
    }));
  };
  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          onNameChange={this.handleChangeName}
          onNumberChange={this.handleChangePhone}
          onSubmit={this.handleSubmit}
        />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.handleChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
