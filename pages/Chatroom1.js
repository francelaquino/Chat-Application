import React, { Component } from 'react';
import { ListView, StyleSheet, View,TouchableOpacity,ScrollView,Image,AsyncStorage } from 'react-native';
import { ListItem,Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

import firebase from '../config/firebase';

var registrationStyle = require('../styles/RegistrationStyle');

export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.chatRef = firebase.database().ref();
       

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
    
          this.state = {
            message: '',
            dataSource: dataSource.cloneWithRows([
              { 
                  author: 'Francel',
                  datetime :'Date Time',
                  message : 'Message',

              },
              { 
                author: 'Francel',
                datetime :'Date Time',
                message : 'Message',

            },
            { 
                author: 'Francel',
                datetime :'Date Time',
                message : 'Message',

            }
            ])
          };
    
      }

      
      

      listenForChats(chatRef) {
        chatRef.on('value', (dataSnapshot) => {
          var chats = [];
          dataSnapshot.forEach((child) => {
            chats.push({
              name: child.val().name,
              _key: child.key
            });
          });
      
          this.setState({
            chats:chats
          });
        });
        console.log(this.state.chats);
        }

  renderChats(chats) {
    return (
        <View  style={styles.chatContainer}>
        <View style={styles.headerContainer}>
            <Left><Text style={styles.author}>{chats.author}</Text></Left>
            <Right><Text style={styles.datetime}>{chats.datetime}</Text></Right>
        </View>
        
        <View rounded style={styles.messageContainer}><Text  style={styles.message}>{chats.message}</Text></View>
        </View>

        );
    }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container  style={styles.container}>
         <Header style={registrationStyle.header}>
            <Body>
            <Title>Chat</Title>
            </Body>
            </Header>

            <View style={{flex: 1}}>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderChats.bind(this)}
            />

                <ListItem style={styles.chatList}>
                    <View  style={styles.chatContainer}>
                        <View style={styles.headerContainer}>
                        <Left><Text style={styles.author}>Author</Text></Left>
                        <Right><Text style={styles.datetime}>Date Time</Text></Right>
                        </View>
                        
                        <View rounded style={styles.messageContainer}>
                                <Text  style={styles.message}>Date Time</Text>
                        </View>
                    </View>
                </ListItem>
                <ListItem style={styles.chatList}>
                    <View  style={[styles.chatContainer,styles.altbackground]}>
                        <View style={styles.headerContainer}>
                        <Left><Text style={styles.author}>Author</Text></Left>
                        <Right><Text style={styles.datetime}>Date Time</Text></Right>
                        </View>
                        
                        <View rounded style={styles.messageContainer}>
                                <Text  style={styles.message}>Date Time</Text>
                        </View>
                    </View>
                </ListItem>
                <ListItem style={styles.chatList}>
                    <View  style={styles.chatContainer}>
                        <View style={styles.headerContainer}>
                        <Left><Text style={styles.author}>Author</Text></Left>
                        <Right><Text style={styles.datetime}>Date Time</Text></Right>
                        </View>
                        
                        <View rounded style={styles.messageContainer}>
                                <Text  style={styles.message}>Date Time</Text>
                        </View>
                    </View>
                </ListItem>
                <View style={styles.messageArea}>
                <Input style={styles.messageText} 
                 value={this.state.message}
                 onChangeText={message=>this.setState({message})} />
                <TouchableOpacity  style={[styles.iconSend,(this.state.message=='' ) && styles.iconSendDisabled]} >
                <FontAwesome style={{color:'white'}}  name='send' />
                </TouchableOpacity>
              </View>
            </View>
           
      </Container>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    chatList:{
        marginLeft:0,
        marginRight:0,
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        paddingBottom:0,
        borderBottomWidth:0,

    },
    chatContainer:{
        borderBottomWidth:0,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        flex:1,
        marginLeft:4,
        marginRight:4,
        marginTop:4,
        marginBottom:4,
        backgroundColor:'#eceded',
        borderRadius:8,

    },
    altbackground:{
        backgroundColor:'#f8f8f8',
    },
    headerContainer:{
        flexDirection:'row',
        height:10,
        paddingBottom:0,
        
    },
    author:{
        fontSize:8,
        color:'#00b764',
        marginLeft:5,

    },
    datetime:{
        fontSize:8,
        color:'gray',
        marginRight:5,
    },
    messageContainer:{
       
        marginLeft:2,
        marginRight:2,
        minHeight:10,
        
    },
    message:{
        width:'100%',
        textAlign: 'left',
        fontSize:8,
        color:'#6f7070',
        padding:3,
        
       
    },
    messageArea:{
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        padding:10,
        backgroundColor:'#cdcfcf',
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    messageText:{
        alignItems: 'flex-start',
        backgroundColor:'white',
        fontSize:10,
        borderRadius:8,
        marginRight:5,
        height:25,
        paddingTop:4,
        paddingBottom:0,
        paddingLeft:10,
        color:'#00b764'

    },
    iconSend:{
        alignItems: 'flex-end',
        backgroundColor:'#00b764',
        borderRadius:10,
        height:21,
        width:21,
        justifyContent: 'center',
        paddingRight:5,
    },
    iconSendDisabled:{
        backgroundColor:'silver',
    }
  });
  