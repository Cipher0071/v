
import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
	
if (!text) throw `✳️ Enter the text`
m.react('💬')

	try {
        let gpt = await fetch(global.API('fgmods', '/api/info/openai2', { text }, 'apikey'));
        let res = await gpt.json()
        await m.reply(res.result)
	} catch {
		m.reply(`❎ Error: Please try again later`)
	}

}
handler.help = ['ia <text>']
handler.tags = ['tools']
handler.command = ['ia', 'ai', 'chatgpt', 'openai', 'gpt']

export default handler
