import React, { Component } from 'react';
import {  ListView,StyleSheet, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import { Root,Toast,Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../config/firebase';
var registrationStyle = require('../styles/RegistrationStyle');

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);


export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password:'',
            emailError:false,
            passwordError:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              })
            
        };

       

        this.itemsRef = firebase.database().ref();
      }

      listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var items = [];
          snap.forEach((child) => {
            items.push({
              title: child.val().title,
              _key: child.key
            });
          });
    
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
          });
    
        });
      }

      componentDidMount() {
        /*this.itemsRef.push({ 
            chatRoom : {
                id : "id" ,
                message : "message",
                time : "time",
                author : "author",
            }
        });*/
      }

    checkLogin(){
       
        var isReady=true;
    
        if(this.state.email==""){
          this.setState({emailError:true});
          isReady=false;
        }
        if(this.state.password==""){
          this.setState({passwordError:true});
          isReady=false;
        }
  
  
        
       
  
       
  
        if(isReady){
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            this.setState({
              email:'',
              password:'',
            });
  
          }).catch(function(e){
            Toast.show({
              text: e.message,
              position: 'bottom',
              buttonText: 'Close',
              type:'success',
              duration:4000,
            })
          })
       }
    }
    render() {
    
        const { navigate } = this.props.navigation;
    
        return (
            <Root>
            <Container style={registrationStyle.containerWrapper}>
                <Header style={registrationStyle.header}>
                <Body>
                <Title>Login</Title>
                </Body>
                </Header>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={registrationStyle.container}>
        
                <View style={registrationStyle.logoContainer}>
                <Image  style={registrationStyle.logo} resizeMode='contain'  source={require('../images/logo.png')} />
                </View>
                <View style={registrationStyle.formContainer}>
                <Item  rounded style={[registrationStyle.item,(this.state.emailError && this.state.email=='' ) && registrationStyle.error]}>
                  <MaterialIcons  name='email' style={registrationStyle.icon}/>
                  <Input style={registrationStyle.input} 
                    name="email" 
                    value={this.state.email}
                    onChangeText={email=>this.setState({email})}
                    placeholder='Email Address'/>
              </Item>
              <Item  rounded style={[registrationStyle.item,(this.state.passwordError && this.state.password=='' ) && registrationStyle.error]}>
                  <FontAwesome  name='lock'  style={registrationStyle.icon}/>
                  <Input style={registrationStyle.input}  secureTextEntry
                   value={this.state.password}
                   onChangeText={password=>this.setState({password})}
                    placeholder='Password'/>
              </Item>
            
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Button onPress={()=>this.checkLogin()} full rounded style={registrationStyle.button}>
                    <Text>Login</Text>
                </Button>
            

                <TouchableOpacity onPress={() =>navigate('Register')}>
                <Text style={registrationStyle.loginButton}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>navigate('Forgotpassword')}>
                <Text style={registrationStyle.forgotButton}>Forgot your password?</Text>
                </TouchableOpacity>
                </View>
                </View>
            
                </View>
                </ScrollView>
        
        </Container>
        </Root>

    );
  }
}