import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ChatService } from 'src/app/services/Chats/chat.service';
import { Chat, InsertChat } from 'src/app/models/ChatInterface';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  constructor(private _auth:AuthService,
              private _chat:ChatService,
              private router:Router) { }

  message: string | null = "";
  defaultMessage: any = ["Press enter to send", "Please type a message before sending"]
  enterMessage: string = this.defaultMessage[0];
  isSubmitted: boolean = false;
  userId?: number = this._auth.userId;
  shake: boolean = false;

  chatList: Chat[] = [];


  ngOnInit(): void {
    if(!this._auth.userId) {
      this.router.navigate(['/login']);
    }

    this._chat.getAllChats().subscribe((result: Chat[]) => {
      this.chatList = result;
      console.log(this.chatList)
    })
  }

  sendChat(event: any) {
    

    if(event.keyCode===13){
      event.preventDefault();
      
      if(!this.message!.trim()) {
        this.enterMessage = this.defaultMessage[1];
        this.isSubmitted = true;
        this.shake = true;

        setTimeout( () => {                        
          this.isSubmitted = false;
          this.shake = false;
        }, 300);

      } else {
        let message:InsertChat = {
          "user_id": this._auth.userId,
          "message": this.message!.trim()
        }

        this._chat.createChat(message).subscribe((result: any) => {
          console.log(result);
        })
        
        this.enterMessage = this.defaultMessage[0];
        this.message = "";
        this.shake = false;
        this.isSubmitted = false;
      }
    }
  }

}
