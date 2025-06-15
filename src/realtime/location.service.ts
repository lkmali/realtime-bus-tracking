import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class LocationService {
  constructor(private readonly redisService: RedisService) {}

  async updateBusLocation(busId: string, location: { lat: number; lng: number }) {
    await this.redisService.hset(`bus:location:${busId}`, {
      lat: location.lat,
      lng: location.lng,
      updatedAt: new Date().toISOString(),
    });
  }

  async getBusLocation(busId: string) {

    return this.redisService.hgetall(`bus:location:${busId}`);
  }

  async getMultipleBusLocations(busIds: string[]) {
    const pipeline = this.redisService.pipeline()
    busIds.forEach(id => pipeline.hgetall(`bus:location:${id}`));
    const results = await pipeline.exec();
    return results.map(([_, data]) => data);
  }

  calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // meters
  }

  estimateDuration(distance: number, averageSpeedKmph = 30) {
    return distance / (averageSpeedKmph * 1000 / 60); // in minutes
  }
}
