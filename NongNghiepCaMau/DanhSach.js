
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,ScrollView,Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class DanhSach extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {
          DanhSach : []
      }
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
    componentDidMount = () =>{
        new Promise((resolves,reject) => {
            this.getDataJson("http://172.29.14.66:81/api/BaoCaoSoNongNghiep/DocDanhSachTheoNam",
             {
                TokenNguoiDung:"XSIu6g\/L1Cp5sbXkKVkeC7TQQ8HkYmVnzTcG5PEIZp9Ke5+TEcc0ad2VsVBs6YJaXjB1OOkIfVk=",
                TokenApi:"Bt7SOa2Nd6GMoQKeww022SUUtxQeK1F71RCFsYNh2vjp\/UgPwpX3\/MhE5EDHl7XmZvJS+qq4UcM9y2TddqSiW4x\/pgH7rRfRXjB1OOkIfVk=",
                Nam: 2018,
                ViTriBatDau:0,
                ViTriKetThuc:10
             },
            (data) => {
                if(data!=null){
                    if(data.KetQua==1){
                      resolves(data)
                    }
                    else{
                      reject(data);
                    }
                  }
                  else{
                    reject(data);
                  }
            })
        }).then((data)=>{this.setState({DanhSach: data.DuLieu });},()=>{alert("Thất bại");this.setState({DanhSach:[]});});
    }
    render()
    {
        return (
        <View>
            <ScrollView>
            {
                this.state.DanhSach.map(
                    (rowData,index)=>(
                    <View style={styles.listItem}
                          key ={rowData.Id}>
                        <Image style={{width: 140, 
                            height: 100 ,
                            padding : 5,
                            alignItems:'center',
                            justifyContent:'center'}}
                            source={{ uri: 'http://nongnghiep.vic.camau.vn'+rowData.HinhDaiDien}}/>
                        <View style={{marginLeft:8}}>
                            <Text style={styles.title}>
                                {rowData.TieuDe}
                            </Text>
                            <Text style={styles.subtitle}>
                                {rowData.NoiDungTomTat}
                            </Text>
                            <Text style={styles.subtitle1}>
                            {rowData.NgayTao}
                            </Text>
                        </View>
                    </View>
                    )
                    )
                    }
                    </ScrollView>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    image: {
        width : 50,
        height : 50
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },    
      listItem: {
        padding:5,
        flexDirection: 'row',
      },
      imageWrapper: {
        padding: 5
      },
        title: {
        fontSize: 14,
        textAlign: "left",
        margin: 6,
        color: '#075e54',
        flex: 1, flexWrap: 'wrap'
      },
      subtitle: {
        fontSize: 10,
        textAlign: "left",
        flex: 1, flexWrap: 'wrap'
      },
      subtitle1: {
        margin:2,
        fontSize: 10,
        textAlign: "left",
        flex: 1, flexWrap: 'wrap'
      }
})
export default DanhSach;