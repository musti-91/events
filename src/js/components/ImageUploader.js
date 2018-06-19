import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
const style = {
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "white",
  padding: 10,
  borderRadius: 4,
  pointer: "cursor"
};

class ImageUploader extends Component {
  constructor(props) {
    super();
    this.state = {
      url: "",
      filename: "",
      isUploading: false,
      progress: 0
    };
  }
  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0
    });
  };
  handleUploadError = error => {
    this.setState({
      isUploading: false
    });
    console.log(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      filename: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.props.uploadImage(url);
        this.setState({ url });
      });
  };
  handleProgress = progress => {
    this.setState({ progress });
  };
  render() {
    return (
      <div>
        <label style={style}>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.url && (
            <img src={this.state.url} alt={this.state.filename} />
          )}
          Select cover image
          <FileUploader
            hidden
            accept="image/*"
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </label>
      </div>
    );
  }
}

export default ImageUploader;
