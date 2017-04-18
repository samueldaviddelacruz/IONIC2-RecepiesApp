/**
 * Created by samuel on 4/17/17.
 */
import firebase from 'firebase';
export class AuthService {
  async signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }


  async signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
