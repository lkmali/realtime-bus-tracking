import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LocationService } from './location.service';

@WebSocketGateway({ cors: true })
export class RealtimeGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly locationService: LocationService) {}
  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(
    @MessageBody()
    data: { busId: string; lat: number; lng: number },
  ) {
    await this.locationService.updateBusLocation(data.busId, {
      lat: data.lat,
      lng: data.lng,
    });
    this.server.emit('locationUpdate', data);
  }
}