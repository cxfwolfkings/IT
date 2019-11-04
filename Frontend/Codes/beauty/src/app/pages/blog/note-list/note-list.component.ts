import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
// npm install marked --save
import marked from 'marked';
import { BlogService, PreNoteDto, GetNoteDto, Hero, User } from '../blog.service';


import { LocalStorage } from '../../../core/local.storage';
// import{Observable,Subject} from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})

export class NoteListComponent implements OnInit {
  preNoteList: PreNoteDto[] = [];
  loadMore = false;
  loading = false;
  key = '';
  // userMsg:User[]=[];
  userMsg = '';

  HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  constructor(private router: Router,
  private blogService: BlogService,
  private LSData: LocalStorage) { }

  ngOnInit() {

    //this.getNoteList(true);
    //this.getMessage();    

  }

  getMessage() {// 举例
    // userName:'123',pass
    // this.LSData.remove('userMsg');
    console.log(this.LSData.getObject('userMsg'));
    this.userMsg = this.LSData.getObject('userMsg')[0].userName;

    // this.userMsg.push(this.LSData.getObject('userMsg').userName);
    // 从LocalStorage获取userMsg
  }

  getNoteList(f = false) {

    this.loading = true;
    if (f) {
      this.preNoteList = [];
    }
    const param = new GetNoteDto();
    param.key = this.key;
    param.SkipCount = this.preNoteList.length;

    this.blogService.GetNoteList(param).do(() => {
      this.loading = false;
    }).subscribe(m => {
      this.loadMore = m.totalCount > this.preNoteList.length;
      // console.log(m);
      m.items.forEach((v, i) => {
        v.content = marked(v.content);
        this.preNoteList.push(v);
      });
    });
  }

  linkTo(id: number) {
    console.log(id);
    this.router.navigate(['blog/note', id]);
  }

}
