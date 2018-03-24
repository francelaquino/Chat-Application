'use strict';

var React = require('react-native');

var { StyleSheet} = React;

module.exports = StyleSheet.create({
    containerWrapper: {
        backgroundColor:'white',
    },
    container: {
        backgroundColor:'white',
        flex: 1,
        padding:10,
        alignSelf: "center",
        flexDirection:'column',
        width:'90%',
        maxWidth:400,
    },
    header: {
        backgroundColor:'#00b764',
    },
    logoContainer:{
        alignItems: 'center',
    },
    logo:{
        height:140,
    },
    formContainer:{
        flex:3,
        marginBottom:50,
        padding:10,
    },
    item: {
        marginBottom: 10,
        backgroundColor:'#f3f3f4',
        borderColor:'#f3f3f4',
        height:42,
    },
    icon:{
        fontSize:20,
        color:'#4dcd92',
        marginLeft:10,
        width:20,
    },
    button:{
        backgroundColor:'#00b764',
        marginTop: 20,
    },
    loginButton:{
        color:'#00b764',
        fontSize:17,
        marginTop: 20,
        marginBottom: 20,
    },
    forgotButton:{
        color:'#c5c6c7',
        marginBottom: 10,
        fontSize:15,
  }
  

});
