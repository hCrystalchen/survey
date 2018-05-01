import React, { Component } from 'react';
import { WebView } from 'react-native';

// <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.7/xlsx.core.min.js"></script>

export default class InAppSurvey extends Component {

  constructor() {
    super();
    var googleDrive = require('google-drive');
    var urlDemographics = "https://drive.google.com/open?id=1_wd2LsWIyqovVjnwtEc7xxc25_jItUy3";
    var urlContacts = "https://drive.google.com/open?id=11yIvfMLg931SidFVPFWmRkEi4hv_YJws";
    var metaDemographics;
    var metaContacts;
    var demographicsFileId = as_id(urlDemographics);
    var contactFileId = as_id(urlContacts);
    var token = gapi.auth.getToken();
  }

  function callback(err, response, body) {
  if (err) return console.log('err', err)
  console.log('response', response);
  console.log('body', JSON.parse(body));
  }

  //retrieve metadata from google drive file for contacts
  storeFile(fileID) {
    var request = gapi.client.drive.files.get({
       'fileId': fileId
     });
    //store the metadata
     request.execute(function(resp) {
       metaContacts.push(resp.title,  resp.description, resp.mimeType); // title, description, MIME type
     });
  }

  // download the contents of the file
  downloadFile(file, callback) {
  if(file.downloadUrl) {
    var accessToken = gapi.auth.getToken().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file.downloadUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.onload = function() {
      callback(xhr.responseText);
    };
    xhr.onerror = function() {
      callback(null);
    };
    xhr.send();
  } else {
    callback(null);
  }
}

function getFile(token, fileId, callback) {
  googleDrive(token).files(fileId).get(callback);
}

function inDatabase(database, name){
  con.connect(function(err) {
    mysql.query("SELECT * from users where name = " + name, function(error, result, field) {
      if (result.length > 0) {
        if (result) {
          console.log("Test:" + result);
        }
      } else {
        console.log("no result");
      }
    });
  }
}

function updateDatabase(database, uname, newlink){
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE users SET currentlink = " + newlink + " WHERE username = " + uname; 
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });
}

  
  render() {
    // get metadata
    storeFile(demographicsFileId);
    storeFile(contactFileId);

    // use metadata to download file contents
    downloadFile(demographicsFileId);
    downloadFile(contactFileId);

    // parse through demographics and retrieve name
    urlDemographics.handleFile();
    urlContacts.handleFile();
    // --> TODO: parse through personal links and match username and when they match set the url to the one in the personal links scalesPageToFit

    //create database to hold the users from Android application
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "myusername",
      password: "mypassword",
      database: "mydb"
    });

    //create a table
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      /*Create a table named "users":*/
      var sql = "CREATE TABLE users (firstname VARCHAR(255), lastname VARCHAR(255), username VARCHAR(255), userid VARCHAR(255), currentlink VARCHAR(255),)";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });

    //insert some filler entries for now
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO users (firstname, lastname, username, userid, currentlink) VALUES ?";
      var values = [
        ['Chelse', 'Steele', 'chelsesteele', 'facebook.com'],
        ['Peter', 'Clarke', 'pclarke', 'google.com'],
        ['Joanna', 'Simwinga', 'jsimwing', 'youtube.com'],
        ['Crystal', 'Chen', 'huchen', 'twitter.com'],
        ['Emily', 'Blatt', 'eblatt', 'instagram.com']
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });

    // parses through the personal links csv file 
    var parseContacts = Papa.parse(urlContacts, {
      download: true,
      complete: function(results) {
        console.log(results);
      }
    });

    // parses through the demographics csv file 
    var parseDemographics = Papa.parse(urlDemographics, {
      download: true,
      complete: function(results) {
        console.log(results);
      }
    });

    // Demographics: first name, last name, username, survey link for the week
    for(i = 0; i < demoInfo.length; i++){
      if(inDatabase(contactName)){
        updateDatabase(contactName);
      } else {
        console.log("missing person");
      }
    }
    

    return (
      <WebView
        source={{uri: 'https://google.com'}}
        style={{height: '80%'}}
        domStorageEnabled={true}
        scalesPageToFit={true} />
    );
  }
}

