import { Injectable } from '@angular/core';
import { CatBreed } from '../assets/types';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor() {}

  async getCatBreeds(): Promise<CatBreed[]> {
    const data = await fetch(`${API_URL}/catBreeds`);
    return (await data.json()) ?? [];
  }

  async getCatBreedById(id: number): Promise<CatBreed> {
    const data = await fetch(`${API_URL}/catBreeds/${id}`);
    return (await data.json()) ?? {};
  }

  async updateCatBreed(data: CatBreed): Promise<any> {
    const dataToSend = Object.assign({}, data);
    const dataToSendJson = JSON.stringify(dataToSend);
    const response = await fetch(`${API_URL}/catBreeds/${data.id}`, {
      method: 'PUT',
      body: dataToSendJson,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }

  async addCatBreed(data: CatBreed): Promise<any> {
    const dataToSend = Object.assign({}, data);
    const dataToSendJson = JSON.stringify(dataToSend);
    const response = await fetch(`${API_URL}/catBreeds`, {
      method: 'POST',
      body: dataToSendJson,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }
}
