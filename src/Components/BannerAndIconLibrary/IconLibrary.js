import React, { Component } from 'react'
import './IconLibrary.scss'

class IconLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIcon: '',
    }

    this.setSelectedIcon = this.setSelectedIcon.bind(this)
    this.sendIcon = this.sendIcon.bind(this)
  }

  async setSelectedIcon(icon) {
    await this.setState({ selectedIcon: icon.props.src })
    await this.sendIcon(this.state.selectedIcon)
  }

  sendIcon() {
    // console.log('this.state.selectedIcon', this.state.selectedIcon)
    this.props.setIcon(this.state.selectedIcon)
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
      <img src="https://i.imgur.com/2ez4bmd.jpg" alt="icon" />,
      <img src="https://i.imgur.com/Zz6lKgS.jpg" alt="icon" />,
      <img src="https://i.imgur.com/jro66FX.jpg" alt="icon" />,
      <img src="https://i.imgur.com/BvD3DM0.jpg" alt="icon" />,
      <img src="https://i.imgur.com/pg523eJ.jpg" alt="icon" />,
      <img src="https://i.imgur.com/su9ocmC.jpg" alt="icon" />,
    ]

    return (
      <div className="IconLibrary--container">
        {icons.map(icon => {
          return (
            <div key={icon.props.src}>
              <button
                className="single-icon"
                // style={{ background: 'none', outline: 'none' }}
                onClick={() => this.setSelectedIcon(icon)}
              >
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
