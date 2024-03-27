import { Injectable } from '@angular/core'; 
import * as CryptoJS from 'crypto-js';
import { STORAGE_KEY } from '../../constants/storage';
import { IUser } from '../../interface/user.interface';
import { environment } from '../../../environments/environment.prod';
  
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  getData(key: string): string | null {
    let data = localStorage.getItem(key);
    return data ? this.decrypt(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
  
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.keyencrypt).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.keyencrypt).toString(CryptoJS.enc.Utf8);
  }
}
