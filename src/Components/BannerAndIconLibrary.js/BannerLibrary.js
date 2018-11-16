import React, { Component } from 'react'
//import './BannerLibrary.css';

class BannerLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedColor: '',
    }

    this.setSelectedColor = this.setSelectedColor.bind(this)
  }

  setSelectedColor(color) {
    this.setState({ selectedColor: color })
    this.props.setColor(this.state.selectedColor)
  }

  render() {
    const colors = [
      '#333745',
      '#E63462',
      '#FE5F55',
      '#C7EFCF',
      '#EEF5DB',
      '#00B4A6',
      '#007DB6',
      '#FFE972',
      '#9C7671',
      '#0C192B',
    ]

    console.log('this.state', this.state)
    return (
      <div className="BannerLibrary--container">
        {colors.map(color => {
          return (
            <div key={color}>
              <button style={{ background: color }} onClick={() => this.setSelectedColor(color)}>
                {color}
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}
export default BannerLibrary
