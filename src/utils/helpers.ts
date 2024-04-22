export const findTypeColor = (type: string): string[] => {
  switch (type) {
    case "fire":
      return ["#ff5a00"];
    case "flying":
      return ["#3dc7ef"];
    case "rock":
      return ["#5A4D41"];
    case "bug":
      return ["#DF8830"];
    case "steel":
      return ["#CED3D4"];
    case "water":
      return ["#6091eb"];
    case "grass":
      return ["#74cb47"];
    case "ghost":
      return ["#6f5298"];
    case "poison":
      return ["#a949a4"];
    case "ground":
      return ["#8B4513"];
    case "normal":
      return ["#a4acaf"];
    case "electric":
      return ["#7DF9FF"];
    case "psychic":
      return ["#FF6868"];
    case "ice":
      return ["#20c3d0"];

    case "dragon":
      return ["#6b0606"];
    case "dark":
      return ["#35374B"];
    case "fairy":
      return ["#CD6688"];
    case "unknown":
      return ["#C08B5C"];
    case "shadow":
      return ["#424769"];
    case "fighting":
      return ["#20c3d0"];
    default:
      return ["rgb(157 23 77)"];
  }
};

export const CapitalizeWordHelper = (word: string = ""): string => {
  if (word === "") return "-";
  return word
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
