function plural(number, word, suffixes) {
  if (number === 1) {
    return `${word}${suffixes[0]}`;
  } else {
    return `${word}${suffixes[1]}`;
  }
}

function humanize(fromStr) {
  function format(type, timeObj) {
    const { secs, mins, hrs, days, weeks, months, years } = timeObj;

    let result = "";

    switch (type) {
      case "secs":
        result = `${secs} ${plural(secs, "sec", ["", "s"])} ago`;
        break;
      case "mins":
        result = `${mins} ${plural(mins, "min", ["", "s"])} ago`;
        break;
      case "hrs":
        result = `${hrs} ${plural(hrs, "hr", ["", "s"])} ago`;
        break;
      case "days":
        result = `${days} ${plural(days, "day", ["", "s"])} ago`;
        break;
      case "weeks":
        result = `${weeks} ${plural(weeks, "week", ["", "s"])} ago`;
        break;
      case "months":
        result = `${months} ${plural(months, "month", ["", "s"])} ago`;
        break;
      case "years":
        result = `${years} ${plural(years, "year", ["", "s"])}`;
        if (months - years * 12 !== 0) {
          result += ` ${months - years * 12} ${plural(months, "month", [
            "",
            "s",
          ])}`;
        }
        result += " ago";

        break;

      default:
        throw Error("Invalid type specified");
    }

    return result;
  }

  const oldDate = new Date(fromStr);
  const current = new Date();

  const secs = Math.floor((current.getTime() - oldDate.getTime()) / 1000);

  if (secs < 0) {
    throw new Error("Supplied date is greater than current date");
  }

  const mins = Math.floor(secs / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  // console.log({ secs, mins, hrs, days, weeks, months, years });
  const timeObj = { secs, mins, hrs, days, weeks, months, years };

  if (secs < 60) {
    return format("secs", timeObj);
  } else if (mins < 60) {
    return format("mins", timeObj);
  } else if (hrs < 24) {
    return format("hrs", timeObj);
  } else if (hrs > 24 && hrs < 48) {
    return `Yesterday`;
  } else if (days > 1 && days < 7) {
    return format("days", timeObj);
  } else if (days >= 7 && weeks <= 4) {
    return format("weeks", timeObj);
  } else if (weeks > 4 && months <= 12) {
    return format("months", timeObj);
  } else if (months > 12 && years <= 100) {
    return format("years", timeObj);
  } else {
    return oldDate.toLocaleDateString("en-us");
  }
}

console.log(humanize("2023-03-24T11:51:10+00:00"));
