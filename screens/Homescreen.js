import React from 'react';
import {View,
Text,
TouchableOpacity,
StyleSheet,
AsyncStorage,
FlatList} from 'react-native';
import{Icon,Card } from 'native-base';
import { useScreens } from 'react-native-screens';

export default class addNewContact extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }

  static navigationOPtion={
    title:"Contect App"
  };
  componentWillMount(){
    const {navigation} = this.props;
     navigation.addListener("willFocus",()=>{
       this.getAllContect();
     });
  }

  //TODO: get all contect
  getAllContect = async ()=>{
    // collect all data
    await AsyncStorage.getAllKeys()
    .then(Keys =>{
      //console.log(Keys);
      return AsyncStorage.multiGet(Keys)
      .then(result =>{
        this.setState({
          data:result.sort(function(a, b){
            if (
              JSON.parse(a[1]).fname<
            JSON.parse(b[1]).fname) 
            {
              return -1; 
            }

            if (
              JSON.parse(a[1]).fname>
            JSON.parse(b[1]) .fname)
            {
              return 1; 
            }
            return 0;

          })
        })
      })
      .catch(error =>{
        console.log(error)
      })
    })
    .catch(error =>{
      console.log(error)
    });
   
  };
  render(){
    return(
       <View style={styles.container}>
         <FlatList 
         data={this.state.data}
         renderItem={ ({item}) =>{
         contact = JSON.parse(item[1]);
           return (
            <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate("ViewContactscreen",{
               key:item[0].toString()
                
              });

            }}
            >

              <Card style={styles.listItem}>
                <View style={styles.iconContainer}>
                <Text style={styles.contactIcon}>
                  {contact.fname[0].toUpperCase()}
                </Text>

                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {contact.fname}{contact.lname}
                  </Text>
                  <Text style={styles.infoText}>
                    {contact.phone}
                  </Text>
                  <Text style={styles.infoText}>
                    {contact.email}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
           );
         }}
         keyExtractor={ (item, index) => item[0].toString() }
         
         />
           <TouchableOpacity
           style={styles.floatButton}
           onPress={()=>{
               this.props.navigation.navigate("add")
           }}
           >
           <Icon
         
         type='Entypo'  
         name="circle-with-plus"
         size={30}
         />
       
           </TouchableOpacity>
       </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});
