import { Text, View, ScrollView, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import AppBar from '../components/AppBar';
import { Input, Button, Chip, Dialog } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from "react-native-responsive-fontsize";

const currencyList = [
  {
    currency: "India Rupee (INR)",
    abbreviation: "INR",
    symbol: "₹"
  },
  {
    currency: "United States Dollar (USD)",
    abbreviation: "USD",
    symbol: "$"
  },
  
]

export function CreateGroup() {
	const navigation = useNavigation();

	const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState([]);
	const [members, setMembers] = useState([]);
	const [member, setMember] = useState("");
	const [visible1, setVisible1] = useState(false);
	const [visible2, setVisible2] = useState(false);
	const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

	const getNameById = (value, list) => {
		var i, len = list.length;

		for (i = 0; i < len; i++) {
			if (list[i] && list[i]["abbreviation"] == value) {
				return list[i]["symbol"];
			}
		}

		return -1;
	}

	const deleteMember = (value) => {
		setMembers(oldMembers => {
			return oldMembers.filter(member => member !== value)
		})
	}

	const toggleDialog1 = () => {
		setVisible1(!visible1);
	};

	const toggleDialog2 = () => {
		setVisible2(!visible2);
	};

	const toggleDialog3 = () => {
		setVisible3(!visible3);
	};

  const toggleDialog4 = () => {
		setVisible4(!visible4);
	};

	const submitData = async () => {
		if (title === '' || currency === '' || members.length === 0) {
			toggleDialog1();
		}
		else if(members.length === 1) {
			toggleDialog2();
		}
		else {
			let currencySymbol = getNameById(currency[0], currencyList);

			try {
				const group = {
					title: title,
					currency: currencySymbol,
					members: members,
				}
				const array = [];
				// AsyncStorage.clear();
				await AsyncStorage.getItem('Groups')
					.then(async value => {
						if (value === null) {
							array.push(group);
							await AsyncStorage.setItem('Groups', JSON.stringify(array));
              setTitle('');
              setCurrency([]);
              setMembers([]);
              navigation.navigate("Groups");
						}
            else {
              let arrayNew = JSON.parse(value);
              if(arrayNew.some(i => i.title === title)) {
                toggleDialog4();
              }
              else {
                arrayNew.push(group);
                await AsyncStorage.setItem('Groups', JSON.stringify(arrayNew));
                setTitle('');
                setCurrency([]);
                setMembers([]);
                navigation.navigate("Groups");
              }
            }
				})

				// await AsyncStorage.getItem('Groups')
				// 	.then(value => {
				// 		console.log("value2", JSON.parse(value));
				// })
        

			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
		<View style={styles.containerInitial}>
			<AppBar ez={'ExpenseSplit'}  />

			<SafeAreaView style={styles.container}>
				<Input
					placeholder='Title'
					placeholderTextColor='#808080'
					selectionColor={'#808080'}
					containerStyle={styles.containerStyleTitle}
					inputContainerStyle={styles.inputContainerStyle}
					inputStyle={styles.inputStyle}
					renderErrorMessage={false}
					value={title}
					onChangeText={title => setTitle(title)}
				/>

				<SectionedMultiSelect
					IconRenderer={Icon}
					items={currencyList}
					uniqueKey='abbreviation'
					displayKey='currency'
          modalWithSafeAreaView={true}
					modalWithTouchable={true}
					searchPlaceholderText="Search currencies..."
					itemFontFamily={{ fontFamily: 'Montserrat' }}
					searchTextFontFamily={{ fontFamily: 'Montserrat' }}
					selectText='Select Currency'
					searchIconComponent={() => <Icon name="search" color="#D3D3D3" size={20} style={{marginLeft: 10, marginRight: 10}} />}
					noResultsComponent={() => <Text style={{fontFamily: 'Montserrat' ,color: '#D3D3D3' ,textAlign: 'center'}}>Sorry, no results.</Text>}
					colors={{ 
						text: '#D3D3D3',
						selectToggleTextColor: currency.length === 0 ? '#808080' : '#D3D3D3',
						itemBackground: '#1E1E1E',
						searchPlaceholderTextColor: '#D3D3D3',
						searchSelectionColor: '#808080'
					}}
					styles={{
						container: { 
							backgroundColor: '#1E1E1E',
							borderWidth: 2,
							borderColor: '#332940'
						},
						searchBar: {
							backgroundColor: '#1E1E1E',
						},
						searchTextInput: {
							color: '#D3D3D3'
						},
						selectToggle: {
							borderWidth: 2,
							borderRadius: 10,
							borderColor: '#332940',
							backgroundColor: '#1E1E1E', 
							height: 60,
							width: '90%',
							alignContent: 'center',
							alignSelf: 'center',
							paddingLeft: 20,
							paddingRight: 20,
							marginTop: '5%',
							marginBottom: '5%'
						},
						selectToggleText: {
							fontSize: RFValue(14.5),
							fontFamily: 'Montserrat',
						},
					}}
					onSelectedItemsChange={(currency) => {
						setCurrency(currency);
					}}
					selectedItems={currency}
					single={true}
					hideConfirm={true}
				/>

        <View style={{flexDirection: 'row', marginHorizontal: '5%', marginTop: '5%', justifyContent: 'space-between', width: '90%'}}>
					<Input
						placeholder='Add Members'
						placeholderTextColor='#808080'
						selectionColor={'#808080'}
						containerStyle={styles.containerStyleMembers}
						inputContainerStyle={styles.inputContainerStyle}
						inputStyle={styles.inputStyle}
            renderErrorMessage={false}
						value={member}
						onChangeText={member => setMember(member)}
					/>
					<Button
						title="Add"
						titleStyle={{
							fontFamily: 'Montserrat', 
							fontSize: RFValue(14.5), 
							color: '#D3D3D3'
						}}
						buttonStyle={{
							borderRadius: 10,
							height: 60,
							width: 70,
							backgroundColor: '#332940'
						}}
						disabled={member.length === 0 ? true : false}
						disabledStyle={{
							backgroundColor: '#808080',
							color: '#D3D3D3'
						}}
						onPress={() => {
							if(members.includes(member)) {
								toggleDialog3();
							}
							else {
								members.push(member); 
							}							
							setMember('')
						}}
					/>
        </View>

				<ScrollView>
					<View style={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'flex-start', alignSelf: 'center', width: '90%'}}>
						{
							members.map((member) => {
								return (
									<Chip
										type='outlined'
										key={member}
										title={member}
										titleStyle={{
											fontFamily: 'Montserrat',
											fontSize: RFValue(10.5),
											color: '#D3D3D3'
										}}
										icon={{
											name: 'close',
											size: 16,
											color: '#D3D3D3',
											onPress: () => {deleteMember(member)}
										}}
										iconRight
										containerStyle={{ 
											marginRight: 10,
											marginTop: 15,
											backgroundColor: '#1E1E1E',
											borderWidth: 2,
											borderColor: '#332940'
										}}
									/>
								);
							})
						}
					</View>
				</ScrollView>
							
				<Button 
					title="Submit"
					titleStyle={{
						fontFamily: 'Montserrat', 
						fontSize: RFValue(14.5), 
						color: '#D3D3D3'
					}}
					buttonStyle={{
						marginTop: 30,
						alignSelf: 'center',
						borderRadius: 10,
						height: 45,
						width: '90%',
						backgroundColor: '#332940'
					}}
					onPress={() => {submitData()}}
				/>

				<Dialog
					isVisible={visible1}
					onBackdropPress={toggleDialog1}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Something is missing?</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Please fill everything.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog1()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible2}
					onBackdropPress={toggleDialog2}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Loner Alert!</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Add one more person.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog2()}/>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					isVisible={visible3}
					onBackdropPress={toggleDialog3}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Hmmmm</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>Repeating the same name doesn't mean multiple friends.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog3()}/>
					</Dialog.Actions>
				</Dialog>

        <Dialog
					isVisible={visible4}
					onBackdropPress={toggleDialog4}
					overlayStyle={{borderRadius: 10, backgroundColor: '#121212', borderWidth: 2, borderColor: '#332940'}}
				>
					<Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(16.5), marginBottom: 10, color: '#D3D3D3'}}>Oops</Text>
					<Text style={{fontFamily: 'Montserrat', color: '#D3D3D3'}}>You already used this title once.</Text>
					<Dialog.Actions>
						<Dialog.Button title="OK" titleStyle={{fontFamily: 'Montserrat-Medium'}} onPress={() => toggleDialog4()}/>
					</Dialog.Actions>
				</Dialog>
			</SafeAreaView>

		</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
  containerInitial: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    flex: 1,
    margin: '5%',
  },
	containerStyleTitle: {
		marginTop: '5%',
		marginBottom: '5%',
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '90%',
		alignSelf: 'center'
	},
	containerStyleMembers: {
		borderWidth: 2,
    borderRadius: 10,
    borderColor: '#332940',
    backgroundColor: '#1E1E1E',
		height: 60,
		width: '75%',
	},
  inputContainerStyle: {
		borderBottomWidth: 0,
    height: 60,
  },
  inputStyle: {
    marginLeft: 10,
    fontFamily: 'Montserrat', 
    fontSize: RFValue(14.5),
    color: '#D3D3D3',
    paddingBottom: 4,
  },
});

export default CreateGroup