import React, { Component } from "react";
import { Storage } from 'aws-amplify'


class ImageUpload extends Component {
    constructor() {
        super()
        this.state = {
            fileURL: '',
            file: '',
            filename: ''
        }
    }

    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileURL: URL.createObjectURL(file),
            file,
            filename: file.name
        })
    }

    saveFile = () => {
        //save file to AWS bucket
        Storage.put(this.state.filename, this.state.file)
            .then(() => {
                console.log('saved file!');

                //get the url from the file that was just saved
                Storage.get(this.state.filename)
                    .then((data) => {
                        console.log(data.slice(0,115));
                        
                        //call method in parent component with the URL of the file that was saved
                        this.props.setImageURL(data.slice(0,115))
                    }
                    )
                this.setState({ fileURL: '', file: '', filename: '' });
                //to-do get the image URL to pass to the DB
            })
            .catch((error) => {
                console.log('error:', error);
            })
    }

    render() {
        return (
            <div>
                <h3>AWS S3 Upload</h3>
                <input type='file' onChange={this.handleChange}></input>
                <button onClick={this.saveFile}>Save File</button>
                <img src={this.state.fileURL} alt='' />
            </div>
        );
    }
}

export default ImageUpload;
