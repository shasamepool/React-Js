export default function getCssRarity(rarity){
    switch (rarity) {
        case "Common":
            return " commun";
        case "Uncommon":
            return " uncommon";
        case "Rare":
            return " rare";
        case "Mythic Rare":
            return " mythicRare";
        case "Special":
            return " special";
        case "Basic Land":
            return " basicLand";
        default:
            return;
    }
}