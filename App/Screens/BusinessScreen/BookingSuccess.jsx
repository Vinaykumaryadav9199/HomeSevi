// SuccessModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const SuccessModal = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: 'blue', marginTop: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
