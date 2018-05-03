import React, { Component } from 'react';


import { WebView } from 'react-native';


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
        source={{uri: 'https://brown.co1.qualtrics.com/jfe/form/SV_cu9ppqo1mckUqSF'}}
        style={{height: '80%'}}
        domStorageEnabled={true}
        scalesPageToFit={true}              
      />
    );
  }
}