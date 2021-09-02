import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ch',
  templateUrl: './ch.component.html',
  styleUrls: ['./ch.component.css']
})
export class ChComponent implements OnInit {
    user = localStorage.getItem('name') ;
    room: string;
    messageText: string;
    messageArray: Array<{user: string , message: string}> = [];
    t: string ;
    marker = {} as any;
    // tslint:disable-next-line:variable-name
    constructor(private _chatService: ChatService, private auth: ParkService, private router: Router) {
        this._chatService.newUserJoined()
        .subscribe(data => this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data => this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data  => this.messageArray.push(data));
    }
    ngOnInit(): void {
        this.auth.getListPark().subscribe((res) => {
            this.marker = res;
        });
    }

    join() {
        this._chatService.joinRoom({user: this.user, room: this.room});
    }

    leave() {
        this._chatService.leaveRoom({user: this.user, room: this.room});
    }

    sendMessage() {
        this._chatService.sendMessage({user: this.user, room: this.room, message: this.messageText});
        this.messageText = '';
        this.t = this.messageArray[this.messageArray.length - 1 ].message;
        console.log(this.messageArray.length - 2 );
    }



}
