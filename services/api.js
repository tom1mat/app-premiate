import config from '../config';

export const getUserData = async (email) => {
  try {
    const response = await fetch(`${config.API_URL}getUserData?email=${email}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return Promise.resolve(null);
  }
}