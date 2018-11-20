import React, { Component } from 'react'
//import './IconLibrary.css';

class IconLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIcons: '',
    }

    this.setSelectedIcons = this.setSelectedIcons.bind(this)
  }

  setSelectedIcons(icons) {
    this.setState({ selectedIcons: icons })
    this.props.setColor(this.state.selectedIcons)
  }

  render() {
    const icons = [
      <img src="https://i.imgur.com/nzXTQyt.jpg" alt="icon" />,
      <img src="https://i.imgur.com/aSgCIpy.jpg" alt="icon" />,
      <img src="https://i.imgur.com/mdfx1WG.jpg" alt="icon" />,
      <img src="https://i.imgur.com/2qriWaZ.jpg" alt="icon" />,
      <img src="https://i.imgur.com/02XRV8N.jpg" alt="icon" />,
      <img src="https://i.imgur.com/kn2frv5.jpg" alt="icon" />,
      <img src="https://i.imgur.com/7IKsJ45.jpg" alt="icon" />,
    ]

    console.log('this.state', this.state)
    return (
      <div className="IconLibrary--container">
        {icons.map(icon => {
          return (
            <div className="icons" key={icon}>
              <button style={{ background: icon }} onClick={() => this.setSelectedIcons(icon)}>
                {icon}
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}
export default IconLibrary
