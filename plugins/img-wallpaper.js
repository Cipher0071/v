
import fg from 'api-dylux';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `✳️ What wallpaper are you looking for?`
  try {
    let res = await fg.wallpaper(text);
    let re = pickRandom(res);
    await conn.sendMessage(m.chat, { image: { url: re.image[0] }, caption: `✅ Great, isn't it?` }, { quoted: m });
  } catch (error) {
   m.reply(`✳️ Error: Please try again later`)
  }
  
}
handler.help = ['wallpaper']
handler.tags = ['img']
handler.command = ['wallpaper', 'wallpapers', 'wp']
handler.diamond = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
