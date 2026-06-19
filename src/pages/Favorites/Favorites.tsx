import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useFlags } from 'launchdarkly-react-client-sdk'
import Button from '../../components/Button'
import NameRow from '../../components/NameRow'
import EmailCapture from '../../components/EmailCapture'
import KeepsakeCta from '../../components/KeepsakeCta'
import { favoritesAtom } from '../../lib/atom'
import { variants, itemVariants } from '../../lib/anims'
import { downloadTextFile } from '../../lib/io'
import '../firstLastName.scoped.css'

const Favorites = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom)
  const { enableEmailCapture, enableKeepsakeCta } = useFlags()

  const removeFavorite = (name: string) => {
    setFavorites(favorites.filter((n) => n !== name))
  }

  const exportFavorites = () => {
    if (favorites.length === 0) return
    downloadTextFile('baby-name-favorites.txt', favorites.join('\n'))
  }

  return (
    <motion.div className='add-name-page' variants={variants} animate='enter' exit='exit' initial='initial'>
      <motion.div variants={itemVariants} key='back-btn' id='back'>
        <Button to={'mix'} variant='square'>Back</Button>
      </motion.div>
      <motion.div variants={itemVariants} key='fav-title'>Your shortlist</motion.div>
      <motion.div className='names' variants={itemVariants} key='fav-list'>
        {favorites.length === 0
          ? <div className='empty'>No favorites yet — tap the ♥ on a mix to save it here.</div>
          : <>
              {enableEmailCapture && <EmailCapture names={favorites} />}
              {favorites.map((name) =>
                <div className='favorite-item' key={name}>
                  <NameRow
                    name={name}
                    isFavorite={true}
                    onToggleFavorite={removeFavorite}
                  />
                  {enableKeepsakeCta && <KeepsakeCta name={name} />}
                </div>
              )}
            </>
        }
      </motion.div>
      <motion.div variants={itemVariants} key='fav-export' id='next'>
        <Button variant='square' nav={false} onClick={exportFavorites}>export favorites</Button>
      </motion.div>
    </motion.div>
  )
}

export default Favorites
