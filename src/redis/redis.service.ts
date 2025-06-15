import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.get<string>('config.redis.host'),
      port: this.configService.get<number>('config.redis.port'),
    });

    this.client.on('connect', () => console.log('Redis connected'));
    this.client.on('error', (err) => console.error('Redis error:', err));
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, val, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, val);
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    const val = await this.client.get(key);
    try {
      return val ? JSON.parse(val) : null;
    } catch {
      return val as any;
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async keys(pattern = '*'): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async hset(key:string,data:any): Promise<void> {
    await this.client.hset(key,data);
  }

  async hgetall(key: string): Promise<Record<string, any>> {
    const data = await this.client.hgetall(key);
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, JSON.parse(v)]));
  }

  pipeline(): any{
    return this.client.pipeline();
  }
}
