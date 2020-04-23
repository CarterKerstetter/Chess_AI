const THEMES = {
    DEFAULT:    {
      PRIMARY_COLOR:    'black',
      SECONDARY_COLOR:  'white'
    },
    VAPORWAVE:  {
      PRIMARY_COLOR:    '#01cdfe',
      SECONDARY_COLOR:  '#ff71ce'
    },
    HALLOWEEN:  {
      PRIMARY_COLOR:    'orange',
      SECONDARY_COLOR:  'black'
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