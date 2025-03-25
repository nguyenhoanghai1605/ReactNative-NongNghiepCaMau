/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, ImageBackground ,Image,TextInput,Button} from 'react-native';
import { createStackNavigator ,createAppContainer,navigationOptions} from 'react-navigation';
import DanhSach from './DanhSach';
import Router from './Router';
import AwesomeButton from 'react-native-really-awesome-button';

export class Apps extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      TaiKhoan : "tqky",
      MatKhau : "b427ebd39c845eb5417b7f7aaf1f9724"
    }
  }
  static navigationOptions = { header: null }
  DangNhapThanhCong = () => {
  }
  getDataJson =  (url,dataInputObject,callbackHandle) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function () {
          if (xhr.status === 200 && xhr.readyState === 4) {
              callbackHandle(xhr.response);
          } else {
              callbackHandle(xhr.response);
          }
      };
      xhr.send(JSON.stringify(dataInputObject));
  };
  DangNhap = (taiKhoan,matKhau) => {
    new Promise((resolve,reject) => {
      this.getDataJson("http://172.29.14.66:81/api/TaiKhoan/DangNhap",{
        TenTaiKhoan: this.state.TaiKhoan,
        MatKhau: this.state.MatKhau,
        NenTang: "Android"
       },
      (data) => {
        if(data!=null){
          if(data.KetQua==1) {
            resolve(data)
          }
          else {
            reject(data);
          }
        }
        else {
          reject(data);
        }
      }
      )
    }).then((data)=>{return Promise.resolve(); },()=>{alert(data.ThongBao);},()=>{alert("Thất bại");}).then(()=>{this.props.navigation.navigate('DanhSach') },()=>{}).catch((err)=>{alert(err);});
  }
  render() {
    return (
        <ImageBackground       
              source = {require('./img/bg_header.png')}
              style={{
              width: '100%', height: '100%',
              marginTop: 80,
              flex: 1,
              alignItems: 'center',    
              flexDirection: 'column'}}>
            <Image style = {styles.logo} 
                  source = {require('./img/logo.png')}></Image>
            <Text style = {styles.tieude}>NÔNG NGHIỆP PHÚ YÊN</Text>
            <Text style = {styles.tieude2}>ĐĂNG NHẬP HỆ THỐNG</Text>
            <TextInput editable = {false}
                    style={{width:300,
                    height: 40, borderColor: 'gray', 
                    borderWidth: 0.5, borderRadius: 20,
                    paddingHorizontal: 20, marginBottom: 10}}     
                    onChangeText={(text) => this.setState({TaiKhoan:text})}
                    value={this.state.text}>
                  {this.state.TaiKhoan}
            </TextInput>
            <TextInput editable = {false}
                    style={{width:300, height: 40, borderColor: 'gray', borderWidth: 0.5, borderRadius: 20, paddingHorizontal: 20, marginBottom: 10}}           
                    onChangeText={(text) => this.setState({MatKhau:text})}
                    value={this.state.text}>
                    {this.state.MatKhau}
            </TextInput>
            <View style = {{
              width:'100%',height:'100%',
              marginLeft:20,
              marginRight:20,
              paddingLeft:20,paddingRight:20
            }}>
            <Button
                onPress={()=>{this.DangNhap(this.state.TaiKhoan,this.state.MatKhau)}}
                title="ĐĂNG NHẬP"
                color="#075e54"
                style={{width:300, height: 50,
                 marginLeft:30,marginRight:30,
                borderWidth: 0.5, borderRadius: 20}}/>
          </View>
      </ImageBackground>
    );
  }
}
const AppStackNavigation = createStackNavigator({
  DangNhap : 
            {
              headerVisible : false,
              headerTintColor: '#fff',
              headerMode: 'none',
              screen: Apps,           
              navigationOptions: () => ({
                headerVisible: false,
              }),             
              headerTitleStyle: { color: '#075e54' },   
            },
  DanhSach : {
          screen: DanhSach,
          navigationOptions: () => ({
            title: 'Danh sách báo cáo tuần',
            headerStyle: {
              backgroundColor: '#075e54',
            },
            headerTitleStyle: { color: '#fff'},   
          })
        },
});
const App = createAppContainer(AppStackNavigation);

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: 'center',    
    flexDirection: 'column',
  },
  tieude: {
    fontSize: 22,
    color: '#075e54',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  tieude2: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo : {
    width : 150,
    height : 150
  },
});
export default App;
