import React, { Component } from "react";
import { Storage } from 'aws-amplify'
import './NewPost.scss'


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
        if(e.target.files[0]){
            const file = e.target.files[0]
            this.setState({
                fileURL: URL.createObjectURL(file),
                file,
                filename: file.name
            })
        }else{
            this.setState({
                fileURL:'',
                file:'',
                filename:''
            })
        }
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
            })
            .catch((error) => {
                console.log('error:', error);
            })
    }

    render() {
        return (
            <div className="imageUpload">
                <input type='file' onChange={this.handleChange}></input>
                <button onClick={this.saveFile}>Save Image</button>
               <div>
                   {this.state.filename}
               </div>
            </div>
        );
    }
}

export default ImageUpload;
