import React, { Component } from 'react';


import { WebView } from 'react-native';
<<<<<<< HEAD
=======

>>>>>>> c6b31edb9886e8c728e7bf61e9e53fdba4ded714

export default class InAppSurvey extends Component {
  constructor() {
    super();
    // this.state = {
    //    apiResponse: null,
    //   currentLinkID: ''
    // };
    //  handleChangeNoteId = (event) => {
    //     this.setState({currentLinkID: event});
  }

   // async saveNote() {
   //    let newNote = {
   //      body: {
   //        "NoteTitle": "My first note!",
   //        "NoteContent": "This is so cool!",
   //        "NoteId": this.state.noteId
   //      }
   //    }
   //    const path = "/Notes";

   //    // Use the API module to save the note to the database
   //    try {
   //      const apiResponse = await API.put("NotesCRUD", path, newNote)
   //      console.log("response from saving note: " + apiResponse);
   //      this.setState({apiResponse});
   //    } catch (e) {
   //      console.log(e);
   //    }
   //  }



  render() {
    return (
      <WebView
        source={{uri: 'https://s3.amazonaws.com/yoursurvey/quickstart.html'}}
        source={{uri: 'https://brown.co1.qualtrics.com/jfe/form/SV_cu9ppqo1mckUqSF'}}
        style={{height: '80%'}}
        domStorageEnabled={true}
        scalesPageToFit={true}              
      />
    );
  }
}