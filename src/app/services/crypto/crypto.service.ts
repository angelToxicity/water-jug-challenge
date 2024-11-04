import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
// import { randomBytes as r, createCipheriv as cc, createDecipheriv as cd } from 'crypto-browserify'
import crypto from 'crypto-js'

const key = environment.key;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  // Función para cifrar datos con AES-128
  encryptData(data:string):string {
    const iv = crypto.lib.WordArray.random(16);
    const cipher = crypto.AES.encrypt(data, key, {iv: iv}).toString();
    return iv.toString(crypto.enc.Hex) + ':' + cipher;
  }

  // Función para descifrar datos cifrados con AES-128
  decryptData(encryptedData:string):string {
    const [iv, encryptedDataPart] = encryptedData.split(':');

    // Convertimos la clave secreta a formato WordArray
    // const keyWordArray = crypto.enc.Utf8.parse(key);

    // Desciframos la contraseña con la clave secreta
    const bytes = crypto.AES.decrypt(encryptedDataPart, key);

    // Devolvemos la contraseña descifrada en formato string
    return bytes.toString(crypto.enc.Utf8);
  }
}