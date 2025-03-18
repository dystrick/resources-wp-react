import { isBefore, isThisWeek } from "date-fns";

export function isJSON(item: any) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

export function getDateStatus(created: number, updated: number) {
  const createdDate = new Date(created * 1000);
  const updatedDate = new Date(updated * 1000);
  const isNew = isThisWeek(createdDate);
  const isUpdated = isBefore(createdDate, updatedDate);
  // const display = format(new Date(created * 1000), "Y-M-dd H:i:s");
  // console.log(format(new Date(created * 1000), "yyyyMMdd"));

  // console.log(createdDate);
  // console.log(updatedDate);
  // console.log("isNew:", isNew);
  // console.log("isUpdated", isUpdated);

  if (isNew && !isUpdated) {
    return "New";
  } else if (isUpdated) {
    return "Updated";
  }
}

export function colorSchemeMap(colorScheme: string) {
  switch (colorScheme) {
    case "gray":
      return "gray.900";
    case "red":
      return "white";
    case "orange":
      return "white";
    case "yellow":
      return "gray.900";
    case "green":
      return "white";
    case "teal":
      return "white";
    case "blue":
      return "white";
    case "cyan":
      return "gray.900";
    case "purple":
      return "white";
    case "pink":
      return "white";
    default:
      return "gray.900";
  }
}
