import config from '../config';

export const getUserData = async (email) => {
  if (!email) return Promise.reject({ error: 'Missing required param: email' });

  try {
    const responses = await Promise.all([
      fetch(`${config.API_URL}getUserData?email=${email}`),
      fetch(`${config.API_URL}getSorteos`),
      fetch(`${config.API_URL}getSubastas`)
    ]);

    const data = await Promise.all(
      responses.map(response => response.json())
    );

    const [userData, sorteos, subastas] = data;

    return {
      userData,
      sorteos,
      subastas,
    };

  } catch (error) {
    console.error(error);
    return null;
  }
}

export const suscribeToSorteo = async (sorteoId, jwtToken, email) => {
  try {
    const body = JSON.stringify({
      jwtToken,
      sorteoId,
      email
    });

    const res = await fetch(`${config.API_URL}suscribeToSorteo`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const status = await res.status;

    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error suscribiendose al sorteo');
    console.error(error)
    return false;
  }
}

export const unSuscribeToSorteo = async (sorteoId, jwtToken, email) => {
  if (!jwtToken || !sorteoId || !email) return false;
  try {
    const body = JSON.stringify({
      jwtToken,
      sorteoId,
      email
    });

    const res = await fetch(`${config.API_URL}unSuscribeToSorteo`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const status = await res.status;

    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error desinscribiéndose al sorteo');
    console.error(error)
    return false;
  }
}