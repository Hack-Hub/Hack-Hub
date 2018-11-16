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
      <img src="http://i67.tinypic.com/2dmiejk.jpg" alt="icon" />,
      <img src="http://i64.tinypic.com/zl7n6a.jpg" alt="icon" />,
      <img src="http://i67.tinypic.com/11uuohy.jpg" alt="icon" />,
      <img src="http://i67.tinypic.com/2vmim29.jpg" alt="icon" />,
      <img src="http://i64.tinypic.com/2q00fx5.jpg" alt="icon" />,
      <img src="http://i65.tinypic.com/250ngk1.jpg" alt="icon" />,
      <img src="http://i67.tinypic.com/2819e90.jpg" alt="icon" />,
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
