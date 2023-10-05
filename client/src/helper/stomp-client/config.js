import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;

export const connectStompClient = () => {
  const socket = new SockJS("http://localhost:2508/ws-honey-end-point");
  stompClient = Stomp.over(socket);
};

export const getStompClient = () => stompClient;
