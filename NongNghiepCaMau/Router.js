import { Navigation } from 'react-navigation'
import DanhSach from './DanhSach';
import App from './App';


export function registerScreens() {
 Navigation.registerComponent('DanhSach', () => DanhSach);
 Navigation.registerComponent('App', () => App);
}