import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactTable from './ContactTable/ContactTable';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleDeleteContact = idToDelete => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

  handleChangeFilter = e => {
    this.setState({
      filter: e.target.value.toLowerCase(),
    });
  };

  getFilteredContacts = () =>
    this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
    
  createContact = (name, number) => {
    return {
      id: nanoid(),
      name,
      number,
    };
  };

  handleAddContact = e => {
        // this.state.contacts.some(
    //   ({ name }) => name.toLowerCase() === newName.toLowerCase()
    // )
    // ? alert(`a contact with the name ${newName} already exists`)
    // : this.setState(prev => ({
    //   contacts: [].concat(
    //     this.createContact(newName, newNumber),
    //     prev.contacts
    //   ),
    // }));

    //this.state.contacts.find()
    e.preventDefault();

    const newName = e.target[0].value;
    const newNumber = e.target[1].value;
    this.state.contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase())
      ? alert('Already in list')
      : this.setState(prevState => ({
          contacts: [
            {
              name: newName,
              number: newNumber,
              id: nanoid(),
            },
            ...prevState.contacts,
          ],
        }));
  };

  render() {
    const contacts = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          handleChangeFilter={this.handleChangeFilter}
          value={this.state.filter}
        />
        <ContactTable
          contacts={contacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
