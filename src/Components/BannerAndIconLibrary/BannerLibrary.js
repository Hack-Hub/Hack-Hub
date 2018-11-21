import React, { Component } from 'react'
import './BannerLibrary.scss'

class BannerLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedColor: '',
    }

    this.setSelectedColor = this.setSelectedColor.bind(this)
    this.sendColor = this.sendColor.bind(this)
  }

  async setSelectedColor(color) {
    await this.setState({ selectedColor: color })
    await this.sendColor(color)
  }

  sendColor() {
    this.props.setColor(this.state.selectedColor)
  }

  render() {
    const colors = [
      '#777d80',
      '#363f44',
      '#f6402b',
      '#ec1361',
      '#9c1ab0',
      '#6733bb',
      '#3d4eb8',
      '#1193f5',
      '#01a6f6',
      '#01bad6',
      '#019587',
      '#45af4b',
      '#88c440',
      '#ccdd1d',
      '#f2e016',
      '#fec200',
    ]

    return (
      <div className="BannerLibrary--container">
        {colors.map(color => {
          return (
            <div key={color}>
              <button
                className="single-color"
                style={{ background: color }}
                onClick={() => this.setSelectedColor(color)}
              >
                {/* {color} */}
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}
export default BannerLibrary
