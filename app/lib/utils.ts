export const weatherCodes = {
  0: {
    description: 'clear sky',
    iconNameDay: 'clear-day',
    iconNameNight: 'clear-night'
  },
  1: {
    description: 'mainly clear',
    iconNameDay: 'clear-day',
    iconNameNight: 'clear-night'
  },
  2: {
    description: 'partly cloudy',
    iconNameDay: 'partly-cloudy-day',
    iconNameNight: 'partly-cloudy-night'
  },
  3: {
    description: 'clouds',
    iconNameDay: 'overcast-day',
    iconNameNight: 'overcast-night'
  },
  45: {
    description: 'fog',
    iconNameDay: 'fog-day',
    iconNameNight: 'fog-night'
  },
  48: {
    description: 'depositing rime fog',
    iconNameDay: 'extreme-day-fog',
    iconNameNight: 'extreme-night-fog'
  },
  51: {
    description: 'light drizzle',
    iconNameDay: 'drizzle',
    iconNameNight: 'drizzle',
  },
  53: {
    description: 'moderate drizzle',
    iconNameDay: 'drizzle',
    iconNameNight: 'drizzle',
  },
  55: {
    description: 'dense intensity drizzle',
    iconNameDay: 'drizzle',
    iconNameNight: 'drizzle',
  },
  56: {
    description: 'light freezing drizzle',
    iconNameDay: 'drizzle',
    iconNameNight: 'drizzle',
  },
  57: {
    description: 'dense intensity freezing drizzle',
    iconNameDay: 'drizzle',
    iconNameNight: 'drizzle',
  },
  61: {
    description: 'slight rain',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  63: {
    description: 'moderate rain',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  65: {
    description: 'heavy intensity rain',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  66: {
    description: 'light freezing rain',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  67: {
    description: 'heavy intensity freezing rain',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  71: {
    description: 'slight snow fall',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  73: {
    description: 'moderate snow fall',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  75: {
    description: 'violent snow fall',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  77: {
    description: 'snow grains',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  80: {
    description: 'slight rain showers',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  81: {
    description: 'moderate rain showers',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  82: {
    description: 'violent rain showers',
    iconNameDay: 'rain',
    iconNameNight: 'rain',
  },
  85: {
    description: 'slight snow showers',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  86: {
    description: 'heavy snow showers',
    iconNameDay: 'snow',
    iconNameNight: 'snow',
  },
  95: {
    description: 'thunderstorm',
    iconNameDay: 'thunderstorms-day',
    iconNameNight: 'thunderstorms-night',
  },
  96: {
    description: 'thunderstorm with slight hail',
    iconNameDay: 'thunderstorms-day-rain',
    iconNameNight: 'thunderstorms-night-rain',
  },
  99: {
    description: 'thunderstorm with heavy hail',
    iconNameDay: 'thunderstorms-day-rain',
    iconNameNight: 'thunderstorms-night-rain',
  },
};

export function beaufortScale(mph: number) {
  if (mph === 0) {
    return {
      description: 'calm',
      scale: 0
    }
  } else if (mph >= 1 && mph <= 3) {
    return {
      description: 'light air',
      scale: 1
    }
  } else if (mph >= 4 && mph <= 7) {
    return {
      description: 'light breeze',
      scale: 2
    }
  } else if (mph >= 8 && mph <= 12) {
    return {
      description: 'gentle breeze',
      scale: 3
    }
  } else if (mph >= 13 && mph <= 18) {
    return {
      description: 'moderate',
      scale: 4
    }
  } else if (mph >= 19 && mph <= 24) {
    return {
      description: 'fresh',
      scale: 5
    }
  } else if (mph >= 25 && mph <= 31) {
    return {
      description: 'strong',
      scale: 6
    }
  } else if (mph >= 32 && mph <= 38) {
    return {
      description: 'near gale',
      scale: 7
    }
  } else if (mph >= 39 && mph <= 46) {
    return {
      description: 'gale',
      scale: 8
    }
  } else if (mph >= 47 && mph <= 54) {
    return {
      description: 'strong gale',
      scale: 9
    }
  } else if (mph >= 55 && mph <= 63) {
    return {
      description: 'storm',
      scale: 10
    }
  } else if (mph >= 64 && mph <= 73) {
    return {
      description: 'violent storm',
      scale: 11
    }
  } else if (mph >= 74 && mph <= 95) {
    return {
      description: 'hurricane',
      scale: 12
    }
  }
}