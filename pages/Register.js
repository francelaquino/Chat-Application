import React, { Component } from 'react';
import { ToastAndroid, StyleSheet, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import { Label,Root,Toast,Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../config/firebase';
var registrationStyle = require('../styles/RegistrationStyle');


export default class Register extends Component {
  constructor() {
    super();
    this.state = {
        name:'',
        email: '',
        password:'',
        retypepassword:'',
        nameError:false,
        emailError:false,
        passwordError:false,
        retypepasswordError:false
        
    };
  }

  submitRegistration(){
    var isReady=true;
      if(this.state.name==""){
        this.setState({nameError:true});
        isReady=false;
      }
      if(this.state.email==""){
        this.setState({emailError:true});
        isReady=false;
      }
      if(this.state.password==""){
        this.setState({passwordError:true});
        isReady=false;
      }

      if(this.state.retypepassword==""){
        this.setState({retypepasswordError:true});
        isReady=false;
      }

      
      if(this.state.password!=this.state.retypepassword){
        ToastAndroid.showWithGravityAndOffset(
          'Password mismatch',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );

        isReady=false;
      }

     

      if(isReady){
          firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((response)=>{
            let userid=response.uid;
        
           let userRef = firebase.database().ref().child("users/"+userid);

            userRef.set({ 
              email : this.state.email,
              name : this.state.name,
              profileimage : ''
            });

            this.setState({
              name:'',
              email:'',
              password:'',
              retypepassword:'',
            });
   
            ToastAndroid.showWithGravityAndOffset(
              'You have been successfully registered',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );

         
        }).catch(function(e){
          
          ToastAndroid.showWithGravityAndOffset(
            e.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
         
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
        <Title>Register</Title>
        </Body>
        </Header>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

        <View style={registrationStyle.container}>
          <View style={registrationStyle.logoContainer}>
            <Image  style={registrationStyle.logo} resizeMode='contain'  source={require('../images/logo.png')} />
            </View>
            <View style={registrationStyle.formContainer}>
            

              <Item  rounded style={[registrationStyle.item,(this.state.nameError && this.state.name=='' ) && registrationStyle.error]}>
                  <MaterialIcons  name='person' style={registrationStyle.icon}/>
                  <Input style={registrationStyle.input} 
                    name="name" 
                    value={this.state.name}
                    onChangeText={name=>this.setState({name})}
                    placeholder='Name'/>
              </Item>


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
              <Item  rounded style={[registrationStyle.item,(this.state.retypepasswordError && this.state.retypepassword=='' ) && registrationStyle.error]}>
                  <MaterialCommunityIcons name='textbox-password'  style={registrationStyle.icon}/>
                  <Input  style={registrationStyle.input}  secureTextEntry
                   value={this.state.retypepassword}
                   onChangeText={retypepassword=>this.setState({retypepassword})}
                   placeholder='Re-type Password'/>
              </Item>
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Button 
                  onPress={()=>this.submitRegistration()}
                  full rounded style={registrationStyle.button}>
                  <Text>Register</Text>
              </Button>

              <TouchableOpacity onPress={() =>navigate('Login')}>
              <Text style={registrationStyle.loginButton}>Login</Text>
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