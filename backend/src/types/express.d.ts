import "express";

// The auth + project-owner middleware attach these to the request.
// Declared here so controllers can read them without `as any` casts.
declare global {
  namespace Express {
    interface Request {
      // populated by authMiddleware on every protected route
      user: {
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      };
      project?: {
        id: string;
        userId: string;
        name: string;
        description: string | null;
        apiKey: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
