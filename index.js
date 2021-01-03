const { create, Client } = require('@open-wa/wa-automate')
 const left = require('./lib/left')
const welcome = require('./lib/welcome')
const msgHandler = require('./anto')
const options = require('./options')
const start = async (anto = new Client()) => {
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        anto.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') anto.forceRefocus()
        })
        // listening on message
        anto.onMessage((async (message) => {
            anto.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    anto.cutMsgCache()
                }
            })
          //  require('./anto.js')(anto, message)
          msgHandler(anto, message)
        }))

        anto.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(anto, heuh)
            left(anto, heuh)
            }))
        
        anto.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 30) { 
            	anto.sendText(chat.id, `Anooo neee anggota Grub Cuma  ${totalMem}, Invite Paimom Di lain Hari ya kak `).then(() => anto.leaveGroup(chat.id)).then(() => clantoeleteChat(chat.id))
            } else {
                anto.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
            }
        }))

        /*anto.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) anto.sendSeen(to)
        }))*/

        // listening on Incoming Call
        anto.onIncomingCall(( async (call) => {
            await anto.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
            .then(() => anto.contactBlock(call.peerJid))
        }))
    }

create(options(true, start))
    .then(anto => start(anto))
    .catch((error) => console.log(error))
