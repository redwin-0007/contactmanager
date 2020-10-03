import React from 'react';
import {View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Platform,
    Alert,
    AsyncStorage,} from 'react-native';
    import {Card,CardItem,Icon }from 'native-base'

export default class ViewContactscreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            fname:"Dummy Text",
            lname:"Dummy Text",
            phone:"Dummy Text",
            email:"Dummy Text",
            address:"Dummy Text",
            key:"Dummy Text"
        }
    }
    
    componentDidMount(){
        const {navigation} = this.props;
        navigation.addListener("willFocus",()=>{
            var key = this.props.navigation.getParam("key","");
           this.getContact(key)
        });
    }
    
    static navigationOPtion={
        title:"View Contact"
      };

      getContact = async key =>{
        await AsyncStorage.getItem(key)
        .then(contactjsonString =>{
          var contact = JSON.parse(contactjsonString);
          contact["key"] = key;
          this.setState(contact);
        })
        .catch(error =>{
            console.log(error)
        });
      };

     callAction = phone =>{
         let phoneNumber = phone;
         if (Platform.OS !== "android"){
             phoneNumber = 'telpromt:${phone}'
         } else {
             phoneNumber = 'tel:${phone}';
         }
       Linking.canOpenURL(phoneNumber)
       .then( supported =>{
           if (!supported){
           Alert.alert("Phone number is not avilable")
       } else{
          return Linking.openURL(phoneNumber)
       }
       })
       .catch(error => {
           console.log(error)
       })
     };
     
     smsAction = phone =>{
       let phoneNumber = phone;
       Linking.canOpenURL(phoneNumber)
      phoneNumber = 'sms:${phone}'
       Linking.canOpenURL(phoneNumber)
      .then( supported =>{
          if (!supported){
          Alert.alert("Phone number is not avilable")
      } else{
         return Linking.openURL(phoneNumber)
      }
      })
      .catch(error => {
          console.log(error)
      })
     }

     editContact = (key) =>{
         this.props.navigation.navigate("Editscreen",{key:key});
     };
     deleteContact=(key)=>{
        Alert.alert(
        "Delete Contact",
        `${this.state.fname} ${this.state.lname}`,
        [
          {
            text:'Cancel', onPress: ()=>console.log('cancel tapped')
          },
          {
            text:'Ok',
            onPress: async()=>{
              await AsyncStorage.removeItem(key)
              .then(()=>{
                this.props.navigation.goBack();
              })
              .catch(error=>{
                console.log(error)
              })
            }
          }
        ]
  
  
  
  
  
        ) 
  
      }



    render(){
        return(
         <ScrollView style={styles.container}>
             <View style={styles.contactIconContainer} >
                 <Text style={styles.contactIcon}>
                     {this.state.fname[0].toUpperCase()}
                 </Text>
             </View>
             <View style={styles.namecontainer}>
                 <Text style={styles.name}>
                     {this.state.fname}  {this.state.lname}
                 </Text>
             </View>
             <View style={styles.infoContainer}>
                  <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                          Phone 
                        </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                         {
                           this.state.phone
                         }
                        </Text>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                          Email 
                        </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                         {
                           this.state.email
                         }
                        </Text>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                          Address 
                        </Text>
                    </CardItem>
                    <CardItem bordered>
                        <Text style={styles.infoText}>
                         {
                           this.state.address
                         }
                        </Text>
                    </CardItem>
                  </Card>
                </View>

                  <Card style={styles.actionContainer}>
                   <CardItem style={styles.actionButton} bordered>

                     <TouchableOpacity
                     onPress={()=>{
                       this.smsAction(this.state.phone) 
                     }}
                     >
                       <Icon
                       type= 'Entypo'
                       name='message'
                       size={50}
                       color='#B83227'
                       />
                       <Text style={styles.actionText}>Message  </Text>
                     </TouchableOpacity>
                   </CardItem>



                 
                   <CardItem style={styles.actionButton} bordered>

                     <TouchableOpacity
                     onPress={()=>{
                       this.callAction(this.state.phone) 
                     }}
                     >
                       <Icon
                       type='Entypo'
                       name='phone'
                       size={50}
                       color='#B83227'
                       />
                       <Text style={styles.actionText}>Phone  </Text>
                     </TouchableOpacity>
                   </CardItem>



                  </Card>
                        

                  <Card style={styles.actionContainer}>
                   <CardItem style={styles.actionButton} bordered>

                     <TouchableOpacity
                     onPress={()=>{
                       this.editContact(this.state.key)
                     }}
                     >
                       <Icon
                       type='AntDesign'
                       name='edit'
                       size={50}
                       color='#B83227'
                       />
                       <Text style={styles.actionText}>Edit  </Text>
                     </TouchableOpacity>
                   </CardItem>



                 
                   <CardItem style={styles.actionButton} bordered>

                     <TouchableOpacity
                     onPress={()=>{
                       this.deleteContact(this.state.key)
                     }}
                     >
                       <Icon
                       type='AntDesign'
                       name='trash'
                       size={50}
                       color='#B83227'
                       />
                       <Text style={styles.actionText}>Delete  </Text>
                     </TouchableOpacity>
                   </CardItem>



                  </Card>
         </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    contactIconContainer: {
      height: 200,
      backgroundColor: "#B83227",
      alignItems: "center",
      justifyContent: "center"
    },
    contactIcon: {
      fontSize: 100,
      fontWeight: "bold",
      color: "#fff"
    },
    nameContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      position: "absolute",
      bottom: 0
    },
    name: {
      fontSize: 24,
      color: "#000",
      fontWeight: "900"
    },
    infoText: {
      fontSize: 18,
      fontWeight: "300"
    },
    actionContainer: {
      flexDirection: "row"
    },
    actionButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    actionText: {
      color: "#B83227",
      fontWeight: "bold",

    }
  });