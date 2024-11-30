import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";
import { ZSAError } from "zsa";

// Configuration for different rate limit types
export const RateLimitConfig = {
  SIGNUP: {
    limit: 1,
    window: "45 s",
  },
  LOGIN: {
    limit: 5,
    window: "1 m",
  },
  API_CALL: {
    limit: 10,
    window: "1 m",
  },
};

// Create a centralized rate limiter utility
export class RateLimiterUtility {
  private static instances: { [key: string]: Ratelimit } = {};

  /**
   * Get or create a rate limiter instance
   * @param config Rate limit configuration
   * @returns Ratelimit instance
   */
  private static getInstance(config: {
    limit: number;
    window: string;
  }): Ratelimit {
    const key = `${config.limit}_${config.window}`;

    if (!this.instances[key]) {
      this.instances[key] = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(config.limit, config.window as any),
      });
    }

    return this.instances[key];
  }

  /**
   * Attempt to limit a request based on IP
   * @param config Rate limit configuration
   * @param errorMessage Custom error message
   * @returns Success status
   */
  static async limit(
    config: { limit: number; window: string } = RateLimitConfig.SIGNUP,
    errorMessage: string = "Too many requests",
  ): Promise<void> {
    const ip = headers().get("x-forwarded-for");

    if (!ip) {
      throw new ZSAError("INTERNAL_SERVER_ERROR", "IP address not found");
    }

    const rateLimiter = this.getInstance(config);
    const { success } = await rateLimiter.limit(ip);

    if (!success) {
      throw new ZSAError("TOO_MANY_REQUESTS", errorMessage);
    }
  }
}
