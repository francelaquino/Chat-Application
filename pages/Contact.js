import React, { Component } from 'react';
import { ListView, StyleSheet, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import { ListItem,List,Root,Toast,Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../config/firebase';
var registrationStyle = require('../styles/RegistrationStyle');
var logindetails = require('../config/variables');
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);


const userRef = firebase.database().ref().child('users').orderByChild("name");

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            users:{
                uid:'',
                initial:'',
                name:'',
                email:'',
                profileimage:''
            }
          };
      }

   

     

    componentDidMount() {
        userRef.on('value', (dataSnapshot) => {
           
            if(dataSnapshot.exists){
                var users = [];
                dataSnapshot.forEach(function(child) {
                    let initial=child.val().name.charAt(0).toUpperCase();
                    if(child.key!=logindetails.uid){
                    users.push({
                        uid:child.key,
                        initial:initial,
                        name:child.val().name,
                        email:child.val().email,
                        profileimage:child.val().profileimage,
                        });
                    }
                });

              this.setState({
                users: users
              });
            }
             
             
        });
    }
    renderItem(data){
        const { navigate } = this.props.navigation;
        if(data){
            return (
                <ListItem icon onPress={() =>navigate('Chatroom',{recipientUid:data.uid})}>
                <Left>
                    <View style={styles.iconname}>
                    <Text style={styles.initial}>{data.initial}</Text>
                    </View>
                </Left>
                <Body>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.note} note>{data.email}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
                </ListItem>
            );
        }else{
            return (
                <View>
                </View>
            );
        }
    }
    render() {
    
       
    
        return (
            <Root>
            <Container style={registrationStyle.containerWrapper}>
            <Header style={registrationStyle.header}>
                <Body>
                <Title>Contacts</Title>
                </Body>
                </Header>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <List 
                    dataArray={this.state.users}
                    renderRow={this.renderItem.bind(this)}
                />

                

               
            
                </ScrollView>
        
        </Container>
        </Root>

    );
  }
}


const styles = StyleSheet.create({
    iconname:{
        backgroundColor:'#29abd2',
        width:30,
        height:30,
        borderRadius:15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:0,
        paddingRight:10,
       
       
        
    },
    initial:{
        color:'white',
        width:30,
        textAlign: 'center'

    },
    name:{
        fontSize:12,
        color:'#00b764',
    },
    note: {
        fontSize:9,
    },
    
  });
  