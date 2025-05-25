import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

interface ProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  gender: string;
  interestedIn: string;
  city: string;
  state: string;
}

interface DropdownOption {
  label: string;
  value: string;
}

const GENDER_OPTIONS: DropdownOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
]

const INTERESTED_IN_OPTIONS: DropdownOption[] = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' }, // Fixed: was 'Female'
  { label: 'Everyone', value: 'everyone' },
]

const CITIES_OPTIONS: DropdownOption[] = [
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
  const [profileData, setProfileData] = useState<ProfileData>({
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

  const handleInputChange = (field: keyof ProfileData, value: string | Date | null) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate)
    }
  }
  
  const handleDropDownSelect = (field: keyof ProfileData, value: string) => {
    handleInputChange(field, value);
    setShowGenderDropdown(false);
    setShowInterestedInDropdown(false);
    setShowCityDropdown(false);
    setShowStateDropdown(false);
  }
  
  const handleProfilePicturePress = () => {
    // TODO: Implement image picker functionality
    Alert.alert('Profile Picture', 'Image picker functionality to be implemented');
  };
  
  const handleContinue = () => {
    // Fixed validation logic
    if (!profileData.firstName.trim() || !profileData.lastName.trim() || profileData.dateOfBirth == null || !profileData.gender.trim() || !profileData.interestedIn.trim()) {
      Alert.alert("Error", "Please enter all Required Data");
      return
    }
    // TODO: Navigate to next screen or submit data
    console.log('Profile Data:', profileData);
    Alert.alert('Success', 'Profile details saved successfully!');
  }
  
  const handleGoBack = () => {
    // TODO: Implement navigation back
    console.log('Go back pressed');
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString();
  };
 
  const getDropdownLabel = (options: DropdownOption[], value: string): string => {
    const option = options.find(opt => opt.value === value); // Fixed: use === instead of ==
    return option ? option.label : "";
  }

  // Render Methods
  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType: 'default' | 'email-address' | 'numeric' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#B8B8B8" // Fixed: added # for color
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  )

  const renderDateInput = () => (
    <View style={styles.inputContainer}> {/* Wrapped in inputContainer for consistent spacing */}
      <TouchableOpacity
        style={styles.dateInputContent}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={[styles.dateText, !profileData.dateOfBirth && styles.placeholderText]}>
          {profileData.dateOfBirth ? formatDate(profileData.dateOfBirth) : 'DOB'}
        </Text>
        <Icon name="calendar-outline" size={20} color="#B8B8B8" />
      </TouchableOpacity>
    </View>
  );

  const renderDropDown = (
    placeholder: string,
    value: string,
    options: DropdownOption[],
    isOpen: boolean,
    onToggle: () => void,
    onSelect: (value: string) => void,
    zIndex: number = 1000 // Add zIndex parameter
  ) => (
    <View style={[styles.dropdownContainer, { zIndex, elevation: zIndex }]}>
      <TouchableOpacity style={styles.dropdown} onPress={onToggle}>
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {value ? getDropdownLabel(options, value) : placeholder}
        </Text>
        <Icon 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#B8B8B8" 
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownOptions, { zIndex: zIndex + 1, elevation: zIndex + 1 }]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownOption}
              onPress={() => onSelect(option.value)}
            >
              <Text style={styles.dropdownOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )

  const renderProfilePicture = (): ReactNode => (
    <TouchableOpacity style={styles.profilePictureContainer} onPress={handleProfilePicturePress}>
      <View style={styles.profilePicture}>
        <Icon name="person" size={40} color="#D4A5C7" />
      </View>
      <View style={styles.editIconContainer}>
        <Icon name="camera" size={16} color="#FFFFFF" />
      </View>
      <Text style={styles.profilePictureLabel}>Profile Picture</Text>
    </TouchableOpacity>
  )

  const renderBottomIllustration = () => ( // Fixed: added return statement
    <View style={styles.illustrationContainer}>
      {/* TODO: Replace with actual illustration/images */}
      <View style={styles.illustrationPlaceholder}>
        <Text style={styles.illustrationText}>
          🎉 Dating App Illustration 🎉
        </Text>
      </View>
    </View>
  )

  return (
    <LinearGradient
      colors={['#d9a9cf', '#F7DDD6', '#F4C7BB', '#F7D1C7']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}> {/* Fixed: added style */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false} // Fixed: should be boolean
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Icon name="chevron-back" size={24} color="#333" /> {/* Fixed: typo in icon name */}
            </TouchableOpacity>
          </View>
          
          <View>
            <Text style={styles.title}>Profile Details</Text>
            <Text style={styles.subtitle}>Fill up the following Details</Text>
          </View>
          
          <View>
            {renderProfilePicture()}
          </View>
          
          <View style={styles.form}>
            <View style={styles.row}>
              {renderInput(
                'First Name',
                profileData.firstName,
                (text) => handleInputChange('firstName', text)
              )}
              {renderInput(
                'Last Name',
                profileData.lastName,
                (text) => handleInputChange('lastName', text)
              )}
            </View>
            
            {renderDateInput()}
            
            {renderDropDown(
              "Select a gender",
              profileData.gender,
              GENDER_OPTIONS,
              showGenderDropdown,
              () => setShowGenderDropdown(!showGenderDropdown),
              (value) => handleDropDownSelect('gender', value),
              5000 // Highest z-index
            )}
            
            {renderDropDown(
              "Interested In",
              profileData.interestedIn,
              INTERESTED_IN_OPTIONS,
              showInterestedInDropdown,
              () => setShowInterestedInDropdown(!showInterestedInDropdown),
              (value) => handleDropDownSelect('interestedIn', value),
              4000 // Second highest
            )}
            
            <View style={styles.row}>
              {renderDropDown(
                "City",
                profileData.city,
                CITIES_OPTIONS,
                showCityDropdown,
                () => setShowCityDropdown(!showCityDropdown),
                (value) => handleDropDownSelect('city', value),
                3000 // Third highest
              )}
              {renderDropDown(
                "State",
                profileData.state,
                STATES,
                showStateDropdown,
                () => setShowStateDropdown(!showStateDropdown),
                (value) => handleDropDownSelect('state', value),
                2000 // Fourth highest
              )}
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          {/* Bottom Illustration */}
          {renderBottomIllustration()}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default BasicInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: { // Added missing style
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 50, // Added bottom padding for dropdown space
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500', // Fixed: changed from 'medium'
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    zIndex: 1000, // Added for dropdown visibility
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 14, // Added consistent spacing for inputs too
  },
  input: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#8B6B7D',
  },
  dateInputContent: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     borderColor: '#8B6B7D',
     borderWidth:2
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#B8B8B8',
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 0,
    // Remove static zIndex - now dynamic
  },
  dropdown: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth:2,
    borderColor:'#8B6B7D'
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Increased shadow
    shadowRadius: 12, // Increased shadow
    elevation: 10, // Increased elevation
    maxHeight: 200,
    // zIndex will be set dynamically
    borderColor: '#E8D5E8'
  },
  dropdownOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5E6EF',
    borderWidth: 4,
    borderColor: '#8B6B7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 25,
    right: '50%',
    transform: [{ translateX: 45 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8E44AD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profilePictureLabel: {
    fontSize: 20
  },
  continueButton: { // Added missing style
    backgroundColor: '#8E44AD',
    borderRadius: 25,
    paddingVertical: 16,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: { // Added missing style
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
})