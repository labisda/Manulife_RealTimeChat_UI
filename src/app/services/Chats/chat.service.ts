import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, InsertChat } from 'src/app/models/ChatInterface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  public chatLists$: BehaviorSubject<any> = new BehaviorSubject([]);
  socket = io(environment.backendUrl);
  
  public createChat(data: InsertChat) {
    const url = environment.backendUrl + "/api/createChat";
    return this.http.post<any>(url, data);
  }

  public getAllChats = () => {
    this.socket.on('chat_list', (chat: Chat) => {
      this.chatLists$?.next(chat);
    });
    return this.chatLists$?.asObservable();
  };

}
