import '@logseq/libs';
import { render, renderToString } from './pseudocode';
import "./pseudocode.css"

async function insertPseudocode (e) {
    const currentBlock = await logseq.Editor.getBlock(e.uuid)

    var options = {
        lineNumber: true
    }

    console.log(currentBlock.content)

    await logseq.Editor.insertBlock(e.uuid, renderToString(currentBlock.content, options), {sibling: true})
  }
  

const main = async () => {
  console.log('Pseudocode plugin loaded!');
  logseq.Editor.registerBlockContextMenuItem('Pseudocode', async (e) => {
    insertPseudocode(e)
  }
    
  )}

logseq.ready(main).catch(console.error);