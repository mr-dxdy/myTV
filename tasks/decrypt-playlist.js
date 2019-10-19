import fs from 'fs'
import Crypt from '../src/js/crypt'

fs.readFile('tmp/playlist.enc', 'utf8', (err, data) => {
  if (err) throw err;

  fs.writeFile('tmp/playlist.json', Crypt.decrypt(data), 'utf8', (err) => {
    if(err) throw err;
    console.log('Done')
  })
});
