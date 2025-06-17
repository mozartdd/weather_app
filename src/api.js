export async function getWetherApi() {
  try {
    const resolved = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Cleethorpes?key=DUX8WLQUANH4ZKTHFG32ZK63L');
    const resolvedApi = await resolved.json();
    console.log(`${(Math.round(parseInt(resolvedApi.currentConditions.temp - 32) * 5 / 9))}*C`);
  } catch(err) {
    throw Error = `Error: ${err}`;
  }
}