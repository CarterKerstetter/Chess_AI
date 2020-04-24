// can't use black or the chess pieces are hard to see
const THEMES = {
    DEFAULT:    {
      PRIMARY_COLOR:    '#8b4513',
      SECONDARY_COLOR:  'white'
    },
    VAPORWAVE:  {
      PRIMARY_COLOR:    '#01cdfe',
      SECONDARY_COLOR:  '#ff71ce'
    },
    HALLOWEEN:  {
      PRIMARY_COLOR:    'orange',
      SECONDARY_COLOR:  'grey'
    }
}

class Theme {
    theme = null
  
    constructor( theme ) {
      if( typeof theme != 'string' ) {
        this.theme = THEMES[ 'DEFAULT' ]
        return
      }
      let theme_name = theme.toUpperCase()
      if( theme_name in THEMES ) {
        this.theme = THEMES[ theme_name ]
      }
      else {
        this.theme = THEMES[ 'DEFAULT' ]
      }
    }
  
    static getThemeNames() {
      return Object.keys(THEMES)
    }
  
    get PRIMARY_COLOR() {
      return this.theme[ 'PRIMARY_COLOR' ]
    }
  
    get SECONDARY_COLOR() {
      return this.theme[ 'SECONDARY_COLOR' ]
    }
}

export { Theme }