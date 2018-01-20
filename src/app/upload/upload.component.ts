import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../app-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  responseId: string;
  filedata: any;
  files: any;
  graphPath = '';
  filename = '';

  constructor(private router: Router, private appService: AppService) { }
  @ViewChild('fileInput') fileInput: ElementRef;
  ngOnInit() { }


  handleFiles(evt) {
    let reader = new FileReader();    // Read file into memory as UTF-8
    this.files = evt.target.files;  // store files
    this.filename = evt.target.files[0].name;
    reader.readAsText(this.files[0]);
    reader.onload = (evt: any) => {
      this.filedata = evt.target.result;
      this.processData(this.filedata);
    };
    reader.onerror = function (evt: any) {
      console.log(evt);
    };

  }

  // process file data

  processData(csvdata) {
    const formatted = {};
    const lines = csvdata.split(/\r\n|\n/);
    lines.map((line) => {
      const innerarr = [];
      const arr = line.split(',');
      const arrelements = arr.splice(1, arr.length);
      arrelements.map((ele) => {
        const obj = {};
        let arr = ele.split('|');
        obj['date'] = parseInt(arr[0]);
        obj['value'] = parseInt(arr[1]);
        innerarr.push(obj);
      });
      if (arr[0] && innerarr) {
        formatted[arr[0]] = innerarr;
      }
    });

    this.PostGraphdata(formatted);
  }

  // post file data to the server

  PostGraphdata(data) {
    this.appService.postData(data).subscribe((response) => {
      console.log(response);
      this.responseId = response._id;
      this.graphPath = 'graph/' + response._id;
    }, (error) => {
      console.log(error);
    });
  }


  // navigate to the graph after uploading the line
  LoadGraph() {
    this.router.navigate(['/graph', this.responseId]);
  }

}
