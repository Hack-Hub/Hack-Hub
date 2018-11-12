import React, { Component } from "react";
import {Storage} from 'aws-amplify'


class ImageUpload extends Component {
    constructor(){
        super()
        this.state={
            fileURL:'',
            file:'',
            filename:''
        }
    }
    handleChange = e =>{
        const file = e.target.files[0]
        this.setState({
            fileURL:URL.createObjectURL(file),
            file,
            filename:file.name

        })
    }
    saveFile = ()=>{
        Storage.put(this.state.filename,this.state.file)
        .then(()=>{
            console.log('saved file!');
            this.setState({fileURL:'',file:'',filename:''});
        })
        .catch((error)=>{
            console.log('error:',error);
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