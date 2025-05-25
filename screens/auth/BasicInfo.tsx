import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

interface ProfileData {
  firstName:string;
  lastName:string;
  dateOfBirth:Date | null;
  gender:string;
  interestedIn:string;
  city:string;
  state:string;
}

interface DropdownOption {
  label:string;
  value:string;
}
const GENDER_OPTIONS:DropdownOption[] =[
  {label:'Male', value:'male'},
    {label:'Female', value:'female'},
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
]

const INTERESTED_IN_OPTIONS:DropdownOption[] =  [
  {label:'Men',value:'men'},
  {label:'Female',value:'female'},
  {label:'Everyone',value:'everyone'},
]

const CITIES_OPTIONS:DropdownOption[]=[
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Surat', value: 'surat' },
]

const STATES: DropdownOption[] = [
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Goa', value: 'goa' },
  { label: 'Delhi', value: 'delhi' },
];

const BasicInfo = () => {
  const [profileData,setProfileData]=useState<ProfileData>({
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        gender: '',
        interestedIn: '',
        city: '',
        state: '',
  })
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showInterestedInDropdown, setShowInterestedInDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const []
  return (

  )
}

export default BasicInfo

const styles = StyleSheet.create({})