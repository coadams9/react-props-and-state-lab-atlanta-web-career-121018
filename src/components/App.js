import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  onChangeType = ({target: { value } }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: value
      }
    })
  }

  updateStatePets = (data) => {
    console.log(data)
    this.setState({
      pets: data
    })
  }



  fetchPets = () => {
    let fetchPoint = '/api/pets'

    if (this.state.filters.type !== 'all'){
      fetchPoint += `?type=${this.state.filters.type}`
    }

    fetch(fetchPoint)
    .then(res => res.json())
    .then(this.updateStatePets)
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map(pet => {
      return pet.id === id ? {...pet, isAdopted: true} : pet
    })
    this.setState({ pets })
  }

  render() {


    console.log(this.state)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
