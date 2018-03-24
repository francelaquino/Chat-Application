import React, { Component } from 'react';
import {  StyleSheet, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import { Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var registrationStyle = require('../styles/RegistrationStyle');

export default class Register extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
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
            <Item  rounded style={registrationStyle.item}>
                <MaterialIcons  name='email' style={registrationStyle.icon}/>
                <Input style={registrationStyle.input} placeholder='Email Address'/>
            </Item>
            <Item  rounded style={registrationStyle.item}>
                <FontAwesome  name='lock'  style={registrationStyle.icon}/>
                <Input style={registrationStyle.input}  placeholder='Password'/>
            </Item>
           
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Button full rounded style={registrationStyle.button}>
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
    );
  }
}