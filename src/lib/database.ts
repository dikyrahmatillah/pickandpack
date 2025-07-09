import Backendless from "backendless";

// Initialize Backendless
const initBackendless = () => {
  if (typeof window === "undefined") {
    // Server-side initialization
    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp(
      process.env.BACKENDLESS_APP_ID!,
      process.env.BACKENDLESS_API_KEY!
    );
  } else {
    // Client-side initialization
    Backendless.serverURL = "https://api.backendless.com";
    Backendless.initApp(
      process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID!,
      process.env.NEXT_PUBLIC_BACKENDLESS_JS_API_KEY!
    );
  }
};

// Initialize on import
initBackendless();

// Define common data methods
export const db = {
  // User related methods
  user: {
    getCurrentUser: async () => {
      try {
        return await Backendless.UserService.getCurrentUser();
      } catch (error) {
        console.error("Error getting current user:", error);
        return null;
      }
    },
    login: async (email: string, password: string) => {
      try {
        return await Backendless.UserService.login(email, password);
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
    logout: async () => {
      try {
        return await Backendless.UserService.logout();
      } catch (error) {
        console.error("Error logging out:", error);
        throw error;
      }
    },
    register: async (userData: {
      email: string;
      password: string;
      name?: string;
      role?: string;
      [key: string]: unknown; // Allow additional properties with unknown type
    }) => {
      try {
        return await Backendless.UserService.register(userData);
      } catch (error) {
        console.error("Error registering user:", error);
        throw error;
      }
    },
  },

  // Post related methods
  post: {
    getAll: async () => {
      try {
        const queryBuilder = Backendless.DataQueryBuilder.create();
        queryBuilder.setRelated(["author"]);
        return await Backendless.Data.of("Post").find(queryBuilder);
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    getById: async (id: string) => {
      try {
        const queryBuilder = Backendless.DataQueryBuilder.create();
        queryBuilder.setRelated(["author"]);
        return await Backendless.Data.of("Post").findById(id, queryBuilder);
      } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        return null;
      }
    },
    create: async (postData: {
      title: string;
      slug: string;
      content: string;
      image?: string;
      published?: boolean;
      authorId: string;
      [key: string]: unknown;
    }) => {
      try {
        return await Backendless.Data.of("Post").save(postData);
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
    update: async (postData: {
      objectId: string;
      title?: string;
      slug?: string;
      content?: string;
      image?: string;
      published?: boolean;
      [key: string]: unknown;
    }) => {
      try {
        return await Backendless.Data.of("Post").save(postData);
      } catch (error) {
        console.error("Error updating post:", error);
        throw error;
      }
    },
    delete: async (id: string) => {
      try {
        return await Backendless.Data.of("Post").remove({ objectId: id });
      } catch (error) {
        console.error(`Error deleting post with id ${id}:`, error);
        throw error;
      }
    },
  },
};

export default Backendless;
