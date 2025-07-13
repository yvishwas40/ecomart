// // services/userServices.ts
// import axios from 'axios'

// export interface EcoStats {
//   totalPoints: number
//   productsViewed: number
//   co2Saved: number
//   averageScore: string
// }

// export const getUserEcoStats = async (): Promise<EcoStats> => {
//   const response = await axios.get('http://localhost:8000/api/user/stats')
//   return response.data
// }
// services/userServices.ts

export const getUserEcoStats = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/user/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch user eco stats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user eco stats:", error);
    return null;
  }
};
