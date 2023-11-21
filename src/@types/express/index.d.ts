export {};
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        admin: boolean;
        type: string;
        establishId?: string;
      };
    }
  }
}
