const fs = require('fs-extra')

module.exports = welcome = async (anto, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await anto.getChatById(event.chat)
            const pChat = await anto.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await anto.getProfilePicFromServer(event.who)
            const capt = `Oiii Temme Anda member baru👋, Welcome to group *${name}* Jangan Baperan,atau keluar masuk yahh\n*_intro dlu Syank:_*
*🌺Nama:*
*🌺Umur:*
*🌺askot:*
*🌺animefav:*
*🌺toxic:iya/tidak*
*🌺sekolah:SMP/SMA.dll*
*🌺status:*
 selamat bergabung dan juga semoga betah disini.`
            if (pepe == '' || pepe == undefined) {
                await anto.sendFileFromUrl(event.chat, 'https://www.linkpicture.com/q/IMG-20201217-WA0763.jpg', 'profile.jpg', capt)
            } else {
                await anto.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
