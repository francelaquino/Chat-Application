import React, { Component } from 'react';
import {  StyleSheet, View,TouchableOpacity,ScrollView,Image } from 'react-native';
import { Left,Body,Right,Container, Header,Icon, Content,Title, Item, Input,Button,Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var registrationStyle = require('../styles/RegistrationStyle');

export default class Forgotpassword extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container style={registrationStyle.containerWrapper}>
            <Header style={registrationStyle.header}>
            <Body>
            <Title>Forgot Password</Title>
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
           
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Button full rounded style={registrationStyle.button}>
                <Text>Retrieve Password</Text>
            </Button>

            <TouchableOpacity onPress={() =>navigate('Login')}>
            <Text style={registrationStyle.loginButton}>Login</Text>
            </TouchableOpacity>
            
            </View>
            </View>
        
            </View>
            </ScrollView>
      </Container>
    );
  }
}