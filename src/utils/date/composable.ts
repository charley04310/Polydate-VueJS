export const getRelativeTime = (dateString: Date) => {
  // Parse the date string using the Date constructor
  const date = new Date(dateString);

  // Get the current time in milliseconds
  const currentTime = new Date().getTime();

  // Calculate the difference between the current time and the provided date in milliseconds
  const timeDifference = currentTime - date.getTime();

  // Convert the time difference to minutes
  const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

  // Check the time difference and return the appropriate relative time string
  if (timeDifferenceInMinutes < 1) {
    return 'Just now';
  } else if (timeDifferenceInMinutes < 60) {
    return `il y a ${timeDifferenceInMinutes} minutes`;
  } else if (timeDifferenceInMinutes < 1440) {
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    return `il y a ${hours} heures`;
  } else {
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    return `il y a ${days} jours`;
  }
};
