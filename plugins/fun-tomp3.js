
import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
    let q = m.quoted ? m.quoted : m
   let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
   // if (!/video|audio/.test(mime)) throw `✳️ Respond to the video or voice note you want to convert to mp3 with the command:\n\n*${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '❎ Error downloading media'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw '❎ Conversion error'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
    } catch (e) {
        m.reply(`✳️ Respond to the video or voice note you want to convert to mp3 with the command:\n\n*${usedPrefix + command}*`)
   }
}
handler.help = ['tomp3']
handler.tags = ['fun']
handler.command = ['tomp3', 'mp3', 'toudio'] 

export default handler
