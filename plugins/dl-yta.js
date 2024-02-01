
import fs from 'fs';
import os from 'os';
import fetch from 'node-fetch';

let limit = 500;
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!args || !args[0]) throw `✳️ Example:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that the YouTube link`;
  

  var ggapi = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args)}`

  const response = await fetch(ggapi);
  if (!response.ok) {
      console.log('Error searching for song:', response.statusText);
      throw 'Error searching for song';
  }
  const data = await response.json();

  const caption = `✼ ••๑⋯❀ Y O U T U B E ❀⋯⋅๑•• ✼
	  
  ❏ Title: ${data.data.title}
  ❒ Link: ${args[0]}
  ⊱─━⊱༻●༺⊰━─⊰`
 let vres = data.data.vid_360p

  let vid = await fetch(vres)
  const vidBuffer = await vid.buffer();

  conn.sendFile(
    m.chat,
    vidBuffer,
    `error.mp4`,
    caption,
    m,
    false,
    { asDocument: chat.useDocument }
  );
     
};

handler.help = ['ytmp4 <yt-link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'video', 'ytv'];
handler.diamond = false;

export default handler;
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
   if (!args || !args[0]) throw `✳️ Example:\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
   if (!args[0].match(/youtu/gi)) throw `❎ Please check the YouTube link`;
   m.react(rwait
	  )
 let chat = global.db.data.chats[m.chat]
  try {
		let q = '128kbps'
		let v = args[0]
		const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
		const dl_url = await yt.audio[q].download()
		const title = await yt.title
		const size = await yt.audio[q].fileSizeH
		conn.sendFile(m.chat, dl_url, title + '.mp3', `
 ≡  *FG YTDL*
  
✘ *📌Title* : ${title}
✘ *⚖️Size* : ${size}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done)
        } catch {
			await m.reply(`❎ Error: Unable to download the audio`)
} 

}
handler.help = ['ytmp3 <url>']
handler.tags = ['dl']
handler.command = ['ytmp3', 'fgmp3'] 
handler.diamond = true

export default handler
