import Character from "@/models/Character";

export default async function initInfo(user) {
    const userInfo = await getUserInfo(user);
    const characters = userInfo.userCharacter ? null : await getCharacters();

    return {
        userInfo,
        characters
    }

}

export async function getUserInfo(user) {
    const userInfo = {
        nickname: user.nickname ?? "",
        userCharacter: user.character ?? null,
        xp: user.xp,
        id: user.id,
        icon: "/images/default_character.png",
        characterImg: "",
        characterKind: "",
        completedTasks: user.completedTasks,
        badges: user.badges,
        level: Math.floor(user.xp / 100) + 1,
    }

    if (userInfo.userCharacter) {
        const userChar = await Character.findOne({ _id: user.character });
        userInfo.icon = userChar.icon;
        userInfo.characterImg = userChar.image;
        userInfo.characterKind = userChar.kind;
    }

    switch (userInfo.level) {
        case 1:
            userInfo.levelName = "Újonc";
            break
        case 2:
            userInfo.levelName = "Felderítő";
            break
        case 3:
            userInfo.levelName = "Mester";
            break
        case 4:
            userInfo.levelName = "Legenda";
            break
        default:
            userInfo.levelName = "Újonc";
    }

    return userInfo
}

export async function getCharacters() {
    const characterResult = await Character.find({});
    const characters = characterResult.map(doc => {
        const char = doc.toObject();
        char._id = char._id.toString();
        return char
    })

    return characters
}