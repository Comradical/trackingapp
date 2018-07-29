export default {
  'DEVELOPMENT': {
    'appenders': {
      'console': {
        'type': 'console'
      }
    },
    'categories': {
      'default': {
        'appenders': [
          'console'
        ],
        'level': 'debug'
      }
    }
  },
  'PRODUCTION': {
    'appenders': {
      'console': {
        'type': 'console'
      }
    },
    'categories': {
      'default': {
        'appenders': [
          'console'
        ],
        'level': 'info'
      }
    }
  },
  'TESTING': {
    'appenders': {
      'console': {
        'type': 'console'
      }
    },
    'categories': {
      'default': {
        'appenders': [
          'console'
        ],
        'level': 'info'
      }
    }
  }
}
