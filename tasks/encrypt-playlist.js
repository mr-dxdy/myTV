import fs from 'fs'
import Crypt from '../src/js/crypt'

fs.readFile('tmp/playlist.json', (err, data) => {
  if (err) throw err;

  fs.writeFile('tmp/playlist.enc', Crypt.encrypt(data), 'utf8', (err) => {
    if(err) throw err;
    console.log('Done')
  })
});
