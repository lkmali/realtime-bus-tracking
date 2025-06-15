import { Inject, Injectable } from '@nestjs/common';
import {RedisClientType} from 'redis';
import {RedisService} from '../redis/redis.service';
import {DataSource, In} from 'typeorm';
import {Trip} from '../trip/entities/trip.entity';
import {GenericRepository} from '../common/repositories/generic.repository';
import {Stop} from '../route/entities/stop.entity';
import {Route} from '../route/entities/route.entity';

@Injectable()
export class SearchService {
    constructor(
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
      @Inject('GENERIC_REPO_TRIP')
     private readonly tripRepository: GenericRepository<Trip>,
      @Inject('GENERIC_REPO_STOP')
      private readonly stopRepo: GenericRepository<Stop>,
      @Inject('GENERIC_REPO_ROUTE')
      private readonly routRepository: GenericRepository<Route>,
  ) {}

async findAvailableBusesBetweenStops(startStopName: string, endStopName: string) {
  const entityManager = this.dataSource.manager;

  // 1. Find routes containing both stops in correct order
  const routes = await entityManager.query(
    `SELECT r.id AS route_id
     FROM route r
     JOIN stop s1 ON s1.routeId = r.id
     JOIN stop s2 ON s2.routeId = r.id
     WHERE s1.name = $1 AND s2.name = $2 AND s1.order < s2.order`,
    [startStopName, endStopName]
  );

  const routeIds = routes.map(r => r.route_id);
  if (!routeIds.length) return [];

  // 2. Get active trips on these routes
  const trips = await this.tripRepository.findAll({
    where: { route: In(routeIds) },
    relations: ['bus', 'route'],
  });

  const results = [];

  for (const trip of trips) {
    const busId = trip.bus.id;

    // 3. Get live location from Redis
    const locationKey = `bus:${busId}:location`;
    const location = await this.redisService.get(locationKey);
    if (!location) continue;

    const parsedLocation = JSON.parse(location);
    const { lat: busLat, lng: busLng } = parsedLocation;

    // 4. Get startStop lat/lng
    const startStop = await this.stopRepo.findOne({
      where: { name: startStopName, route: { id: trip.route.id } },
    });

    const distance = this.calculateDistance(busLat, busLng, startStop.latitude, startStop.longitude);
    const eta = this.estimateETA(distance); // assume avg speed 30km/hr

    results.push({
      route: trip.route.name,
      busNumber: trip.bus.number,
      currentLocation: { lat: busLat, lng: busLng },
      distanceToStartStop: distance.toFixed(2) + ' km',
      etaToStartStop: eta + ' min',
      availableWheelchairSlots: trip.availableWheelchairSlots,
    });
  }

  return results;
}

calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = this.deg2rad(lat2 - lat1);
  const dLon = this.deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

estimateETA(distanceKm: number): number {
  const avgSpeedKmph = 30;
  return Math.ceil((distanceKm / avgSpeedKmph) * 60); // in minutes
}

deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
}