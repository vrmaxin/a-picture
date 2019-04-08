export function getkeyMapByModuleType(type) {
  return keyMap[type]
}

var keyMap = {
  'basic': {
    name: '名称',
    master: {
      name: '河长',
      tel: '手机'
    }
  },
  'project': {
    name: '名称',
    master: {
      name: '河长',
      tel: '手机'
    }
  },
  'monitor': {
    name: '名称'
  },
  'video': {
    name: '名称',
    videoUrl: true
  },
  'public': {
    name: '名称'
  }
}