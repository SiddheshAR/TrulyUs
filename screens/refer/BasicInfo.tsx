import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker'; // Uncomment when needed

// Types
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

// Constants
const GENDER_OPTIONS: DropdownOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
];

const INTERESTED_IN_OPTIONS: DropdownOption[] = [
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'Everyone', value: 'everyone' },
];

// Mock data for cities and states - replace with actual data source
const CITIES: DropdownOption[] = [
  { label: 'New York', value: 'new_york' },
  { label: 'Los Angeles', value: 'los_angeles' },
  { label: 'Chicago', value: 'chicago' },
  // Add more cities
];

const STATES: DropdownOption[] = [
  { label: 'California', value: 'california' },
  { label: 'New York', value: 'new_york' },
  { label: 'Texas', value: 'texas' },
  // Add more states
];

const BasicInfo: React.FC = () => {
  // State Management
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    gender: '',
    interestedIn: '',
    city: '',
    state: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showInterestedInDropdown, setShowInterestedInDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  // Handlers
  const handleInputChange = (field: keyof ProfileData, value: string | Date | null) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  const handleDropdownSelect = (field: keyof ProfileData, value: string) => {
    handleInputChange(field, value);
    // Close all dropdowns
    setShowGenderDropdown(false);
    setShowInterestedInDropdown(false);
    setShowCityDropdown(false);
    setShowStateDropdown(false);
  };

  const handleProfilePicturePress = () => {
    // TODO: Implement image picker functionality
    Alert.alert('Profile Picture', 'Image picker functionality to be implemented');
  };

  const handleContinue = () => {
    // Validation
    if (!profileData.firstName.trim()) {
      Alert.alert('Error', 'Please enter your first name');
      return;
    }
    if (!profileData.lastName.trim()) {
      Alert.alert('Error', 'Please enter your last name');
      return;
    }
    
    // TODO: Navigate to next screen or submit data
    console.log('Profile Data:', profileData);
    Alert.alert('Success', 'Profile details saved successfully!');
  };

  const handleGoBack = () => {
    // TODO: Implement navigation back
    console.log('Go back pressed');
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  const getDropdownLabel = (options: DropdownOption[], value: string): string => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  // Render Methods
  const renderInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    keyboardType: 'default' | 'email-address' | 'numeric' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B8B8B8"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderDateInput = () => (
    <TouchableOpacity
      style={styles.inputContainer}
      onPress={() => setShowDatePicker(true)}
    >
      <View style={styles.dateInputContent}>
        <Text style={[styles.dateText, !profileData.dateOfBirth && styles.placeholderText]}>
          {profileData.dateOfBirth ? formatDate(profileData.dateOfBirth) : 'DOB'}
        </Text>
        <Icon name="calendar-outline" size={20} color="#B8B8B8" />
      </View>
    </TouchableOpacity>
  );

  const renderDropdown = (
    placeholder: string,
    value: string,
    options: DropdownOption[],
    isOpen: boolean,
    onToggle: () => void,
    onSelect: (value: string) => void
  ) => (
    <View style={styles.dropdownContainer}>
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
        <View style={styles.dropdownOptions}>
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
  );

  const renderProfilePicture = () => (
    <TouchableOpacity style={styles.profilePictureContainer} onPress={handleProfilePicturePress}>
      <View style={styles.profilePicture}>
        <Icon name="person" size={40} color="#D4A5C7" />
      </View>
      <View style={styles.editIconContainer}>
        <Icon name="camera" size={16} color="#FFFFFF" />
      </View>
      <Text style={styles.profilePictureLabel}>Profile Picture</Text>
    </TouchableOpacity>
  );

  const renderBottomIllustration = () => (
    <View style={styles.illustrationContainer}>
      {/* TODO: Replace with actual illustration/images */}
      <View style={styles.illustrationPlaceholder}>
        <Text style={styles.illustrationText}>
          🎉 Dating App Illustration 🎉
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile Details</Text>
        </View>

        <Text style={styles.subtitle}>Fill up the following details</Text>

        {/* Profile Picture */}
        {renderProfilePicture()}

        {/* Form */}
        <View style={styles.form}>
          {/* Name Row */}
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

          {/* Date of Birth */}
          {renderDateInput()}

          {/* Gender */}
          {renderDropdown(
            'Select Gender',
            profileData.gender,
            GENDER_OPTIONS,
            showGenderDropdown,
            () => setShowGenderDropdown(!showGenderDropdown),
            (value) => handleDropdownSelect('gender', value)
          )}

          {/* Interested In */}
          {renderDropdown(
            'Interested In',
            profileData.interestedIn,
            INTERESTED_IN_OPTIONS,
            showInterestedInDropdown,
            () => setShowInterestedInDropdown(!showInterestedInDropdown),
            (value) => handleDropdownSelect('interestedIn', value)
          )}

          {/* Location Row */}
          <View style={styles.row}>
            {renderDropdown(
              'City',
              profileData.city,
              CITIES,
              showCityDropdown,
              () => setShowCityDropdown(!showCityDropdown),
              (value) => handleDropdownSelect('city', value)
            )}
            {renderDropdown(
              'State',
              profileData.state,
              STATES,
              showStateDropdown,
              () => setShowStateDropdown(!showStateDropdown),
              (value) => handleDropdownSelect('state', value)
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

      {/* Date Picker Modal */}
      {showDatePicker && (
        // TODO: Implement DateTimePicker component
        // <DateTimePicker
        //   value={profileData.dateOfBirth || new Date()}
        //   mode="date"
        //   display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        //   onChange={handleDateChange}
        //   maximumDate={new Date()}
        // />
        <View /> // Placeholder
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8B4CB', // Pink gradient background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Compensate for back button
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5E6EF',
    borderWidth: 3,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 25,
    right: '50%',
    transform: [{ translateX: 25 }],
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
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateInputContent: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#F5E6EF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
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
  continueButton: {
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
  continueButtonText: {
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
  },
});

export default BasicInfo;