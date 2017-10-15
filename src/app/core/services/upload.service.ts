import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {UtilityService} from './utility.service';

@Injectable()
export class UploadService {

    public responseData: any;

    constructor(private dataService: DataService, private utilService: UtilityService) {
    }

    postWithFile(url: string, postData: any, files: File[]) {
        const formData: FormData = new FormData();
        formData.append('files', files[0], files[0].name);
        if (postData !== '' && postData !== undefined && postData !== null) {
            for (const property in postData) {
                if (postData.hasOwnProperty(property)) {
                    formData.append(property, postData[property]);
                }
            }
        }
        return new Promise((resolve, reject) => {
            this.dataService.postFile(url, formData).subscribe(
                res => {
                    this.responseData = res;
                    resolve(this.responseData);
                },
                error => {
                    this.dataService.handleError(error);
                }
            );
        });
    }

}
