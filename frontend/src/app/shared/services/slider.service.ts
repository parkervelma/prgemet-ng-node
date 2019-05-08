import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlJSON } from '../../views/json/urlJSON';
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private _addImageUrl = UrlJSON.addImage;
  private _getImagesUrl = UrlJSON.getImagesUrl;
  private _removeImageUrl = UrlJSON.removeImageUrl;
  private _getImageByIdUrl = UrlJSON.getImageByIdUrl;
  private _updateImageUrl = UrlJSON.updateImageUrl;

  constructor(
    private http: HttpClient
  ) { }

  addImage(item) {
    return this.http.post<any>(this._addImageUrl, item);
  }

  getAllSliderImages(page, searchData) {
    console.log(page);
    return this.http.post<any>(`${this._getImagesUrl}/${page}`, searchData);
  }

  removeImage(delete_id) {
    console.log(delete_id);
    return this.http.delete<any>(`${this._removeImageUrl}/${delete_id}`);
  }

  getImageByID(id) {
    return this.http.get<any>(`${this._getImageByIdUrl}/${id}`);
  }
  
  updateImage(id, imageData) {
    return this.http.post<any>(`${this._updateImageUrl}/${id}`, imageData);
  }
}
