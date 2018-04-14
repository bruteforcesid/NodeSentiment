
const CONFIG = {
    'dev': {
        'localDB': {
            'LIMIT': '100',
            'HOST': '192.168.1.106',
            'USER': 'root',
            'PASSWORD': 'Siddey374!!',
            'DATABASE': 'sentiment'
        }
    },
    'live': {
        'localDB': {
            'LIMIT': '100',
            'HOST': 'localhost',
            'USER': 'root',
            'PASSWORD': 'abc@123',
            'DATABASE': 'sentiment'
        }
    }
}

var PROPERTY = {
    'config': CONFIG.live
}


module.exports = PROPERTY;