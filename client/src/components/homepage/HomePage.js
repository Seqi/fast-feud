import React from 'react'

import ImageCarousel from './content/ImageCarousel'
import TitleText from './content/TitleText'

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="image-container">
                <ImageCarousel />
                <TitleText />
            </div>
        )
    }
}