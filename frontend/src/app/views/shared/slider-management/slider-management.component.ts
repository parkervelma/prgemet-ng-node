import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SliderService } from 'src/app/shared/services/slider.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router , ActivatedRoute} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UrlJSON } from '../../json/urlJSON';


@Component({
  selector: 'app-slider-management',
  templateUrl: './slider-management.component.html',
  styleUrls: ['./slider-management.component.scss']
})
export class SliderManagementComponent implements OnInit {

  viewMode: 'list' | 'grid' = 'grid';
  allSelected: boolean;
  page = 1;
  pageSize = 8;

  pages = 1;
  current = 1;
  index = 0;
  last_index = 0;
  index_arr = [];

  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  radioGroup_active: FormGroup;
  itemCount = 10;
  userCount = 10;
  modalSmall: any;
  @ViewChild('smallModal_view') smallModal_view: ElementRef;
  @ViewChild('errorModal_view') errorModal_view: ElementRef;

  fileType = false;
  chooseFileName = 'Choose File';
  _uploadPictureToMongoUrl = UrlJSON.uploadPictureToMongoUrl;
  _getPictures = UrlJSON.displayPictureUrl;
  _addimage = UrlJSON.addImage;
  _uploadPicture = UrlJSON.uploadPicture;
  _getImageByIdUrl = UrlJSON.getImageByIdUrl;
  _updateImageUrl = UrlJSON.updateImageUrl;
  

  addUserData = {role: 0, active: 0, picture: '', firstName: '', lastName: '', email: '', password: '', country: '',
  city: '', companyName: '', jobTitle: '', facebook: '', linkdin: '', phoneNumber: '', comments: ''};

  sliderData = {
    user_id: '',
    picture: ''
  }
  choosePicture:any;

  id: String;
  user: any = {};

  currentUserData: any = {picture: 'default.png'};
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private sliderService: SliderService,
    private modalService: NgbModal,
    private router: Router ,
    private route: ActivatedRoute,
    private http: HttpClient,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.GetAllImages();
  }

  GetPictures() {
    this.http.get(this._getPictures).subscribe((response) => {
      console.log(response);
    })
  }

  addItem() {
    this.sliderData.user_id = localStorage.getItem('userId');
    this.sliderData.picture = this.choosePicture;
    console.log(this.sliderData);
    this.sliderService.addImage(this.sliderData)
        .subscribe(
          res => {
            this.GetAllImages();
           },
          err => console.log(err));
  }

  searchData = {
    user_id: '',
  }
  imagesList:any = [];
  GetAllImages() {
    this.imagesList = [];
    this.searchData.user_id = localStorage.getItem('userId');
    this.sliderService.getAllSliderImages(1, this.searchData).subscribe((response:any) => {
      this.imagesList = response;
      for(let i=0; i<this.imagesList.length; i++) {
        if (this.imagesList[i].picture === 'default.jpg') {
          this.imagesList[i].picture = '../../../../assets/images/item/default.png';
        } else {
          // this.imagesList[i].picture = UrlJSON.displayPictureFromFSUrl + this.filteredItems[i].picture;
          this.imagesList[i].picture = UrlJSON.displayPictureUrl + this.imagesList[i].picture;

          console.log(this.imagesList[i].picture)
        }
      }
    })
  }

  DeleteImage(id:any) {
    this.sliderService.removeImage(id).subscribe((response:any) => {
      this.GetAllImages();
    })
  }

  editPictureData:any;
  editPicture:boolean = false;
  EditImage(id:any) {
    this.sliderService.getImageByID(id).subscribe((response:any) => {
      console.log(response);
      this.editPicture = true;
      this.chooseFileName = response.picture;
      this.editPictureData = response;
      console.log(this.editPictureData.picture)
      if (this.editPictureData.picture === 'default.jpg') {
        this.editPictureData.picture = '../../../../assets/images/item/default.png';
      } else {
        // this.imagesList[i].picture = UrlJSON.displayPictureFromFSUrl + this.filteredItems[i].picture;
        this.editPictureData.picture = UrlJSON.displayPictureUrl + this.editPictureData.picture;

        console.log(this.editPictureData.picture)
      }
    })
  }

  UpdateImage() {
    this.sliderData.user_id = localStorage.getItem('userId');
    this.sliderData.picture = this.choosePicture;
    console.log(this.sliderData);

    this.sliderService.updateImage(this.editPictureData._id, this.sliderData).subscribe((response) => {
      this.GetAllImages();
    });
    this.editPicture = false;
  }

  
  onFileSelected(event) {
    console.log(event);
      this.fileType = event.target.files[0].type === '';
      if (this.fileType) {
        return;
      }
      this.chooseFileName = event.target.files[0].name;
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
          const fileCount: number = inputEl.files.length;
          const formData = new FormData();
          console.log(fileCount);
          if (fileCount > 0) { // a file was selected

              for (let i = 0; i < fileCount; i++) {
                  formData.append('file', inputEl.files.item(i));
              }
              console.log(formData);
              this.http
                  .post(this._uploadPictureToMongoUrl, formData).subscribe(
                    res => {
                      console.log(res);
                      this.sliderData.picture = res['fileName'];
                      this.choosePicture = res['fileName'];
                      if(!this.editPicture) {
                        this.addItem();
                      } else {
                        this.UpdateImage();
                      }
                    },
                    err => console.log(err));
          }
  }

}


