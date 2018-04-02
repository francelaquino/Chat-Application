import React, { Component } from 'react';
import { ListView, StyleSheet, View,TouchableOpacity,ScrollView,Image,AsyncStorage } from 'react-native';
import { ListItem,Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import { YellowBox } from 'react-native';
var loginDetails = require('../config/variables');

YellowBox.ignoreWarnings(['Setting a timer']);

import firebase from '../config/firebase';

var registrationStyle = require('../styles/RegistrationStyle');
var loginDetails = require('../config/variables');

const userRef = firebase.database().ref().child('users');


export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        

       
        

        this.recipientUid=this.props.navigation.state.params.recipientUid;
        //this.recipientUid="92etcXo5VlXo9recQAZNgk4HIwG3";

        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

          this.state = {
                message:'',
                dataSource: dataSource
          };
         
         
         
    
      }
      componentWillUnmount() {
        this.mounted = false;
      }
    componentDidMount() {
        this.mounted = true;
        this.listenForChats();
    }
  
    listenForChats() {
        let parent=this;
        let messageRef=firebase.database().ref("messages");
        messageRef.on("value",(snapshot)=>{
        let user_messageRef = firebase.database().ref().child('user-messages/'+this.recipientUid).on("value",(message)=>{
        //messageRef.then(message=>{
            var chats = [];
            message.forEach(items => {
                let messageid=items.val().messageid;
                console.log(messageid);
                messageRef.child(messageid).once("value", (child)=>{
                        let timestamp= Moment(new Date(parseInt(child.val().timestamp))).format("ddd HH:mm A");
                        let senderName="Me";
                       
                            let senderRef= firebase.database().ref().child('users/'+child.val().sender).once("value",(sender)=>{
                                if(loginDetails.uid!=child.val().sender){
                                    senderName=sender.val().name;
                                }
                                chats.push({
                                    message:child.val().message,
                                    timestamp: timestamp,
                                    sender:senderName,
                                });
                            })

                        
                        
                        
                        

                    })
                    

             })
             setTimeout(() => {
                parent.setState({
                    dataSource: parent.state.dataSource.cloneWithRows(chats)
                });
            }, 500);
        })
    })
       
      }

   
          

sendMessage() {
    let messageRef = firebase.database().ref().child('messages').getRef();
    let key = messageRef.push({ 
            message : this.state.message,
            timestamp : Date.now(),
            sender : loginDetails.uid,
            recipient : this.recipientUid,
        }).key;
        
    firebase.database().ref().child("user-messages/"+loginDetails.uid).push({messageid:key});
    firebase.database().ref().child("user-messages/"+this.recipientUid).push({messageid:key});

    this.setState({message:''})
}
  renderChats(chats) {
    if(this.mounted){
    return (
        
        <View  style={styles.chatContainer}>
        <View style={styles.headerContainer}>
            <Left ><Text style={styles.author}>{chats.sender}</Text></Left>
            <Right><Text style={styles.datetime}>{chats.timestamp}</Text></Right>
        </View>
        
        <View rounded style={styles.messageContainer}><Text  style={styles.message}>{chats.message}</Text></View>
        </View>

        );
    }else{
        return (
            <View></View>
        );
    }
}
  
  render() {
    var Dimensions = require('Dimensions')
    var {width, height} = Dimensions.get('window');

    const { navigate } = this.props.navigation;
    return (
        <Container  style={styles.container}>
         <Header style={registrationStyle.header}>
         <Left style={styles.headerLeft} >
         <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
            <Icon size={30} name='arrow-back' />
        </Button> 
          </Left>
          <Body >
            <Title >Chat</Title>
            </Body>
            </Header>

            <View style={{flex: 1}}>
            <ScrollView >
            <View style={{ height: height - 140}}>
           
           
            <ListView  ref={ref => this.listView = ref}
                onLayout={event => {
                this.listViewHeight = event.nativeEvent.layout.height}}
                onContentSizeChange={() => {
                this.listView.scrollTo({y: this.listView.getMetrics().contentLength - this.listViewHeight})
                }}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderChats.bind(this)}
                />
               
                
                </View>
                </ScrollView>
                <View style={styles.messageArea}>
                <Input style={styles.messageText} 
                 value={this.state.message}
                 onChangeText={message=>this.setState({message})} />
                <TouchableOpacity 
                  onPress={()=>this.sendMessage()}
                    style={[styles.iconSend,(this.state.message=='') && styles.iconSendDisabled]} >
                <FontAwesome style={{color:'white',fontSize:15}}  name='send' />
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
        fontSize:11,
        color:'#00b764',
        marginLeft:5,

    },
    datetime:{
        fontSize:10,
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
        fontSize:11,
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
        fontSize:12,
        borderRadius:8,
        marginRight:5,
        height:35,
        paddingTop:2,
        paddingBottom:0,
        paddingLeft:10,
        color:'#00b764'

    },
    iconSend:{
        alignItems: 'flex-end',
        backgroundColor:'#00b764',
        borderRadius:15,
        height:30,
        width:30,
        justifyContent: 'center',
        paddingRight:8,
    },
    iconSendDisabled:{
        backgroundColor:'silver',
    },
    headerLeft: {
        paddingLeft: 6,
        paddingRight: 6,
        width:40,
        flex:0,
    },
     
  });
  