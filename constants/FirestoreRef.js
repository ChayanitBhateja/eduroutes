import firestore from '@react-native-firebase/firestore';

export default {
    categories: firestore().collection('categories'),
    courses: firestore().collection('courses'),
    mcq: firestore().collection('questionAnswers'),
    users: firestore().collection('users'),
}