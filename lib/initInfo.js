import Character from "@/models/Character";

export default async function initInfo(user) {
    const userInfo = await getUserInfo(user);
    const characters = userInfo.userCharacter ? null : await getCharacters();

    return {
        userInfo,
        characters
    }

}

async function getUserInfo(user) {
    const userInfo = {
        nickname: user.nickname ?? "",
        userCharacter: user.character ?? null,
        xp: user.xp,
        id: user.id,
        icon: "/images/default_character.png",
        characterImg: "",
        completedTasks: user.completedTasks,
        badges: user.badges,
    }

    if (userInfo.userCharacter) {
        const userChar = await Character.findOne({ _id: user.character });
        userInfo.icon = userChar.icon;
        userInfo.characterImg = userChar.image;
    }

    return userInfo
}

async function getCharacters() {
    const characterResult = await Character.find({});
    const characters = characterResult.map(doc => {
        const char = doc.toObject();
        char._id = char._id.toString();
        return char
    })

    return characters
}